import { Router } from '@angular/router';
import { UserService } from './../../services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.scss']
})
export class UserUpdateComponent implements OnInit {
  form: FormGroup;
  userData: Partial<User>;
  availableToUpdate = false;
  updatingData = false;
  constructor(private formBuilder: FormBuilder, private userService: UserService, private route: Router) {
    this.userData = this.userService.getUserData();
    this.form = this.formBuilder.group({
      name: [this.userData.name, [Validators.maxLength(30), Validators.minLength(2), Validators.required]],
      phone: [this.userData.phone, [Validators.required]],
      email: [this.userData.email, [Validators.email, Validators.required]],
      direction: [this.userData.direction, Validators.required],
      extraInfo: [this.userData.extraInfo, Validators.required]
    });
  }

  ngOnInit(): void {
    this.form.valueChanges.subscribe(p => {
      this.availableToUpdate = true;
    });

  }
  onSubmit() {
    this.updatingData = true;
    this.userService.updateUser(this.form.value).subscribe((r: any) => {
      if (r.ok) {
        this.userService.reloadToken(r.message).subscribe((res: any) => {
          this.userService.saveToken(res.token);
          this.route.navigate(['/home']);
        });
      }
    });
  }

}
