import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage'; 

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  constructor(private storage: Storage) { }

  async loginUser(credential){
    //const user=await this.storage.get("user");
    return new Promise((accept, reject)=>{
      
      this.storage.get('user').then((val) => {

        if(val==null){
          console.log('El usuario no se encuentra registrado');
          reject("El usuario no se encuentra registrado");
        }else{
          let passwordEncriptado=btoa(credential.password);
          console.log('clave '+passwordEncriptado);
          if(credential.email==val.email && passwordEncriptado==val.password){
            accept("Login correcto");
          }else{
            reject("Login incorrecto");
          }
        }
      
      });    
     
    });
  }

  loginUser2(credential){
    return fetch("url_del_Servidor");
  }

  registerUser(userData){
    userData.password = btoa(userData.password);
    return this.storage.set('user', userData);
  }
}
