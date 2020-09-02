import moment from "moment";
import domainValidationHelper from "../../helpers/domain-validation.helper";
import { Product } from "../../models/product";
import billingStep from "../../steps/billing.step";
import { ProductHandler } from "../interfaces";
import registrationStep from "./registration.step";

class DomainHandler implements ProductHandler {
    steps = [
        billingStep,
        registrationStep
    ]

    async generateEmails(startDate: Date, endDate: Date): Promise<Date[]> {
        return [
            moment(endDate).subtract(moment.duration(2, 'days')).toDate()
        ]
    }

    validate(product: Product): Promise<string> {
        return domainValidationHelper.validate(/\.((com)|(org))$/, product);
    }
}
export default <ProductHandler>new DomainHandler();