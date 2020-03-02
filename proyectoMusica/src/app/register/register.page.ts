import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms';
import { AuthenticateService } from '../services/authenticate.service';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage'; 

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

    registerForm:FormGroup;
    validation_message = {
      email:[
        {type:"required", message:"El email es requerido"},
        {type:"pattern", message:"email no válido"}
      ],
      password:[
        {type:"required", message:"El password es requerido"},
        {type:"minlength", message:"Minimo 5 caracteres para el password"}
      ],
      nombre:[
        {type:"required", message:"El nombre es requerido"},
        {type:"minlength", message:"Minimo 3 caracteres para el nombre"}
      ],
      apellido:[
        {type:"required", message:"El apellido es requerido"},
        {type:"minlength", message:"Minimo 3 caracteres para el apellido"}
      ]
    
    }
    errorMessage="";
    constructor(private formBuilder: FormBuilder,
      private authService: AuthenticateService,
      private navCtrl:NavController,
      private storage: Storage) {
      this.registerForm= this.formBuilder.group({
        email:new FormControl("", Validators.compose([
          Validators.required,
          Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")
        ])),
        password:new FormControl("", Validators.compose([
          Validators.required,
          Validators.minLength(5)
        ])),
        nombre:new FormControl("", Validators.compose([
          Validators.required,
          Validators.minLength(3)
        ])),
        apellido:new FormControl("", Validators.compose([
          Validators.required,
          Validators.minLength(3)
        ]))
  
      });
      }
  
  ngOnInit() {
  }

  register(userData){
    console.log(userData);
    this.authService.registerUser(userData).then(() =>{
      this.goToLogin();
    });
  }

  goToLogin(){
    this.navCtrl.navigateBack("/login");
  }

}
