import { Request, Response } from 'express';
import PromiseRouter from 'express-promise-router';
import moment from 'moment';
import { HANDLERS } from '../handlers';
import { Product } from '../models/product';
import logService from '../services/log.service';
import productService from '../services/product.service';

class ProductsRoute {
    logger = logService.getLogger();
    path = '/api/products';
    router = PromiseRouter()
        .get('/', this.listProducts.bind(this))
        .post('/', this.addProduct.bind(this))
        .post('/load', this.loadProducts.bind(this));

    async addProduct(req: Request<any, any, Product>, res: Response) {
        let product: Product;
        try {
            product = await productService.configure(req.body);
        } catch (e) {
            res.status(400).send(e.message).end();
            return;
        }

        //Add product
        await productService.add(product);

        //Return success
        res.status(201).json(this._format(product)).end();
    }

    async loadProducts(req: Request<any, any, Product[]>, res: Response) {
        const products: Product[] = [];

        for (const item of req.body) {
            try {
                const product = await productService.configure(item);
                await productService.add(product);
                products.push(product);
            } catch (e) {
                res.status(400).send(e.message).end();
                return;
            }
        }

        //Return success
        res.status(201).json(products.map(i => this._format(i))).end();
    }

    async listProducts(_: any, res: Response) {
        const products = await productService.list();

        const data = products.map(i => this._format(i));

        res.status(200).json(data).end();
    }

    _format(product: Product): Product {
        return {
            CustomerId: product.CustomerId,
            Domain: product.Domain,
            DurationMonths: product.DurationMonths,
            ProductName: product.ProductName,
            StartDate: product.StartDate
        }
    }

    async _prepare(product: Product): Promise<{ message: string; status: number }> {
        const handler = HANDLERS[product.ProductName];

        if (!handler) {
            this.logger.warn(`Invalid Product Name: ${product.ProductName}`);
            return {
                message: `Invalid Product Name: ${product.ProductName}`,
                status: 400
            };
        }

        if (!product.StartDate) {
            product.StartDate = new Date();
        }

        const validationMessage = await handler.validate(product);
        if (validationMessage) {
            this.logger.debug(`Invalid Product: ${validationMessage}`);
            return {
                message: validationMessage,
                status: 409
            };
        }

        const endDate = moment(product.StartDate).add(moment.duration(product.DurationMonths, 'months')).toDate();
        product.emails = await handler.generateEmails(product.StartDate, endDate);
    }
}

export default new ProductsRoute();