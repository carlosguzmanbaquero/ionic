import { LugaresService } from './../service/lugares.service';
import { Component } from '@angular/core'
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  lugares: any =[];

  constructor(private router: Router,
    private lugaresService:LugaresService) {
      this.lugaresService.getLugares().valueChanges()
        .subscribe((lugaresBd)=>{
          this.lugares=lugaresBd;
    })
  }

  navegarALugar(){
    this.router.navigate(['/tabs/lugar',{lugar:{}}])
  }

  navegarADetalleLugar(lugar){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        special: JSON.stringify(lugar)
      }
    };
    this.router.navigate(['/tabs/lugar'],navigationExtras)
  }

  eliminarLugar(lugar){
    if(confirm('Seguro que desea eliminar el lugar?'))
      this.lugaresService.eliminarLugar(lugar).then(()=>{
        alert('Lugar eliminado');
      });
  }

}
