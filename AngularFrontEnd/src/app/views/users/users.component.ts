import { Component, OnInit } from '@angular/core';
import { SAMPLEUSEROLES, SAMPLEUSERS } from 'src/assets/SampleData/sampledataAPI';
import { UsersService } from 'src/app/services/users.service';
import { IUserAPI, INewUserAPI, IUserRoleAPI } from 'src/app/interfaces/interfacesAPI';
import { FormGroup, FormControl } from '@angular/forms';
import { UserrolesService } from 'src/app/services/userroles.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  selectedUser?: IUserAPI;
  newUser?: INewUserAPI;
  users: IUserAPI[] = [];
  userRoles: IUserRoleAPI[] = [];

  public visibleEditForm = false;
  public visibleAddNewForm = false;

  constructor(
    private usersService: UsersService,
    private userRolesService: UserrolesService
    ) {}

  ngOnInit(): void {
    this.getUsers();
    this.getUserRoles();
  }

  getUsers(): void {
    this.usersService.getUsers()
      .subscribe(users => this.users = users);
  }
  getUserRoles(): void {
    this.userRolesService.getUserRoles()
      .subscribe(userRoles => this.userRoles = userRoles);
  }

  toggleEditForm() {
    this.visibleEditForm = !this.visibleEditForm;
  }

  editForm(user: IUserAPI) {
    this.selectedUser = user;
    this.toggleEditForm();
  }

  updateUser(user: IUserAPI) {
    //this.users = this.users.filter(h => h !== user);
    this.usersService.updateUser(user).subscribe();
    this.toggleEditForm();
  }


  toggleAddNewForm() {
    this.visibleAddNewForm = !this.visibleAddNewForm;
  }

  AddNewForm() {
    this.newUser = {
      name: " ",
      roles: [1]
    };
    this.toggleAddNewForm();
    this.ngOnInit();
  }

  addUser(user: INewUserAPI) {
    this.toggleAddNewForm();
    this.usersService.addUser(user).subscribe();
  }

  deleteUser(user: IUserAPI): void {
    this.users = this.users.filter(h => h !== user);
    this.usersService.deleteUser(user.userID).subscribe();
  }

  handleFormChange(event: any) {
    this.visibleEditForm = event;
  }

  editUserForm = new FormGroup({
    Name: new FormControl(''),
    userRole: new FormControl(''),
  });

}

