import {ContentChildren, Directive, OnDestroy, OnInit, QueryList} from '@angular/core';
import {Subject} from "rxjs";
import {ControlContainer} from "@angular/forms";
import {FormGroupTracker} from "./form-group-tracker.directive";
import {takeUntil} from "rxjs/operators";

@Directive({
  selector: '[formArrayName]'
})
export class FormArrayTracker implements OnInit, OnDestroy {

  public name!: string | number | null;
  public changed = false;
  public value!: any;

  @ContentChildren(FormGroupTracker, {descendants: true}) formTracker!: QueryList<FormGroupTracker>;

  private componentDestroyed$: Subject<void> = new Subject<void>();

  constructor(private formArray: ControlContainer) {}

  ngOnInit(): void {
    this.name = this.formArray.name;

    this.formArray.valueChanges?.pipe(takeUntil(this.componentDestroyed$)).subscribe((v) => {
      this.changed = this.formTracker.some(control => control.changed);

      this.value = [];
      if (this.changed) {
        this.value = v;
      }
    })
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next();
  }
}
