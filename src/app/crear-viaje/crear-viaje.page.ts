import { Component, OnInit } from '@angular/core';
import { APIService } from '../servicios/api.service';
import {Router,ActivatedRoute} from '@angular/router';  // IMPORTAR LIBRERIA DE RUTAS

@Component({
  selector: 'app-crear-viaje',
  templateUrl: './crear-viaje.page.html',
  styleUrls: ['./crear-viaje.page.scss'],
})
export class CrearViajePage implements OnInit {

  trip:any={
    origen:"",
    destino:"",
    hora:"",
    costo:"",
    cupo:"",
    auto:""
  }

  constructor(private api:APIService, private router: Router) {
    this.api.actualizartoken()
   }

  ngOnInit() {}


  btnSaveTrip2(){
    console.log("Usted esta guardando: " + this.trip.destino + " " 
    + this.trip.hora+ " " 
    + this.trip.costo)

  }


  btnSaveTrip(){
  this.api.actualizartoken()  
  this.api.crearViaje(
    {
      "horario_salida": this.trip.hora,
      "costo_por_persona": this.trip.costo,
      "lugar_destino": this.trip.destino,
      "token_equipo": this.api.tokenbase}).subscribe((resultado)=>
        {
          var resultadoJson = JSON.stringify(resultado) 
          var resultadoJson2 = JSON.parse(resultadoJson)
          console.log(resultado)
          console.log(resultadoJson2.result)
          this.api.mensajeToast(resultadoJson2.result)
          this.router.navigate(['/home'])
        }
    )
  } // fin saveTrip
  





}//final doc

