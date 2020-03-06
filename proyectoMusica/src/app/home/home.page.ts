import { Component,OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  slideOpt ={
    initialSlide:2,
    slidesPerView:4,
    centeredSlides: true,
    speed:400

  }

  artists=[{},{}, {},{}, {},{}, {},{}, {},{}];
  constructor(){}

  ngOnInit() {
  }
}
