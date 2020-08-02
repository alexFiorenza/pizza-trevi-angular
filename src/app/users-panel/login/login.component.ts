import { UserService } from './../services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public form: FormGroup;

  constructor(private formBuilder: FormBuilder, private userService: UserService) {
    this.form = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.maxLength(15), Validators.minLength(2), Validators.required]]
    });

  }

  ngOnInit(): void {
  }
  onSubmit($event) {
    console.log(this.form.value);
    this.userService.logInUser(this.form.value).subscribe(data => {
      console.log(data);
    });
  }
}