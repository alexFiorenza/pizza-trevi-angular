import { SeoService } from './SEO/seo.service';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private title: Title, private seo: SeoService) {
  }
  ngOnInit() {

  }
}
