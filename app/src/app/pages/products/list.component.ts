import { Component, OnInit } from '@angular/core';
import moment from 'moment';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-page-products-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
    columns = [
        'CustomerId',
        'ProductName',
        'Domain',
        'StartDate',
        'DurationMonths'
    ]
    products: Product[];

    constructor(private productService: ProductService, public router: Router) { }

    formatDate(value: Date) {
        return moment(value).startOf('day').format('MMM D, YYYY');
    }

    async ngOnInit() {
        this.products = await this.productService.list();
    }
}
