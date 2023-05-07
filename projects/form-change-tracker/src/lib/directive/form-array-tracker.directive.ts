import {ContentChildren, Directive, EventEmitter, OnDestroy, OnInit, Output, QueryList} from '@angular/core';
import {Subject} from "rxjs";
import {ControlContainer} from "@angular/forms";
import {FormGroupTracker} from "./form-group-tracker.directive";
import {takeUntil} from "rxjs/operators";
import {ControlChange} from "../model/tracker.model";

@Directive({
  selector: '[formArrayTracker]'
})
export class FormArrayTracker implements OnInit, OnDestroy {

  public name!: string | number | null;
  public changed = false;
  public value!: any;

  @Output() private readonly arrayChanged = new EventEmitter<ControlChange>();
  @Output() private readonly isChanged = new EventEmitter<boolean>();

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

      this.arrayChanged.emit({change: this.changed, value: this.value});
      this.isChanged.emit(this.changed);
    })
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }
}
