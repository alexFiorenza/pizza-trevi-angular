import { SeoService } from './../../SEO/seo.service';
import { DOCUMENT } from '@angular/common';
import { UserService } from './../services/user.service';
import { Component, OnInit, ViewChild, ElementRef, Inject, Renderer2, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  @ViewChild('loading') private loadingScreen: ElementRef;
  public form: FormGroup;
  registerLoading = false;
  registerError = false;
  constructor(private formBuilder: FormBuilder, private userService: UserService, private route: Router,
    // tslint:disable-next-line: align
    @Inject(DOCUMENT) _document, private r: Renderer2, private title: Title, private seo: SeoService) {
    this.form = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.maxLength(15), Validators.minLength(2), Validators.required]]
    });
  }

  ngOnInit(): void {
    const t = 'Inicia sesión o creá una cuenta en Pizza in Trevi';
    this.title.setTitle(t);
    this.seo.generateTags({ description: 'Inicia sesión para poder disfrutar los beneficios de comprar en Pizza in Trevi' });
    this.r.addClass(document.body, 'overflow-y-hidden');
  }
  ngOnDestroy() {
    this.r.removeClass(document.body, 'overflow-y-hidden');
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
