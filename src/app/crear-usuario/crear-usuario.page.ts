import { Component, OnInit } from '@angular/core';
import {NavigationExtras, Router, ActivatedRoute} from '@angular/router';  // IMPORTAR LIBRERIA DE RUTAS
import { ToastController } from '@ionic/angular';// Libreria mensaje Toas
import { APIService } from '../servicios/api.service'; //API SERVICES 


@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.page.html',
  styleUrls: ['./crear-usuario.page.scss'],
})
export class CrearUsuarioPage implements OnInit {


  USUARIONUEVO:any={
  nombre:"",
  apellidos:"",
  email:"",
  pass1 : "",
  pass2 : "",
  token_equipo: "1000300120"
  }


  constructor(private router: Router, private activateRoute:ActivatedRoute, public toastController: ToastController, private api:APIService){ }

  ngOnInit() {  }

//creacion de cuenta
  btnCrearcuenta(){

    if(this.api.validatorModelo(this.USUARIONUEVO))
    {
      if(this.USUARIONUEVO.pass1 == this.USUARIONUEVO.pass2)
      {
      console.log("Creando Usuario")
      this.api.crearUsuario(
        {
         "nombre": this.USUARIONUEVO.nombre,
         "apellidos": this.USUARIONUEVO.apellidos,
         "correo": this.USUARIONUEVO.email,         
         "password": this.USUARIONUEVO.pass1,        
         "token_equipo": this.api.tokenbase
        }).subscribe((resultado)=>{
        console.log(resultado)})

      this.api.mensajeToast("Cuenta creada correctamente")
      this.router.navigate(['/login']) // redirigir a login
      }

      //Control de Errores 
      else{
          this.api.mensajeToast("contraseñas ingresadas no cohinciden")
        }
      }
    else{
      this.api.mensajeToast("Falta: "+this.api.datofaltante);
    } 
}; // Cierre creacion de cuenta 


} // Cierre programa

