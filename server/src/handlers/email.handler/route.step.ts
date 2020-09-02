import { Product } from "../../models/product";
import logService from "../../services/log.service";
import { ProductStep } from "../interfaces";

class RouteStep implements ProductStep {
    logger = logService.getLogger();

    async invoke(product: Product): Promise<void> {
        this.logger.info(`Create Email Route: ${product.Domain}`);
    }
}
export default <ProductStep>new RouteStep();