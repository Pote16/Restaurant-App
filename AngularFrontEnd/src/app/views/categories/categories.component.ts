import { Component, OnInit } from '@angular/core';
import { SAMPLECATEGORIES } from 'src/assets/SampleData/sampledataAPI';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  categories = SAMPLECATEGORIES;
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

  delteCategory(){

  }

}
