import {
  ContentChildren,
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
} from '@angular/core';
import {FormGroupDirective} from "@angular/forms";
import {FormControlTracker} from "./form-control-tracker.directive";
import {Subscription} from "rxjs";

@Directive({
  selector: '[formGroupTracker]'
})
export class FormGroupTracker implements OnInit, OnDestroy {

  @Input() getValueChange = false;

  @Output() formChanged = new EventEmitter<any>();
  @Output() isChanged = new EventEmitter<boolean>();

  @ContentChildren(FormControlTracker, {descendants: true}) controlTracker!: QueryList<FormControlTracker>;

  private _subscribe!: Subscription | undefined;

  constructor(
    private elementRef: ElementRef,
    private formGroup: FormGroupDirective,
  ) { }

  ngOnInit(): void {
    this.initValueChanged();
  }

  initValueChanged(): void {
    this._subscribe = this.formGroup.valueChanges?.subscribe((v) => {
      const isChanged = this.controlTracker.some(control => control.changed);
      let data: any = {};

      if (isChanged) {
        if (this.getValueChange) {
          this.controlTracker.forEach(control => {
            if (control.changed) {
              const key = Object.keys(control.value)[0];
              data[key] = control.value[key];
            }
          });
        } else {
          data = v;
        }
      }

      this.formChanged.emit(data);
      this.isChanged.emit(isChanged);
    });
  }

  ngOnDestroy(): void {
    this._subscribe?.unsubscribe();
  }
}
