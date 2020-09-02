import { ProductStep } from "../handlers/interfaces";
import { Product } from "../models/product";
import logService from "../services/log.service";

class BillingStep implements ProductStep {
    logger = logService.getLogger();

    async invoke(product: Product) {
        this.logger.info(`Send Bill to Customer ${product.CustomerId} for ${product.Domain} (${product.ProductName})`);
    }
}
export default <ProductStep>new BillingStep();