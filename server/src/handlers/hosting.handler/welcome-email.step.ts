import { Product } from "../../models/product";
import logService from "../../services/log.service";
import { ProductStep } from "../interfaces";

class WelcomeEmailStep implements ProductStep {
    logger = logService.getLogger();

    async invoke(product: Product): Promise<void> {
        this.logger.info(`Send Welcome Email: ${product.Domain} for ${product.CustomerId}`);
    }
}
export default <ProductStep>new WelcomeEmailStep();