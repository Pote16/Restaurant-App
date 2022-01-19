import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BadgeModule, CardModule, GridModule } from '@coreui/angular';
import { ChartjsModule } from '@coreui/angular-chartjs';

import { UsersComponent } from './users.component';
import { UsersRoutingModule } from './users-routing.module';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
    declarations: [UsersComponent],
    imports: [
        CommonModule,
        UsersRoutingModule,
        ChartjsModule,
        CardModule,
        GridModule,
        BadgeModule,
        ComponentsModule
    ]
})
export class UsersModule {
}