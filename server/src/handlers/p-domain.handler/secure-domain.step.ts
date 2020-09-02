import { Product } from "../../models/product";
import logService from "../../services/log.service";
import { ProductStep } from "../interfaces";

class SecureDomainStep implements ProductStep {
    logger = logService.getLogger();

    async invoke(product: Product): Promise<void> {
        this.logger.info(`Secure Domain: ${product.Domain}`);
    }
}
export default <ProductStep>new SecureDomainStep();