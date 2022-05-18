import { Component, OnInit } from '@angular/core';
import { APIService } from '../servicios/api.service';  //API SERVICES 
import { Storage } from '@capacitor/storage';           // STORAGE 

@Component({
  selector: 'app-test',
  templateUrl: './test.page.html',
  styleUrls: ['./test.page.scss'],
})
export class TestPage implements OnInit {

  
  constructor(private api:APIService) {
   }

  ngOnInit() {
  }


} 



