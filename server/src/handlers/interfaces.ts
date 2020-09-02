import { Product } from "../models/product";

export interface ProductHandler {
    readonly steps: ProductStep[];

    generateEmails(startDate: Date, endDate: Date): Promise<Date[]>;
    validate(product: Product): Promise<string>;
}

export interface ProductStep {
    invoke(product: Product): Promise<void>;
}