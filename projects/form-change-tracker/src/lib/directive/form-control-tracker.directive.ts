import {Directive, Input, OnDestroy, OnInit} from '@angular/core';
import {FormControlName, NgControl} from "@angular/forms";
import {Subscription} from "rxjs";

@Directive({
  selector: '[formControlTracker]'
})
export class FormControlTracker implements OnInit, OnDestroy {

  @Input() changeFn?: (trueValue: any, value: any) => boolean;
  @Input() isFormArray = false;
  @Input() arrayName?: string;
  @Input() arrayIndex?: number;

  public name!: string | number | null;
  public changed = false;
  public value!: any;

  private trueValue!: any;
  private _subscribe!: Subscription | undefined;

  constructor(private control: NgControl) { }

  ngOnInit(): void {
    this.name = this.control.name;
    this.trueValue = this.control.value;
    this._subscribe = this.control.valueChanges?.subscribe(v => {
      this.changed = this.control.valid && this.changeFn ? this.changeFn(this.trueValue, v) : this.trueValue !== v;
      this.value = v;
    });
  }

  ngOnDestroy(): void {
    this._subscribe?.unsubscribe();
  }
}
