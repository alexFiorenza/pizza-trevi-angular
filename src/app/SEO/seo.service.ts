import { Injectable } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SeoService {

  constructor(private meta: Meta) { }
  generateTags(config) {
    config = {
      description: 'Pizzeria y heladeria',
      slug: '',
      ...config
    };

    this.meta.updateTag({ name: 'author', content: 'pizzaintrevi.com' });
    this.meta.updateTag({ name: 'owner', content: 'Domingo Jose Fiorenza' });
    this.meta.updateTag({ name: 'description', content: config.description });
  }
}
