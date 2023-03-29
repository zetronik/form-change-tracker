import {
  ContentChildren,
  Directive,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
} from '@angular/core';
import {ControlContainer} from "@angular/forms";
import {FormControlTracker} from "./form-control-tracker.directive";
import {Subscription} from "rxjs";
import {FormArrayTracker} from "./form-array-tracker.directive";

@Directive({
  selector: '[formGroupTracker]'
})
export class FormGroupTracker implements OnInit, OnDestroy {

  public name!: string | number | null;
  public changed = false;
  public data: any = {};

  @Input() getValueChange = false;

  @Output() private readonly formChanged = new EventEmitter<any>();
  @Output() private readonly isChanged = new EventEmitter<boolean>();

  @ContentChildren(FormControlTracker, {descendants: true}) controlTracker!: QueryList<FormControlTracker>;
  @ContentChildren(FormArrayTracker, {descendants: true}) controlArrayTracker!: QueryList<FormArrayTracker>;

  private _subscribe!: Subscription | undefined;

  constructor(
    private formGroup: ControlContainer,
  ) { }

  ngOnInit(): void {
    this.name = this.formGroup.name;
    this._subscribe = this.formGroup.valueChanges?.subscribe((v) => {
      this.changed = this.controlTracker.some(control => control.changed);
      this.data = {};

      if (this.changed) {
        if (this.getValueChange) {
          this.controlTracker.forEach(control => {
            if (!control.isFormArray) {
              if (control.changed) {
                if (control.name) {
                  this.data[control.name] = control.value;
                }
              }
            }
          });

          this.controlArrayTracker.forEach(control => {
            if (control.changed) {
              if (control.name) {
                this.data[control.name] = control.value;
              }
            }
          })
        } else {
          this.data = v;
        }
      }

      this.formChanged.emit(this.data);
      this.isChanged.emit(this.changed);
    });
  }

  ngOnDestroy(): void {
    this._subscribe?.unsubscribe();
  }
}
