import { TestBed, ComponentFixture, waitForAsync } from '@angular/core/testing';
import { APIService } from './api.service';
import {of} from 'rxjs'


describe('APIService', () => {
  let service: APIService;
  let httpClientSpy: {get: jasmine.Spy};

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(APIService);
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
  });


  it('Probar servicio GetUsuarios detalle de cuentas', () =>{
    
    var expectedDetail: any = {
      "result": [
        {
            "apellidos":"test",
            "codigo": "1",
            "correo": "test",
            "nombre": "test everet"
        }
      ]
    };

    console.log(expectedDetail)
    httpClientSpy.get.and.returnValue(of(expectedDetail));


    service.getUsuarios().subscribe((detalle) => {
      console.log("detalle usuario: " +  detalle.result[0].correo)
      expect(detalle.result[0].correo).toBe("test")
    });


  });
});



