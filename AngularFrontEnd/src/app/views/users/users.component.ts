import { Component, OnInit } from '@angular/core';
//import { SAMPLEUSEROLES, SAMPLEUSERS } from 'src/assets/SampleData/sampledataAPI';
import { UsersService } from 'src/app/services/users.service';
import { IUserAPI, INewUserAPI, IUserRoleAPI } from 'src/app/interfaces/interfacesAPI';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
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
  editUserForm: FormGroup;


  public visibleEditForm = false;
  public visibleAddNewForm = false;

  constructor(
    private usersService: UsersService,
    private userRolesService: UserrolesService,
    fb: FormBuilder
  ) {
    this.editUserForm = fb.group({
      inputname: new FormControl(),
      checkUserRolesArray: new FormArray([]),
    });
  }

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
    console.log(this.editUserForm.value);
  }

  editForm(user: IUserAPI) {
    //const checkUserRolesArray = this.editUserForm.get('checkUserRolesArray') as FormArray;
    //checkUserRolesArray.push(new FormControl(user.roles));
    this.selectedUser = user;
    this.editUserForm.value.checkUserRolesArray = user.roles;
    this.editUserForm.value.inputname = user.name;
    console.log(this.selectedUser);
    this.toggleEditForm();
  }

  checkUserHasRole(user: IUserAPI, i: number): boolean {
    return user.roles.includes(i);
  }

  updateUser() {
    if (this.selectedUser) {
      this.selectedUser.roles = this.editUserForm.value.checkUserRolesArray;
      this.selectedUser.name = this.editUserForm.value.inputname;
      this.usersService.updateUser(this.selectedUser).subscribe();
      this.toggleEditForm();
      console.log(this.selectedUser);
      console.log(this.editUserForm.value);
    }
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
    this.getUsers();
  }

  deleteUser(user: IUserAPI): void {
    this.users = this.users.filter(h => h !== user);
    this.usersService.deleteUser(user.userID).subscribe();
  }

  handleFormChange(event: any) {
    this.visibleEditForm = event;
  }

  onCheckboxChange(e: any) {
    console.log(this.editUserForm.get('checkUserRolesArray'));
    const checkUserRolesArray = this.editUserForm.get('checkUserRolesArray') as FormArray;
    if (e.target.checked) {
      checkUserRolesArray.push(new FormControl(e.target.value));
    } else {
      const index = checkUserRolesArray.controls
        .findIndex(x => x.value === e.target.value);
      checkUserRolesArray.removeAt(index);
    }
  }
}

