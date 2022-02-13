import { Component, OnInit } from '@angular/core';
import { IMenuCategoryAPI, INewMenuCategoryAPI } from 'src/app/interfaces/interfacesAPI';
import { SAMPLECATEGORIES } from 'src/assets/SampleData/sampledataAPI';
import { CategoriesService } from 'src/app/services/categories.service';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  categoriesSample = SAMPLECATEGORIES;

  selectedCategory?: IMenuCategoryAPI;
  newCategory?: INewMenuCategoryAPI;
  categories: IMenuCategoryAPI[] = [];

  public visibleEditForm = false;
  public visibleAddNewForm = false;

  constructor(private categoriesService: CategoriesService) {

  }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(): void {
    this.categoriesService.getCategories()
      .subscribe(categories => this.categories = categories);
  }

  toggleEditForm() {
    this.visibleEditForm = !this.visibleEditForm;
  }

  editForm(category: IMenuCategoryAPI) {
    this.selectedCategory = category;
    this.toggleEditForm();
  }

  updateCategory(category: IMenuCategoryAPI) {
    this.categoriesService.updateCategory(category).subscribe();
    this.toggleEditForm();
  }


  toggleAddNewForm() {
    this.visibleAddNewForm = !this.visibleAddNewForm;
  }

  AddNewForm() {
    this.newCategory = {
      title: " ",
      desc: " "
    };
    this.toggleAddNewForm();
    this.ngOnInit();
  }

  addCategory(category: INewMenuCategoryAPI) {
    this.toggleAddNewForm();
    this.categoriesService.addCategory(category).subscribe();
    this.getCategories();
  }

  delteCategory(category: IMenuCategoryAPI): void {
    this.categories = this.categories.filter(h => h !== category);
    this.categoriesService.deleteCategory(category.categoryId).subscribe();
  }

  handleFormChange(event: any) {
    this.visibleEditForm = event;
  }
}
