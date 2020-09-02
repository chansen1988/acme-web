import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Product } from '../models/product';

@Injectable()
export class ProductService {
    private map: OperatorFunction<Product, Product> = map(i => this.parse(i));
    private mapAll: OperatorFunction<Product[], Product[]> = map(i => this.parseAll(i));

    constructor(private http: HttpClient) { }

    add(product: Product) {
        return this.http.post(`${environment.apiRoot}/products`, product).pipe(this.map).toPromise();        
    }

    list() {
        return this.http.get(`${environment.apiRoot}/products`).pipe(this.mapAll).toPromise();
    }

    private parse(product: Product) {
        if (product.StartDate) {
            product.StartDate = new Date(product.StartDate);
        }

        return product;
    }

    private parseAll(products: Product[]) {
        return products.map(i => this.parse(i));
    }
}