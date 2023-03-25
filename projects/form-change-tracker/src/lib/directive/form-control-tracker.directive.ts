import {Directive, OnDestroy, OnInit} from '@angular/core';
import {FormControlName} from "@angular/forms";
import {Subscription} from "rxjs";

@Directive({
  selector: '[formControlTracker]'
})
export class FormControlTracker implements OnInit, OnDestroy {

  public name!: string | number | null;
  public changed = false;
  public value!: any;

  private trueValue!: any;
  private _subscribe!: Subscription | undefined;

  constructor(private formControlName: FormControlName) { }

  ngOnInit(): void {
    this.name = this.formControlName.name;
    this.trueValue = this.formControlName.value;

    this._subscribe = this.formControlName.valueChanges?.subscribe(v => {
      this.changed = this.trueValue !== v;
      this.value = {[this.name as string]: v};
    });
  }

  ngOnDestroy(): void {
    this._subscribe?.unsubscribe();
  }
}
