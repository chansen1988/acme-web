import moment from "moment";
import domainValidationHelper from "../../helpers/domain-validation.helper";
import { Product } from "../../models/product";
import productService from "../../services/product.service";
import billingStep from "../../steps/billing.step";
import { ProductHandler } from "../interfaces";
import provisionAccountStep from "./provision-account.step";
import welcomeEmailStep from "./welcome-email.step";

class HostingHandler implements ProductHandler {
    steps = [
        billingStep,
        provisionAccountStep,
        welcomeEmailStep
    ]

    async generateEmails(startDate: Date, endDate: Date): Promise<Date[]> {
        return [
            moment(startDate).add(moment.duration(1, 'day')).toDate(),
            moment(endDate).subtract(moment.duration(3, 'days')).toDate()
        ]
    }

    async validate(product: Product): Promise<string> {
        if (product.DurationMonths <= 0 || product.DurationMonths % 1 !== 0) {
            return `Duration must be postive multiple of 1 month`;
        }

        if (!await domainValidationHelper.isRegistered(product.Domain, product.CustomerId)) {
            return `Domain Registration Required: ${product.Domain}`;
        }

        if (await productService.find(i => i.Domain === product.Domain && i.ProductName === product.ProductName)) {
            return `Duplicate Hosting Registration: ${product.Domain}`;
        }
    }
}
export default <ProductHandler>new HostingHandler();