import { Component, OnInit } from '@angular/core';
import { SAMPLEUSEROLES, SAMPLEUSERS } from 'src/assets/SampleData/sampledataAPI';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users = SAMPLEUSERS;
  userRoles = SAMPLEUSEROLES;
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

  delteUser(){

  }

}
