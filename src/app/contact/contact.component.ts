import { SeoService } from './../SEO/seo.service';
import { environment } from 'src/environments/environment';
import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  map: mapboxgl.Map;
  faHome = faHome;

  constructor(private title: Title, private seo: SeoService) { }

  ngOnInit(): void {
    let t = 'Contacta con nosotros';
    this.seo.generateTags({
      description: 'Conoce nuestros horarios,área de cobertura y como contactar con nosotros'
    })
    this.title.setTitle(t);
    mapboxgl.accessToken = environment.mapboxKey;
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/alex-fiorenza/ckexcpv9i0kif19lk4q431mob',
      center: [-58.4227586, -34.7616921],
      zoom: 16
    });
    const marker = new mapboxgl.Marker()
      .setLngLat([-58.4227586, -34.7616921])
      .addTo(this.map);
  }
}
