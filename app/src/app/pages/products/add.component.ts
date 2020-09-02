import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';

@Component({
    selector: 'app-page-products-add',
    templateUrl: './add.component.html',
    styleUrls: ['./add.component.scss']
})
export class AddComponent {
    form = new FormGroup({
        customerId: new FormControl('', [
            Validators.required
        ]),
        domain: new FormControl('', [
            Validators.required,
            Validators.pattern(/.+\..+/)
        ]),
        duration: new FormControl('12', [
            Validators.required,
            Validators.pattern(/^\d+$/),
            Validators.min(1)
        ]),
        productName: new FormControl('domain', [
            Validators.required
        ])
    });

    get customerId() { return this.form.get('customerId') }
    get domain() { return this.form.get('domain') }
    get duration() { return this.form.get('duration') }
    get productName() { return this.form.get('productName') }

    loading = false;

    constructor(private productService: ProductService, private router: Router) { }

    async onSubmit() {
        this.loading = true;

        await this.productService.add({
            CustomerId: this.customerId.value,
            Domain: this.domain.value,
            DurationMonths: parseInt(this.duration.value),
            ProductName: this.productName.value
        });

        this.router.navigateByUrl('/products');
    }
}
