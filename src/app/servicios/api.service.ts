import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ToastController } from '@ionic/angular';       // Libreria mensaje Toas
import {NavigationExtras, Router,ActivatedRoute} from '@angular/router';  // IMPORTAR LIBRERIA DE RUTAS
import { Storage } from '@capacitor/storage';

@Injectable({
  providedIn: 'root'
})
export class APIService {


  apiBase = 'https://emprende.asistenciataller.cl/API/v2/';
  tokenbase = '';

  apiToken = 'https://api.pancakeswap.info/api/v2/tokens/0xd44fd09d74cd13838f137b590497595d6b3feea4';

  constructor(private http:HttpClient,private router: Router, 
              private activateRoute :ActivatedRoute, public toastController: ToastController) 
  { 
    Storage.set({ key: 'TokenStorage' , value : '1000300120'})


}  // CIERRE CONSTRUCTOR 
  

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin':'*'
    })
  }






// Funcion permite obtener listado cuentas creadas 
getUsuarios():Observable<any>{
  this.actualizartoken();
  console.log("tokenbase  = " + this.tokenbase);
  return this.http.get(this.apiBase + "usuarios/" + this.tokenbase).pipe();
} // Cierre obtener usuarios


getViajes():Observable<any>{
  return this.http.get(this.apiBase + "obtenerViajes/1000300120").pipe();
} // Cierre obtener Viajes



// Funcion permite Loguear usuario en sistema 
loginUsuario(datos){
  this.actualizartoken();
  if (this.tokenbase == '1000300120'){
    return this.http.post(this.apiBase + 'loginUsuario', datos).pipe();
     }
  else{
    this.mensajeToast("token ingresado no corresponde")
    return null
  }
} // Cierre login usuario




// Funcion permite crear cnueva cuenta de usuario
crearUsuario(datos){
  if (this.tokenbase == '1000300120'){
    this.actualizartoken();
    return this.http.post(this.apiBase + 'crearUsuario', datos).pipe();
  }
  {
    this.mensajeToast("No fue posible crear cuenta Token no corresponde")
    return null
  }
} // Cierre CREAR USUARIO


cambiarClave(datos){
  this.actualizartoken();
  if (this.tokenbase == '1000300120'){
      return this.http.post(this.apiBase + 'modificarPassword', datos).pipe();
    }
  else{
      this.mensajeToast("No fue posible cambiar clave Token no corresponde")
      return null
    }
} // Cierre cambio de clave


//Crear Viaje

crearViaje(datos){
  this.actualizartoken();
  return this.http.post(this.apiBase + 'crearViaje', datos).pipe();
}



// inscribir viaje
inscribirViaje(datos){
  this,this.actualizartoken();
  return this.http.post(this.apiBase + 'enviarCorreoReserva', datos).pipe();
  
}








// OTRAS FUNCIONES


// Funcion permite actualizar token del sistema.
actualizartoken(){
  Storage.get({key: 'TokenStorage'}).then((valor)=> {
  this.tokenbase = (valor.value);  
  console.log("token actualizado")
}); 
} 



//Funcion permite devolver mensaje en pantalla
async mensajeToast(message:string, duration?:number)
{
 const toast = await this.toastController.create(
  {
    message:message,
    duration:duration?duration:2000
  }
 );
  toast.present()
}//cierre mensajeToast



// Validar Modelo - Permite validar un modelo de formulario con sus campos completos
    
 datofaltante: String = ""; //CAMPO PARA ERRORES
    validatorModelo(model:any){
      for(var[key,value] of Object.entries(model))
      {if(value==""){
          this.datofaltante= key;
          return false;
        }
      }
        return true;
    } // Cierre validar modelo 








} // final


