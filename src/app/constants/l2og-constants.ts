import { Validation } from "./Validationvalue.constant";

export class L2ogConstants {
  public static L2ogDocuments = "l2ogdocuments";
  public static MaxFileSizeOfL2ogDocument = 30720;
  public static PipeLineVehicle = "pipeline-vehicle";
  public static Financehistory = "Finance history";
  public static ThresholdDays = 28;
  public static ThresholdMileage = 1000;
  public static Settled = "Settled";
  public static Returned = "Returned";
  public static InsepctionReportSize = 30 * 1024 * 1024; // Bytes
  public static DamageImageSize = 5 * 1024 * 1024; // Bytes
  public static MailMaxAttachmentSize = 10485760;
  public static AllowedExtensionsImageAndDocument = [
    ".apng",
    ".avif",
    ".gif",
    ".jpg",
    ".jpeg",
    ".jfif",
    ".pjpeg",
    ".pjp",
    ".png",
    ".svg",
    ".webp",
    ".pdf",
    ".doc",
    ".docx",
    ".xls",
    ".xlsx",
  ];

  public static AllowedExtensionsImage = [
    ".apng",
    ".avif",
    ".gif",
    ".jpg",
    ".jpeg",
    ".jfif",
    ".pjpeg",
    ".pjp",
    ".png",
    ".svg",
    ".webp",
  ];
  public static ServiceRunHour = 9;
  public static MimeTypeForDocuments = [
    "application/msword",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.template",
    "application/pdf"
  ]

  public static DisplayName = "[User First Name & Last Name]";
  public static Email = "[Email]";
  public static RegistrationNumber = "[Registration Number]";
  public static LocationAddress = "[Location Address]";
  public static WorkTelephone = "[Work Telephone]";
  public static PONumber = "[PO Number]";
  public static VehicleDerivative = "[Make Model Range Derivative]";
  public static Mileage = "[Mileage]";
  public static Notes = "[Notes]";
  public static ClaimType = "[Claim Type]";
  public static IsDriveable = "[Is Driveable]";
  public static IsRecovery = "[Is Recovery]";
  public static ChargesToPay = "[Charges To Pay]";
  public static DamageDetails = "[DamageDetails]";
  public static Description = "[Description]";
  public static Type = "[Type]";
  public static SettlementAmount = "[Settlement Amount]";
  public static SettlementExpiryDate = "[Settlement Expiry Date]";
  public static AvailbleFromDate = "[Available from date]";
  public static DamageDetailReplace = "<tr><td style='font-size: 14px; border-right: 1px solid #333; border-bottom: 1px solid #333; font-family: Calibri, Candara, Segoe, Segoe UI, Optima, Arial, sans-serif; padding: 5px 5px'>[Type]</td><td style='font-size: 14px; border-bottom: 1px solid #333; font-family: Calibri, Candara, Segoe, Segoe UI, Optima, Arial, sans-serif; padding: 5px 5px'>[Description]</td></tr>";
  public static pageSwitchDictionary = {
    'instock':{
      url :'instock',
      pageName:'L2OG.InStock'
    },
    'pipeline':{
      url:'pipeline',
      pageName:'L2OG.Pipeline'
    },
    'sold-vehicle':{
      url:'sold-vehicle',
      pageName:'L2OG.soldVehicle'
    },
    'in-contract-vehicle':{
      url:'in-contract-vehicle',
      pageName:'L2OG.inContractVehicle'
    },
    'returned-vehicles':{
      url:'returned-vehicles',
      pageName:'L2OG.ReturnToFunder'
    }
  }

  // max 30mb and 3 files at once
  static L2ogFilesUploadConfig = {
    containerName : L2ogConstants.L2ogDocuments ,
    allowedExtensions : L2ogConstants.AllowedExtensionsImageAndDocument ,
    maxSize : Validation.ThirtyMb * Validation.OneMb,
    maxSizeMsg : "Common.MaxSize30MB" ,
    invalidExtensionMsg : "Common.FileExtensionNotAllowed" ,
    maxFiles : Validation.MaxThreeFiles ,
    maxFilesMsg : "Common.MaxThreeFilesAtTime"
  }

  // max 10 mb files
  static L2ogEmailFilesConfig = {
    containerName : L2ogConstants.L2ogDocuments ,
    allowedExtensions : L2ogConstants.AllowedExtensionsImageAndDocument ,
    maxSize : L2ogConstants.MailMaxAttachmentSize,
    maxSizeMsg : "Common.MaxSize10MB" ,
    invalidExtensionMsg : "Common.FileExtensionNotAllowed" ,
    maxFiles : Validation.MaxThreeFiles ,
    maxFilesMsg : "Common.MaxThreeFilesAtTime"
  }

  public static l2ogPriceDetailsTab = "priceDetails";
  public static l2ogAdvertiseTab = "advertise";
}
