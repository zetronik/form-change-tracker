import { NgModule } from '@angular/core';
import { FormGroupTracker } from './directive/form-group-tracker.directive';
import { FormControlTracker } from './directive/form-control-tracker.directive';

@NgModule({
  declarations: [
    FormGroupTracker,
    FormControlTracker
  ],
  exports: [
    FormGroupTracker,
    FormControlTracker
  ]
})
export class FormChangeTrackerModule { }
