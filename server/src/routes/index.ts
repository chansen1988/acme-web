import { Router } from "express";
import emailsRoute from "./emails.route";
import productsRoute from "./products.route";

interface Route {
    readonly path: string;
    readonly router: Router;
}

export const ROUTES: Route[] = [
    emailsRoute,
    productsRoute
];