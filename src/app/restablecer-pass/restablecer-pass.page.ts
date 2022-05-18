import { Component, OnInit } from '@angular/core';
import {NavigationExtras, Router, ActivatedRoute} from '@angular/router';  // IMPORTAR LIBRERIA DE RUTAS
import { ToastController } from '@ionic/angular';// Libreria mensaje Toas
import { APIService } from '../servicios/api.service'; //API SERVICES 

@Component({
  selector: 'app-restablecer-pass',
  templateUrl: './restablecer-pass.page.html',
  styleUrls: ['./restablecer-pass.page.scss'],
})
export class RestablecerPassPage implements OnInit {

  //Modelo reseteo clave

  RESETPASS:any={
      correo :"",
      pass1:"",
      pass2:""
  }


  constructor(private router: Router, private activateRoute:ActivatedRoute, public toastController: ToastController, private api:APIService)
  { }

  ngOnInit() {}


  //  Funcion para validar usuario y actualizar contraseñas 
  btnCambiarPass(){

    if (this.api.validatorModelo(this.RESETPASS))
    {
      if(this.RESETPASS.pass1 == this.RESETPASS.pass2)
        {
            this.api.cambiarClave(
              {
                "correo" : this.RESETPASS.correo,
                "nueva_password" : this.RESETPASS.pass1,
                "token_equipo": this.api.tokenbase
              }).subscribe((resultado)=>{
              console.log(resultado)

              var resultadoJson = JSON.stringify(resultado) 
              var resultadoJson2 = JSON.parse(resultadoJson)
              this.api.mensajeToast(resultadoJson2.result )

              if (resultadoJson2.result == "password modificado"){
                this.router.navigate(['/login'] ); // CONTRASEÑA CAMBIADA CORRECTAMENTE 
              }

        // CONTROL DE ERRORES       
              if(resultadoJson2.result == "error al modificar el password")
              {
                this.api.mensajeToast(resultadoJson2.result )
              }})
        }
        else{
          this.api.mensajeToast(" ERROR : Contraseñas ingresadas no cohinciden ")}
      }
    else{
        this.api.mensajeToast("Falta: "+this.api.datofaltante);}
  }  // cierre BTN Cambiar pass
      


}  // cierre programa


