import { Component } from '@angular/core';
//import {NavigationExtras, Router, ActivatedRoute} from '@angular/router';  // IMPORTAR LIBRERIA DE RUTAS
import { AlertController } from '@ionic/angular';
import { Storage } from '@capacitor/storage';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {


  ///datos usuario
  datosUsuario:any={
    codigo:"",
    nombre: "",
    apellidos: "", 
    correo: "",
  }  



  constructor(public alertController: AlertController, private routerModule: RouterModule) {
  
    // Home obtener datos de usuario del Storage
  Storage.get({key: 'datosusuarioJson'}).then((valor)=> {
    var objeto = JSON.parse(valor.value)
    this.datosUsuario.codigo = objeto.result[0].codigo;
    this.datosUsuario.nombre = objeto.result[0].nombre;
    this.datosUsuario.apellidos = objeto.result[0].apellidos;
    this.datosUsuario.correo = objeto.result[0].correo;



  }); 
  }
  

}
