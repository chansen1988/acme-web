import domainValidationHelper from "../../helpers/domain-validation.helper";
import { Product } from "../../models/product";
import domainHandler from "../domain.handler";
import { ProductHandler } from "../interfaces";

class EDomainHandler implements ProductHandler {
    steps = domainHandler.steps;

    generateEmails(startDate: Date, endDate: Date): Promise<Date[]> {
        return domainHandler.generateEmails(startDate, endDate);
    }

    validate(product: Product): Promise<string> {
        return domainValidationHelper.validate(/\.(edu)$/, product);
    }
}
export default <ProductHandler>new EDomainHandler();