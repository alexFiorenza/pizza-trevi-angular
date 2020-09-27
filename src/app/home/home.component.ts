import { environment } from './../../environments/environment';
import { SeoService } from './../SEO/seo.service';
import { UserService } from './../users-panel/services/user.service';
import { Component, OnInit, ElementRef } from '@angular/core';
import { hotestPizzas } from './hotestPizzas';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { faMoneyBillWave, faUser, faMotorcycle } from '@fortawesome/free-solid-svg-icons';
import * as mapboxgl from 'mapbox-gl';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public hotestPizzas: Array<any>;
  map: mapboxgl.Map;
  faMoneyBillWave = faMoneyBillWave;
  faUser = faUser;
  faMotorcycle = faMotorcycle;
  constructor(private route: Router, private userService: UserService, private title: Title, private seo: SeoService
  ) {
  }

  ngOnInit(): void {
    let t = 'Pizza in Trevi: Pizzeria y heladeria';
    this.title.setTitle(t);
    this.seo.generateTags({
      slug: 'home',
      description: 'Pizza in Trevi es una pizzeria y heladeria abierta al público, con un amplio menú y variedad para ofrecer'
    });
    const istokenExpired = this.userService.isTokenExpired();
    const token = this.userService.getToken();
    if (istokenExpired && token !== null) {
      const userData = this.userService.getUserData();
      this.userService.reloadToken(userData).subscribe((r: any) => {
        this.userService.saveToken(r.token);
      });
    }
    this.hotestPizzas = hotestPizzas;
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
  public hotPizza(name) {
    this.route.navigate(['menu'], { queryParams: { filter: name } });
  }
  redirectIceCream() {
    this.route.navigate(['menu'], { queryParams: { filter: 'helado' } })
  }
}
