import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BadgeModule, CardModule, GridModule, TableModule, ButtonModule, FormModule, OffcanvasModule } from '@coreui/angular';
import { ChartjsModule } from '@coreui/angular-chartjs';

import { CategoriesComponent } from './categories.component';
import { CategoriesRoutingModule } from './categories-routing.module';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
    declarations: [CategoriesComponent],
    imports: [
        CommonModule,
        CategoriesRoutingModule,
        ChartjsModule,
        CardModule,
        GridModule,
        BadgeModule,
        TableModule,
        ComponentsModule,
        ButtonModule,
        FormModule,
        OffcanvasModule
    ]
})
export class CategoriesModule { }