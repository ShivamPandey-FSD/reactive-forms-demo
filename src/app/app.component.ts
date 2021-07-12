import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'reactive-forms';

  registrationForm: FormGroup = this.formBuilder.group({});
  submitted = false;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.registrationForm = this.formBuilder.group(
      {
        title: ['', Validators.required],
        firstName: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(25), Validators.pattern("a-zA-Z*")]],
        lastName: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(25), Validators.pattern("a-zA-Z*")]],
        dob: ['', Validators.required],
        age: ['', Validators.min(18)],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
      }, {
        validator: this.mustMatch('password', 'confirmPassword')
      }
    )

    setTimeout(() => {
     this.setDefaultValue(); 
    }, 2000)
  }

  patchTheValue() {
    this.registrationForm.patchValue({
      firstName: 'Rey',
      lastName: 'Mysterio'
    })
  }

  resetTheForm() {
    this.registrationForm.reset();
  }

  setDefaultValue() {
    this.registrationForm.setValue({
      title: 'Mr.',
      firstName: 'John',
      lastName: 'Cena',
      dob: formatDate(new Date('2003-06-25'), 'yyyy-MM-dd', 'en'),
      age: 18,
      email: 'johnCena@yahoo.com',
      password: '12345678',
      confirmPassword: '12345678'
    })
  }

  setValidationOnAge() {
    this.registrationForm.controls['age'].setValidators(Validators.requiredTrue);
  }

  removeValidationOnAge() {
    this.registrationForm.controls['age'].clearValidators();
  }

  mustMatch(pwd1: string, pwd2: string) {
    return(formGroup: FormGroup) => {
      const pwd = formGroup.controls[pwd1];
      const cfpwd = formGroup.controls[pwd2];
      if(pwd.value !== cfpwd.value) {
        cfpwd.setErrors({
          mustMatch: true
        });
      } else {
        cfpwd.setErrors(null);
      }
    }
  }

  get f() {
    return this.registrationForm.controls;
  }

  onFormSubmit() {
    this.submitted = true;
    const {
      title,
      firstName,
      lastName,
      dob,
      email,
      password,
      confirmPassword
    } = this.registrationForm.value;
  }

}
