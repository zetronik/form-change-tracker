import {ContentChildren, Directive, OnDestroy, OnInit, QueryList} from '@angular/core';
import {FormControlTracker} from "./form-control-tracker.directive";
import {Subscription} from "rxjs";
import {ControlContainer} from "@angular/forms";
import {FormGroupTracker} from "./form-group-tracker.directive";

@Directive({
  selector: '[formArrayTracker]'
})
export class FormArrayTracker implements OnInit, OnDestroy {

  public name!: string | number | null;
  public changed = false;
  public value!: any;

  @ContentChildren(FormGroupTracker, {descendants: true}) formTracker!: QueryList<FormGroupTracker>;

  private _subscribe!: Subscription | undefined;

  constructor(private formArray: ControlContainer) { }

  ngOnInit(): void {
    this.name = this.formArray.name;

    this._subscribe = this.formArray.valueChanges?.subscribe((v) => {
      this.changed = this.formTracker.some(control => control.changed);

      this.value = [];
      if (this.changed) {
        this.value = v;
      }
    })
  }

  ngOnDestroy(): void {
    this._subscribe?.unsubscribe();
  }
}
