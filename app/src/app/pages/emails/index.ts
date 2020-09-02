import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { Routes } from '@angular/router';
import { ServicesModule } from '../../services';
import { ListComponent } from './list.component';

export const EmailRoutes: Routes = [
    {
        component: ListComponent,
        data: {
            title: 'Emails'
        },
        path: '',
        pathMatch: 'full'
    }
];

@NgModule({
    declarations: [
        ListComponent
    ],
    imports: [
        CommonModule,
        MatProgressSpinnerModule,
        MatTableModule,
        ServicesModule
    ]
})
export class EmailModule { }