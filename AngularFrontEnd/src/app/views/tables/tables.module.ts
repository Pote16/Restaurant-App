import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
    BadgeModule, GridModule, ModalModule, TableModule, ButtonModule,
    FormModule,CardModule
} from '@coreui/angular';
//import { ChartjsModule } from '@coreui/angular-chartjs';

import { TablesComponent } from './tables.component';
import { TablesRoutingModule } from './tables-routing.module';
import { ComponentsModule } from '../../../components/components.module';
import {QRCodeModule} from "angularx-qrcode";

@NgModule({
    declarations: [TablesComponent],
    imports: [
        CommonModule,
        TablesRoutingModule,
        GridModule,
        BadgeModule,
        TableModule,
        ComponentsModule,
        ButtonModule,
        FormModule,
        ModalModule,
        FormsModule,
        CardModule,
        QRCodeModule
    ]
})
export class TablesModule {
}
