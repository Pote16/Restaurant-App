import { Component, OnInit } from '@angular/core';
import { IMenuCategoryAPI } from 'src/app/interfaces/interfacesAPI';
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
  categories: IMenuCategoryAPI[] = [];

  constructor(private categoriesService: CategoriesService) {

  }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(): void {
    this.categoriesService.getCategories()
    .subscribe(categories => this.categories = categories);
  }

  public visible = false;

  toggleForm() {
    this.visible = !this.visible;
  }

  editCategory(category: IMenuCategoryAPI) {
    this.selectedCategory = category;
    this.toggleForm();
  }

  handleFormChange(event: any) {
    this.visible = event;
  }

  delteCategory(category: IMenuCategoryAPI): void {
    this.categories = this.categories.filter(h => h !== category);
    this.categoriesService.deleteCategory(category.categoryId).subscribe();
  }

  updateCategory(category: IMenuCategoryAPI) {
  }

}
