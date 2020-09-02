import moment from "moment";
import { HANDLERS } from "../handlers";
import { Product } from "../models/product";
import logService from "./log.service";

interface ProductService {
    add(...products: Product[]): Promise<void>;
    configure(product: Product): Promise<Product>;
    find(predicate: (product: Product) => boolean): Promise<Product>;
    list(): Promise<Product[]>;
}

class ProductServiceClass implements ProductService {
    data: Product[] = [];
    logger = logService.getLogger();

    async add(...products: Product[]): Promise<void> {
        for (const product of products) {
            this.logger.debug(`Adding Product: ${product.ProductName} - ${product.Domain}`);
            this.data.push(product);
        }
        this.data.sort(this.sort.bind(this));
    }

    async configure(product: Product) {
        const handler = HANDLERS[product.ProductName];

        if (!handler) {
            this.logger.warn(`Invalid Product Name: ${product.ProductName}`);
            throw new Error(`Invalid Product Name: ${product.ProductName}`);
        }

        if (product.StartDate) {
            product.StartDate = new Date(product.StartDate);
        } else {
            product.StartDate = new Date();
        }

        const validationMessage = await handler.validate(product);
        if (validationMessage) {
            this.logger.debug(`Invalid Product: ${validationMessage}`);
            throw new Error(validationMessage);
        }

        product.endDate = moment(product.StartDate).add(moment.duration(product.DurationMonths, 'months')).toDate();
        product.emails = await handler.generateEmails(product.StartDate, product.endDate);

        for (const step of handler.steps) {
            await step.invoke(product);
        }

        return product;
    }

    async find(predicate: (product: Product) => boolean): Promise<Product> {
        return this.data.find(predicate);
    }

    async list(): Promise<Product[]> {
        return this.data;
    }

    sort(a: Product, b: Product) {
        if (a.CustomerId !== b.CustomerId) {
            return a.CustomerId.localeCompare(b.CustomerId);
        }

        if (a.ProductName !== b.ProductName) {
            return a.ProductName.localeCompare(b.ProductName);
        }

        if (a.Domain !== b.Domain) {
            return a.Domain.localeCompare(b.Domain);
        }

        if (a.StartDate < b.StartDate) {
            return -1;
        }

        if (a.StartDate > b.StartDate) {
            return 1;
        }

        return 0;
    }
}

export default <ProductService>new ProductServiceClass();