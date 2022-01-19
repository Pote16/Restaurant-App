import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
    BadgeModule, GridModule, ModalModule, TableModule, ButtonModule,
    FormModule,
} from '@coreui/angular';
//import { ChartjsModule } from '@coreui/angular-chartjs';

import { MenuitemsComponent } from './menuitems.component';
import { MenuitemsRoutingModule } from './menuitems-routing.module';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
    declarations: [MenuitemsComponent],
    imports: [
        CommonModule,
        MenuitemsRoutingModule,
        GridModule,
        BadgeModule,
        TableModule,
        ComponentsModule,
        ButtonModule,
        FormModule,
        ModalModule
    ]
})
export class MenuitemsModule {
}