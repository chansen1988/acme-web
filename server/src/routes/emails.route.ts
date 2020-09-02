import { Response } from "express";
import PromiseRouter from "express-promise-router";
import flatten from 'flatten';
import productService from "../services/product.service";

interface Email {
    CustomerId: string;
    Domain: string;
    ProductName: string;
    SendDate: Date;
}

class EmailsRoute {
    path = '/api/emails';
    router = PromiseRouter()
        .get('/', this.listEmails.bind(this));

    async listEmails(_: any, res: Response) {
        const products = await productService.list();

        const emails: Email[] = flatten(products.map(p => p.emails.map<Email>(e => {
            return {
                CustomerId: p.CustomerId,
                Domain: p.Domain,
                ProductName: p.ProductName,
                SendDate: e
            }
        })));

        emails.sort(this.sort.bind(this));

        res.status(200).json(emails).end();
    }

    sort(a: Email, b: Email) {
        if (a.SendDate < b.SendDate) {
            return -1;
        }

        if (a.SendDate > b.SendDate) {
            return 1;
        }

        return a.Domain.localeCompare(b.Domain);
    }
}
export default new EmailsRoute();