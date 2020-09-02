import { Product } from "../../models/product";
import domainHandler from "../domain.handler";
import { ProductHandler, ProductStep } from "../interfaces";
import secureDomainStep from "./secure-domain.step";

class PDomainHandler implements ProductHandler {
    steps: ProductStep[];
    constructor() {
        this.steps = [];
        this.steps.push(...domainHandler.steps);
        this.steps.push(secureDomainStep);
    }

    generateEmails(startDate: Date, endDate: Date): Promise<Date[]> {
        return domainHandler.generateEmails(startDate, endDate);
    }

    validate(product: Product): Promise<string> {
        return domainHandler.validate(product);
    }

}
export default <ProductHandler>new PDomainHandler();