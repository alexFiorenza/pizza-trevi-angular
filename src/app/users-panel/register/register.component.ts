import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { faArrowCircleRight } from '@fortawesome/free-solid-svg-icons';


import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  faArrow = faArrowCircleRight;
  map: mapboxgl.map;
  form: FormGroup;
  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({})
  }

  ngOnInit(): void {
    // mapboxgl.accessToken = 'pk.eyJ1IjoiYWxleC1maW9yZW56YSIsImEiOiJja2RldXV0cW0xbXVmMnhwOHltM25pdjJ5In0.bUtGd9k5KAAa0vbvGNDbJw';
    // this.map = new mapboxgl.Map({
    //   container: 'mapBox',
    //   style: 'mapbox://styles/mapbox/streets-v11',
    //   center: [-58.4224035, -34.7616737],
    //   zoom: 20.25
    // });
  }
}
