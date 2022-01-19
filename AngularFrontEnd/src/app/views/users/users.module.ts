import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BadgeModule, GridModule, ModalModule, TableModule, ButtonModule,
    FormModule, } from '@coreui/angular';
//import { ChartjsModule } from '@coreui/angular-chartjs';

import { UsersComponent } from './users.component';
import { UsersRoutingModule } from './users-routing.module';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
    declarations: [UsersComponent],
    imports: [
        CommonModule,
        UsersRoutingModule,
        GridModule,
        BadgeModule,
        TableModule,
        ComponentsModule,
        ButtonModule,
        FormModule,
        ModalModule
    ]
})
export class UsersModule {
}