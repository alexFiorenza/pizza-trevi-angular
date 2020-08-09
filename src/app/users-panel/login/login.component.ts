import { UserService } from './../services/user.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild('loading') private loadingScreen: ElementRef;
  public form: FormGroup;
  registerLoading = false;
  registerError = false;
  constructor(private formBuilder: FormBuilder, private userService: UserService, private route: Router) {
    this.form = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.maxLength(15), Validators.minLength(2), Validators.required]]
    });

  }

  ngOnInit(): void {
  }
  onSubmit($event) {
    this.loadingScreen.nativeElement.classList.remove('hidden');
    this.loadingScreen.nativeElement.classList.add('block');
    this.userService.logInUser(this.form.value).subscribe(data => {
      if (data.ok) {
        this.userService.saveToken(data.token);
        this.registerLoading = true;
        this.registerError = false;
        setTimeout(() => {
          return this.route.navigate(['home']);
        }, 1200);
      }
    }, err => {
      if (!err.error.ok) {
        this.registerLoading = true;
        this.registerError = true;
        setTimeout(() => {
          window.location.reload();
        }, 1200);
        console.log(new Error('An error in the request had occured'));
      }
    });
  }
}
