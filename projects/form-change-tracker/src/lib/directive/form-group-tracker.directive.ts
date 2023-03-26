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
import {FormGroupDirective} from "@angular/forms";
import {FormControlTracker} from "./form-control-tracker.directive";
import {Subscription} from "rxjs";
import {FormArrayTracker} from "./form-array-tracker.directive";

@Directive({
  selector: '[formGroupTracker]'
})
export class FormGroupTracker implements OnInit, OnDestroy {

  public changed = false;
  public data: any = {};

  @Input() getValueChange = false;

  @Output() formChanged = new EventEmitter<any>();
  @Output() isChanged = new EventEmitter<boolean>();

  @ContentChildren(FormControlTracker, {descendants: true}) controlTracker!: QueryList<FormControlTracker>;
  @ContentChildren(FormArrayTracker, {descendants: true}) controlArrayTracker!: QueryList<FormArrayTracker>;

  private _subscribe!: Subscription | undefined;

  constructor(
    private formGroup: FormGroupDirective,
  ) { }

  ngOnInit(): void {
    this.initValueChanged();
  }

  initValueChanged(): void {
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

  // private emitControlValueChanges(formGroup: FormGroup | FormArray, formGroupValue: any): void {
  //   for (const controlName in formGroup.controls) {
  //     const control = formGroup.get(controlName);
  //     if (control instanceof FormControl) {
  //       const newValue = formGroupValue[controlName];
  //       this.controlValueChange.emit({ controlName, newValue });
  //     } else if (control instanceof FormGroup || control instanceof FormArray) {
  //       this.emitControlValueChanges(control, formGroupValue[controlName]);
  //     }
  //   }
  // }

  ngOnDestroy(): void {
    this._subscribe?.unsubscribe();
  }
}
