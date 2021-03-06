import { SeoService } from './../../SEO/seo.service';
import { DOCUMENT } from '@angular/common';
import { UserService } from './../services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild, ElementRef, Renderer2, Inject } from '@angular/core';
import { faArrowCircleRight, faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons';


import * as mapboxgl from 'mapbox-gl';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  @ViewChild('registerForm') private form1: ElementRef;
  @ViewChild('placeForm') private form2: ElementRef;
  @ViewChild('loading') private loadingScreen: ElementRef;
  registerLoading = false;
  registerError = false;
  faLongArrowLeft = faLongArrowAltLeft;
  faArrow = faArrowCircleRight;
  map: mapboxgl.map;
  form: FormGroup;
  constructor(private formBuilder: FormBuilder, private route: Router, private userService: UserService, private r: Renderer2
    , @Inject(DOCUMENT) private _document, private title: Title, private seo: SeoService) {
    this.form = this.formBuilder.group({
      name: ['', [Validators.maxLength(30), Validators.minLength(2), Validators.required]],
      phone: ['', [Validators.required]],
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.minLength(8), Validators.required]],
      repeteadPassword: ['', [Validators.required]],
      direction: ['', Validators.required],
      extraInfo: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const t = 'Regístrate en Pizza in Trevi';
    this.title.setTitle(t);
    this.seo.generateTags({ description: 'Creá una cuenta para poder disfrutar los beneficios de comprar en Pizza in Trevi' });
  }
  onSubmit(form) {
    const userData = this.form.value;

    if (this.form.get('password').value !== this.form.get('repeteadPassword').value) {
      this.loadingScreen.nativeElement.classList.remove('hidden');
      this.loadingScreen.nativeElement.classList.add('block');
      this.registerLoading = true;
      this.registerError = true;
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } else {
      this.loadingScreen.nativeElement.classList.remove('hidden');
      this.loadingScreen.nativeElement.classList.add('block');

      return this.userService.registerUser(userData).subscribe((data: any) => {
        if (data.ok) {
          this.registerLoading = true;
          this.registerError = false;
          setTimeout(() => {
            return this.route.navigate(['login']);
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

}
