import { NgModule } from '@angular/core';
import { FormGroupTracker } from './directive/form-group-tracker.directive';
import { FormControlTracker } from './directive/form-control-tracker.directive';
import { FormArrayTracker } from './directive/form-array-tracker.directive';

@NgModule({
  declarations: [
    FormGroupTracker,
    FormArrayTracker,
    FormControlTracker,
  ],
  exports: [
    FormGroupTracker,
    FormArrayTracker,
    FormControlTracker,
  ]
})
export class FormChangeTrackerModule { }
