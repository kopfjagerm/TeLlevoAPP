import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';  // IMPORTAR LIBRERIA DE RUTAS
import { ToastController } from '@ionic/angular';       // Libreria mensaje Toas
import { APIService } from '../servicios/api.service';  //API SERVICES 
import { Storage } from '@capacitor/storage';           // STORAGE 



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {


//MODELO FORMULARIO
  login:any={
    correo:"",
    password:""
    }

  TokenStorage = ""



    

  constructor(private router: Router,private activateRoute :ActivatedRoute , public toastController: ToastController, private api:APIService)
  { 
    this.api.actualizartoken()
    Storage.set({ key: 'login' , value : 'FALSO'})
    //Storage.set({ key: 'TokenStorage' , value : '1000300120'})
    //Storage.clear()

 }


  ngOnInit() {

  }

  


  
  // Boton crear usuario
  btnNewUser(){
    
    console.log("Usted quiere crear un usuario")
    this.router.navigate(['/crear-usuario']);
  }   // Termino Boton restablecer constraseña
 



  // Boton restablecer constraseña
  btnRestablecer(){
    console.log("Usted quiere restablecer la contrasena")
    this.router.navigate(['/restablecer-pass'] ); 
   }
   // Termino Boton restablecer constraseña





   //CONSUMOS DE PAPI

   obtenerUsuario(){
    this.api.actualizartoken()
    this.api.getUsuarios().subscribe((resultado)=>
    {
      console.log(resultado)
    })
  } // CIERRE OBTENER USUARIOS 


    //BOTON INGRESAR 
    btningresar(){
    if(this.api.validatorModelo(this.login))
    {
      this.api.actualizartoken()  
      this.api.loginUsuario(
        {"correo": this.login.correo,
        "password": this.login.password,
        "token_equipo": this.api.tokenbase }).subscribe((resultado)=>{

        var resultadoJson = JSON.stringify(resultado) 
        var resultadoJson2 = JSON.parse(resultadoJson) 
        Storage.set({ key: 'datosusuarioJson' , value : resultadoJson  })
        Storage.set({ key: 'login' , value : 'OK'})
        //Control de error    
        if (resultadoJson2.result == 'Login incorrecto' || resultadoJson2.result == 'Debe ingresar un token de equipo')
        {
          this.api.mensajeToast(resultadoJson2.result)
          Storage.set({ key: 'login' , value : 'FALSO'})
        }
        else{

          this.router.navigate(['/home'])
  
        }
      }) // subscribe
    }
    //Control de error
    else{
     this.api.mensajeToast("Falta: "+this.api.datofaltante);
    };
     } // CIERRE LOGIN 
  





/// OTRAS FUNCIONES


cambiartoken(){
  //var JSONtoken = JSON.stringify(this.TokenStorage);
  Storage.set({ key: 'TokenStorage', value: this.login.token});
  this.api.actualizartoken();
  console.log("se guardo token nuevo token : " + this.login.token)
}


}   //cierre 
