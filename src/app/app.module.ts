import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {ReactiveFormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {ButtonModule} from "primeng/button";
import {FormChangeTrackerModule} from "../../projects/form-change-tracker/src/lib/form-change-tracker.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    FormChangeTrackerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
