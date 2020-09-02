import { HttpClientModule } from '@angular/common/http';
import { NgModule } from "@angular/core";
import { EmailService } from './email.service';
import { ProductService } from "./product.service";

@NgModule({
    imports: [
        HttpClientModule
    ],
    providers: [
        EmailService,
        ProductService
    ]
})
export class ServicesModule { }