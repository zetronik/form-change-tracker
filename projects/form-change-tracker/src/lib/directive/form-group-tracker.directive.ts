import {
  ContentChildren,
  Directive,
  ElementRef, EventEmitter, OnDestroy,
  OnInit, Output,
  QueryList,
} from '@angular/core';
import {FormGroupDirective} from "@angular/forms";
import {FormControlTracker} from "./form-control-tracker.directive";
import {Subscription} from "rxjs";

@Directive({
  selector: '[formGroupTracker]'
})
export class FormGroupTracker implements OnInit, OnDestroy {

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
    this._subscribe = this.formGroup.valueChanges?.subscribe(() => {
      this.isChanged.emit(this.controlTracker.some(control => control.changed));

      this.controlTracker.forEach(control => {
        if (control.changed) {
          this.formChanged.emit(control.value);
        }
      });
    });
  }

  ngOnDestroy(): void {
    this._subscribe?.unsubscribe();
  }
}
