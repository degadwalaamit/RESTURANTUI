export class ResponseModel {
    version: string;
    statusCode: number;
    message: string;
    result: string;
    stateModel: StatusModel;
    isError: boolean;
}

export class StatusModel {
    hasGeneralError: boolean;
    hasSecurityError: boolean;
    hasWarningError: boolean;
    hasSuccess: boolean;
    successMessage: string;
    warningMessage: string;
    errorMessage: string;
    securityMessage: string;
    statusCode: number;
}