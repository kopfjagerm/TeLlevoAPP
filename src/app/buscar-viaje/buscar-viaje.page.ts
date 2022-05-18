import { Component, OnInit } from '@angular/core';
import { APIService } from '../servicios/api.service';
import { Storage } from '@capacitor/storage';
import {Router,ActivatedRoute} from '@angular/router';  // IMPORTAR LIBRERIA DE RUTAS

@Component({
  selector: 'app-buscar-viaje',
  templateUrl: './buscar-viaje.page.html',
  styleUrls: ['./buscar-viaje.page.scss'],
})
export class BuscarViajePage implements OnInit {

    ///datos usuario
  datosUsuario:any={
    codigo:"",
    nombre: "",
    apellidos: "", 
    correo: "",
  }  

  constructor(private api:APIService, private router: Router) {

   }
   
  viajes: any = [];

  ngOnInit() {
    this.api.actualizartoken();
    this.api.getViajes().subscribe((resultado)=>
    { 
      this.viajes = resultado.result;
      return resultado.result
    })

    Storage.get({key: 'datosusuarioJson'}).then((valor)=> {
      var objeto = JSON.parse(valor.value)
      this.datosUsuario.codigo = objeto.result[0].codigo;
      this.datosUsuario.nombre = objeto.result[0].nombre;
      this.datosUsuario.apellidos = objeto.result[0].apellidos;
      this.datosUsuario.correo = objeto.result[0].correo;
  
    }); 

  }


  btnObtenerViaje(){
    this.api.actualizartoken()
    console.log("Actualizando viajes")
    this.api.getViajes().subscribe((resultado)=>{ 
      this.viajes = resultado.result;
      return resultado.result
        })
}

btnInscribirViaje(){
  this.api.inscribirViaje(
    {"nombre": this.datosUsuario.nombre,
    "correo": this.datosUsuario.correo,
    "token_equipo": this.api.tokenbase}).subscribe((resultado)=>{
        var resultadoJson = JSON.stringify(resultado) 
        var resultadoJson2 = JSON.parse(resultadoJson)

        if (this,resultadoJson2.result = "Correo Enviado")
        {
          this.api.mensajeToast("Viaje Inscrito Correctamente")
          this.router.navigate(['/home'])
        }
        else
        {
          this.api.mensajeToast("Ocurrio un error con la inscripcion")
        }

    })

}



}
      //  horario_salida: "19:30", costo_por_persona: "1500", lugar_destino: "calle Weber 
