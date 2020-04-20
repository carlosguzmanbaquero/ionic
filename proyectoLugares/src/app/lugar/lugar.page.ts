import { LugaresService } from './../service/lugares.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-lugar',
  templateUrl: './lugar.page.html',
  styleUrls: ['./lugar.page.scss'],
})
export class LugarPage implements OnInit {
  
  lugar: any={};
  constructor(private router: Router, private route: ActivatedRoute,
    private lugaresService:LugaresService) { 
  }

  ngOnInit() {
  }

  guardarLugar(){
    if(!this.lugar.id)
      this.lugar.id=Date.now();
    this.lugaresService.adicionarLugar(this.lugar);
    this.router.navigate(['/tabs/home'])
  }

  navegarAHome(){
    this.router.navigate(['/tabs/home'])
  }

  ionViewWillEnter(){
    //this.lugar = this.route.snapshot.paramMap.get('lugar');
    //console.log(this.lugar);

    this.route.queryParams.subscribe(params => {
      if (params && params.special) {
        this.lugar = JSON.parse(params.special);
      }
    });
  }
}
