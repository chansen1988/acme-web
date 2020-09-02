import domainHandler from "./domain.handler";
import eDomainHandler from "./e-domain.handler";
import emailHandler from "./email.handler";
import hostingHandler from "./hosting.handler";
import { ProductHandler } from "./interfaces";
import pDomainHandler from "./p-domain.handler";

export const HANDLERS: { [productName: string]: ProductHandler } = {
    domain: domainHandler,
    edomain: eDomainHandler,
    email: emailHandler,
    hosting: hostingHandler,
    pdomain: pDomainHandler
}