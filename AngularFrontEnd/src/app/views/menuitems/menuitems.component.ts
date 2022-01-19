import { Component, OnInit } from '@angular/core';
import { SAMPLEMENUITEMS } from 'src/assets/SampleData/sampledataAPI';

@Component({
  selector: 'app-menuitems',
  templateUrl: './menuitems.component.html',
  styleUrls: ['./menuitems.component.scss']
})
export class MenuitemsComponent implements OnInit {

  items = SAMPLEMENUITEMS;

  constructor() { }

  ngOnInit(): void {
  }

  public visible = false;
  toggleForm() {
    this.visible = !this.visible;
  }

  handleFormChange(event: any) {
    this.visible = event;
  }

  delteItem() {

  }

  addItem() {

  }

}
