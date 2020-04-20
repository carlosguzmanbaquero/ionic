import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LugaresService {

  constructor(public afDB: AngularFireDatabase) { }

  public getLugares(){
    return this.afDB.list('/lugares/');
  }

  public getLugar(id){
    return this.afDB.object('/lugares/'+id);
  }

  public adicionarLugar(lugar){
    return this.afDB.database.ref('/lugares/'+lugar.id).set(lugar);
  }

  public modificarLugar(lugar){
    return this.afDB.database.ref('/lugares/'+lugar.id).set(lugar);
  }

  public eliminarLugar(lugar){
    return this.afDB.database.ref('/lugares/'+lugar.id).remove(lugar);
  }

}
