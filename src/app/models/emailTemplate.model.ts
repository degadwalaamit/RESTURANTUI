export interface ClassName {
    toClassName(): string;
    toComponentName(): string;
}

export class EmailTemplateModel implements ClassName {
    tenantId = '';
    emailTemplateId = '';
    documentTypeId='';
    customerContractTypeId = '';
    name = '';
    customerContractName: '';
    entityType: '';
    senderEmail='';
    toEmail:'';
    ccEmail:'';
    bccEmail:'';
    dynamicElement="";
    documentLayouts: string[] = [];
    emailNotificationDetailModel: EmailTemplateDetail[] = [];
    status:number;
    subject:string;
    emailContent:string;
    toClassName(): string {
        return this.constructor.name;
    }
    toComponentName(): string {
        return this.constructor.name;
    }
}

export class EmailTemplateDetail {
    languageId = '';
    documentLink = '';
    subject='';
    languageName = '';
    tenantId = '';
    languageObj: any;
    body='';
}
