import { Product } from "../models/product";
import productService from "../services/product.service";

interface DomainValidationHelper {
    isRegistered(domain: string, customerId?: string): Promise<boolean>;
    validate(tld: RegExp, product: Product): Promise<string>;
}

class DomainValidationHelperClass implements DomainValidationHelper {
    async isRegistered(domain: string, customerId?: string) {
        const product = await productService.find(i => i.Domain === domain
            && /Domain$/i.test(i.ProductName)
            && i.StartDate <= new Date()
            && i.endDate >= new Date()
            && (!customerId || i.CustomerId === customerId));
        return !!product;
    }

    async validate(tld: RegExp, product: Product): Promise<string> {
        if (!tld.test(product.Domain)) {
            return `Unsupported Domain: ${product.Domain}`;
        }

        if (product.DurationMonths <= 0 || product.DurationMonths % 12 !== 0) {
            return `Duration must be postive multiple of 1 year (12 months)`;
        }

        if (await this.isRegistered(product.Domain)) {
            return `Duplicate Domain Registration: ${product.Domain}`;
        }
    }
}

export default <DomainValidationHelper>new DomainValidationHelperClass();