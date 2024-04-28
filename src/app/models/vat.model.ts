export interface ClassName {
    toClassName(): string;
    toComponentName(): string;
}

export class VatModel implements ClassName {
    tenantId: any;
    vatRuleId: any;
    vatName = '';
    jurisdiction = '';
    taxCode = '';
    vatTexName = '';
    taxRegimeCode = '';
    vatRegimeName = '';
    percentage = null;
    validFrom = new Date();
    validTo = new Date();
    externalReference = '';
    toClassName(): string {
        return this.constructor.name;
    }
    toComponentName(): string {
        return this.constructor.name;
    }
}