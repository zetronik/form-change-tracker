import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

const user = {
  name: 'Andrey',
  surname: 'Omelchenko'
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  form!: FormGroup
  disabled = true;

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(user.name, {
        validators: Validators.required,
      }),
      surname: new FormControl(user.surname, {
        validators: Validators.required,
      })
    })
  }

  changeFn(trueValue: any, value: any): boolean {
    return trueValue !== value;
  }

  formChanged(form: any): void {
    console.log(form);
  }

  submit(): void {
    console.log(this.form.getRawValue());
  }
}
