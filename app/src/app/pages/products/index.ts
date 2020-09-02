import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { Routes } from '@angular/router';
import { ServicesModule } from '../../services';
import { AddComponent } from './add.component';
import { ListComponent } from './list.component';

export const ProductRoutes: Routes = [
    {
        component: ListComponent,
        data: {
            title: 'Products'
        },
        path: '',
        pathMatch: 'full'
    },
    {
        component: AddComponent,
        data: {
            title: 'Add Product'
        },
        path: 'add'
    }
];

@NgModule({
    declarations: [
        AddComponent,
        ListComponent
    ],
    imports: [
        CommonModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatSelectModule,
        MatTableModule,
        ReactiveFormsModule,
        ServicesModule
    ]
})
export class ProductModule { }