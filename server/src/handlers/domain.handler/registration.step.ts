import { Product } from "../../models/product";
import logService from "../../services/log.service";
import { ProductStep } from "../interfaces";

class RegistrationStep implements ProductStep {
    logger = logService.getLogger();

    async invoke(product: Product) {
        this.logger.info(`Register Domain: ${product.Domain}`);
    }
}
export default <ProductStep>new RegistrationStep();