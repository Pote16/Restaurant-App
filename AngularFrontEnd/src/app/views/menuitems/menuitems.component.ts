import { Component, OnInit } from '@angular/core';
import { IAllergensAPI, IMenuCategoryAPI, IMenuItemAPI, INewMenuItemAPI } from 'src/app/interfaces/interfacesAPI';
import { MenuItemsService } from 'src/app/services/menuitems.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { AllergensService } from 'src/app/services/allergens.service';

//import { ALLERGENS, SAMPLECATEGORIES, SAMPLEMENUITEMS } from 'src/assets/SampleData/sampledataAPI';

@Component({
  selector: 'app-menuitems',
  templateUrl: './menuitems.component.html',
  styleUrls: ['./menuitems.component.scss']
})
export class MenuitemsComponent implements OnInit {

  //items = SAMPLEMENUITEMS;
  //allergens = ALLERGENS;
  //categories = SAMPLECATEGORIES;

  selectedMenuItem?: IMenuItemAPI;
  newMenuItem?: INewMenuItemAPI;
  menuItems: IMenuItemAPI[] = [];
  menuCategories: IMenuCategoryAPI[] = [];
  allergens: IAllergensAPI[] = [];

  public visibleEditForm = false;
  public visibleAddNewForm = false;

  constructor(
    private menuItemsService: MenuItemsService,
    private categoriesService: CategoriesService,
    private allergensService: AllergensService
  ) {

  }

  ngOnInit(): void {
    this.getMenuItems();
    this.getMenuCategories();
    this.getAllergens();
  }

  getMenuItems(): void {
    this.menuItemsService.getMenuItems()
      .subscribe(menuItems => this.menuItems = menuItems);
  }

  getMenuCategories(): void {
    this.categoriesService.getCategories()
      .subscribe(menuCategories => this.menuCategories = menuCategories);
  }

  getAllergens(): void {
    this.allergensService.getAllergens()
      .subscribe(allergens => this.allergens = allergens);
  }

  toggleEditForm() {
    this.visibleEditForm = !this.visibleEditForm;
  }

  editForm(menuItem: IMenuItemAPI) {
    this.selectedMenuItem = menuItem;
    this.toggleEditForm();
  }

  updateMenuItem(menuItem: IMenuItemAPI) {
    this.menuItemsService.updateMenuItem(menuItem).subscribe();
    this.toggleEditForm();
  }


  toggleAddNewForm() {
    this.visibleAddNewForm = !this.visibleAddNewForm;
  }

  AddNewForm() {
    this.newMenuItem = {
      title: " ",
      desc: " ",
      price: 0,
      category: [],
      allergens: [],
      status: 1
    };
    this.toggleAddNewForm();
    this.ngOnInit();
  }

  addMenuItem(menuItem: INewMenuItemAPI) {
    this.toggleAddNewForm();
    this.menuItemsService.addMenuItem(menuItem).subscribe();
  }

  deleteMenuItem(menuItem: IMenuItemAPI): void {
    this.menuItems = this.menuItems.filter(h => h !== menuItem);
    this.menuItemsService.deleteMenuItem(menuItem.itemId).subscribe();
  }

  handleFormChange(event: any) {
    this.visibleEditForm = event;
  }

}
