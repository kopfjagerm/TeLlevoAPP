import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Storage } from '@capacitor/storage';

@Injectable({
  providedIn: 'root'
})
export class RutaProtegidaGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.validarLogueado();
  }


  async validarLogueado(){

    var retorno: boolean = false
    var dato = await Storage.get({key: 'login'})
    if (dato.value == 'OK'){
      retorno = true;
    }
    return retorno;
  }


  
}
