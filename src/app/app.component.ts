import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {citiesMock, userMock} from "./mock-data";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private user = userMock;
  public  readonly cities = citiesMock;

  public form!: FormGroup
  public disabled = true;
  public getValueChange = false;
  public changed = false;
  public changeValue?: any

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(this.user.name, {
        validators: Validators.required,
      }),
      surname: new FormControl(this.user.surname, {
        validators: Validators.required,
      }),
      description: new FormControl(this.user.description),
      admin: new FormControl(this.user.admin),
      cities: new FormControl(this.user.cities),
    })

    const access = this.user.access.map(a => new FormGroup({
      name: new FormControl(a.name, Validators.required),
      access: new FormControl(a.access)
    }))

    this.form.addControl('access', new FormArray(access));
  }

  get accessGroup(): FormGroup[] {
    return (this.form.get('access') as FormArray).controls as FormGroup[];
  }

  changeFn(trueValue: any[], value: any[]): boolean {
    const a = trueValue.filter(t => !value.some(v => v.id === t.id));
    const b = value.filter(v => !trueValue.some(t => v.id === t.id));

    return !!a.length || !!b.length;
  }

  isChanged(changed: boolean): void {
    this.disabled = !changed;
    this.changed = changed;
  }

  formChanged(changeValue: any): void {
    this.changeValue = changeValue;
  }

  submit(): void {
    //
  }
}
