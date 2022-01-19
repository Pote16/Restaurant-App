import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BadgeModule, GridModule, TableModule, ButtonModule, FormModule, ModalModule } from '@coreui/angular';
import { ChartjsModule } from '@coreui/angular-chartjs';

import { CategoriesComponent } from './categories.component';
import { CategoriesRoutingModule } from './categories-routing.module';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
    declarations: [CategoriesComponent],
    imports: [
        CommonModule,
        CategoriesRoutingModule,
        GridModule,
        BadgeModule,
        TableModule,
        ComponentsModule,
        ButtonModule,
        FormModule,
        ModalModule
    ]
})
export class CategoriesModule { }