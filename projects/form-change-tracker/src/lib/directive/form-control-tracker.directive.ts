import {Directive, Input, OnDestroy, OnInit} from '@angular/core';
import {NgControl} from "@angular/forms";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";

@Directive({
  selector: '[formControl], [formControlName]'
})
export class FormControlTracker implements OnInit, OnDestroy {

  @Input() changeFn?: (trueValue: any, value: any) => boolean;
  @Input() isFormArray = false;

  public name!: string | number | null;
  public changed = false;
  public value!: any;

  private trueValue!: any;
  private componentDestroyed$: Subject<void> = new Subject<void>();

  constructor(private control: NgControl) {}

  ngOnInit(): void {
    this.name = this.control.name;
    this.trueValue = this.control.value;
    this.control.valueChanges?.pipe(takeUntil(this.componentDestroyed$)).subscribe(v => {
      if (this.control.valid) {
        this.changed = this.changeFn ? this.changeFn(this.trueValue, v) : this.trueValue !== v;
        this.value = v;
      } else {
        this.changed = false;
      }
    });
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }
}
