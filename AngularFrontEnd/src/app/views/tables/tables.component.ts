import { Component, OnInit } from '@angular/core';
import { SAMPLETABLES } from 'src/assets/SampleData/sampledataAPI';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit {

  tables = SAMPLETABLES;

  constructor() { 
    
  }
  

  ngOnInit(): void {
  }

  public visible = false;

  toggleForm() {
    this.visible = !this.visible;
  }

  handleFormChange(event: any) {
    this.visible = event;
  }

  deleteTable(){

  }

  createQRCode(){
    
  }

}
