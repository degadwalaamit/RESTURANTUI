export enum OptionCategory {
    Driver = 9,
    Safety = 10,
    Security = 11,
    Interior = 12,
    Wheels = 13,
    Trim = 14,
    Exterior = 15,
    Paintwork = 16,
    Entertainment = 17,
    Technical = 91,
    Packs = 93
}

export enum RuleCode {
    OO_1957750 = 1957750
}

export enum RuleType {
    OneOf = 'OO'
}

export enum LeadSource{
    "Referral/Introducer"=1,
    "Website"=2,
    "Renewal"=3,
    "Inbound Call"=4
}
export enum ServiceType{
    "Leasing"=1,
    "Hire"=2,
    "Rent"=3
}
export enum CustomerType{
    "Individual"=1,
    "Business"=2
}

export enum EnquiryType{
    "Quote Request"=1,
    "Application"=2
}

export enum Channel{
    "Lease"=1,
    "Rent"=2,
    "Buy"=3,
    "Sell"=4
}
export enum VehicleCondition{
    "New"=1,
    "New and Used"=2,
    "Used"=3
}

export enum VehicleType{
    "Car"=1,
    "LCV"=2
}
export enum FuelType{
    "DIESEL"=1,
    "DIESEL/ELECTRIC HYBRID"=2,
    "DIESEL/PLUGIN ELEC HYBRID"=3,
    "ELECTRIC"=4,
    "ELECTRIC DIESEL REX"=5,
    "ELECTRIC PETROL REX"=6,
    "HYDROGEN FUEL CELL"=7,
    "PETROL"=8,
    "PETROL/BIO ETHANOL (E85)"=9,
    "PETROL/CNG"=10,
    "PETROL/ELECTRIC HYBRID"=11,
    "PETROL/LPG"=12,
    "PETROL/PLUGIN ELEC HYBRID"=13
}
export enum GearType{
    "Automatic"=1,
    "Manually"=2
}
export enum Position{
    "Manager"=1,
    "Vice president"=2,
    "User"=3
}
export enum Department{
    "Finance"=1,
    "Managment"=2,
    "Admin"=3,
    "General"=4
}

export enum CustomerTypeLeads{
    "Business"=1,
    "Personal"=2
}

export enum FormType{
    // "Contact us"=1,
    // "Specialist cars quote"=2
    "Leasing" =1,
    "Short term lease" =2,
    "Buy" =3,
    "Part exchange / Sell" =4
}

export enum StatusType{
    "Accepted" =1,
    "Referred" =2,
    "Declined" =3,
    "ConditionalAcceptance"=4,
    //"Pending"=5
    "Cancelled"=5
}
export enum UnderwritingDecisionStatusType{
    AwaitingUnderwriting ="Awaiting underwriting",
    Accepted ="Accepted",
    ConditionalAcceptance="Conditional acceptance",
    ApplicationWithdrawn="Application withdrawn",
    ResponseReceived="Response received",
    Referred ="Referred",
    Declined ="Declined",
    ConvertedToOrder = "Sent To Order",
    Cancelled ="Cancelled"
}

export enum FinanceType{
     "Personal contract hire"=1,
     "Business contract hire"=2,
     "Short term lease"=3
}

export enum LeadConverted{
    "Yes"=1,
    "No"=2
}
export enum LeadStatus{
    "Qualified"=1,
    "New/Open"=2,
    "Closed"=3
}

export enum CustomerContractTypeEnum {
    OutrightPurchase = 'OP',
    BusinessContractHire = 'BCH',
    PersonalContractHire = 'pCH',
    FinanceLease = 'FL',
    RentReturn = 'RR',
    ContractPurchase = 'CP',
    PersonalContractPurchase = 'PCP',
    HirePurchase = 'HP',
    RentToBuy = 'RB',
    LeasePurchase = 'LP',
    RentalDaily = 'RD',
    RentalLongTerm = 'RLT',
    RentalShortTermLease = 'RSTL',
    PersonalRentToBuy = 'PRB',
    HirePurchaseNonRegulated = 'HPNR',
    TradeSales = 'TS'
}

export enum HireContractNameFromTypes {
  BCH = "Business Contract Hire",
  pCH = "Personal Contract Hire",
  FL = "Finance Lease",
}

export enum AquisitionFrom{
  Acquisition = 1,
  Order = 2,
  L2og = 3
}

export enum VehicleTypeEnum {
    VehicleType0 = 0,
    VehicleType1 = 1,
    VehicleType2 = 2,
}

export enum AcquisitionContractTypeEnum {
    BusinessContractHire = 'BCH',
    RentReturn = 'RRN',
    RentToBuy = 'RTB',
    RentalSTL = 'RST',
    LeasePurchase = 'LSP',
    ContractPurchase = 'CPR',
    HirePurchaseNonRegulated = 'HPR',
    RentalLongTerm = 'RLM',
    OutrightPurchase = 'OPR',
    BusinessRenttoBuy = 'RTB',
    DailyRental = 'RDL',
    Broker = 'BR',
    FinanceLease = 'FIL'
}

export enum AcquisitionContractTypeNameEnum{
    BusinessContractHire = 'Business Contract Hire',
    Broker='Broker'
}

export enum CostConfigurationEnum {
    TrackerCost = 'TrackerCost',
    TrackerCostPerMonth = 'TrackerCostPerMonth',
    DisposalCost = 'DisposalCost',
    DeliveryCollection = 'DeliveryCollection',
    MinimumMargin = 'MinimumMargin',
    BrokerMinimumMargin = 'BrokerMinimumMargin',
    GrantGrossWeightSmallLcv = 'GrantGrossWeightSmallLcv',
    DefaultGrantForLargeLcv = 'DefaultGrantForLargeLcv',
    ExcessMileMultiplier = 'ExcessMileMultiplier',
    HireMainMultiplier = 'HireMainMultiplier',
    HireMainMargin = 'HireMainMargin',
    SalesCommission = 'SalesCommission',
    AcquisitionCommission = 'AcquisitionCommission',
    DefaultMileage = 'DefalutMileage',
    DefaultDuration = 'DefalutDuration',
    HoldingCostRDL = 'HoldingCostRDL',
    HoldingCostRLM = 'HoldingCostRLM',
    HoldingCostRTS = 'HoldingCostRTS',
    HoldingCostRRN = 'HoldingCostRRN',
    HoldingCostBCH = 'HoldingCostBCH',
    DocumentFee = 'DocumentFee',
    BCHDocumentFee = 'BCHDocumentFee',
    PCHDocumentFee = 'PCHDocumentFee',
    InsuranceMultiplier = 'InsuranceMultiplier',
    InsuranceTax = 'InsuranceTax',
    FinanceElement = 'FinanceElement',
    MaintenanceElement = 'MaintenanceElement',
    OptionToPurchaseFee = 'OptionToPurchaseFee',
    PurchaseBrokerVrb = 'PurchaseBrokerVrb',
    VatPercentage = 'VatPercentage',
    BaseInterestRate = "R",
    BrokerUpsellMarginPer = "BrokerUpsellMarginPer",
    CustomerRateOverBase = "CustomerRateOverBase",
    PerSalesProceed = "PerSalesProceed",
    FinanceMarginMultiplier = "FinanceMarginMultiplier",
    RentalInsurancePremium = "RentalInsurancePremium",
    RentalInsuranceMultiplier = "RentalInsuranceMultiplier",
    ContingencyInsuranceValue = "ContingencyInsuranceValue",
    FirstRegFee = 'FirstRegFee',
    AcquisitionContract = 'AcquisitionContract',
    CustomerContract = 'CustomerContract'
}

export enum CustomerContractTypeNameEnum {
    OutrightPurchase = 'Outright Purchase',
    BusinessContractHire = 'Business Contract Hire',
    PersonalContractHire = 'Personal Contract Hire',
    FinanceLease = 'Finance Lease',
    HirePurchaseNonRegulated = 'Hire Purchase Non-Regulated',
    HirePurchaseRegulated = 'Hire Purchase Regulated',
    ContractPurchase = 'Contract Purchase',
    PersonalContractPurchase = 'Personal Contract Purchase',
    BusinessRentToBuy = 'Business Rent to Buy',
    PersonalRentToBuy = 'Personal Rent to Buy',
    DailyRental = 'Daily Rental',
    RentalDaily = 'Daily Rental',
    LongTermRental = 'Long Term Rental',
    ShortTermLease = 'Short Term Lease',
    RentReturn = 'Rent Return',
    RentToBuy = 'Rent to Buy',
    LeasePurchase = 'Lease Purchase',
    HirePurchase = 'Hire Purchase',
    RentalLongTerm = 'Rental (Long Term)',
    RentalShortTermLease = 'Rental (Short Term Lease)',
    TradeSale = 'Trade Sale',
    TradeSales = 'Trade Sales'
}
export enum ChannelNames{
  Broker='Broker',
  DailyRental = 'Daily Rental',
  LongTermRental = 'Long Term Rental',
  ShortTermLease = 'Short Term Lease',
  RetailSales='Retail Sales',
  TradeSales = 'Trade Sales',
  OwnBook = 'Own Book',
  InternalUse = 'Internal Use'
}

export enum FielValidityStatus {
    Requested = '1',
    Approved = '2',
    ApprovedWithChanges = '3',
    Rejected = '4',
    AcquisitionRequested = '6',
    Draft= '5',
    ApprovedText = 'Approved',
    ApprovedWithChangesText = 'Approved With Changes',
    Expired = "Expired",
    ExpiredCode = "7"
}

export enum TabName {
    Otr = 'Otr',
    HoldingCost = 'Holding Cost'
}

export enum CustomDiscountStatus {
    Added = 1,
    Updated = 2,
    Deleted = 3,
    Swape = 4
}

export enum HoldingtabNameEnum {
    Custom = 'custom'
}

export enum UserRoleEnum {
    SalesManagerRole = 'Sales manager',
    AcquisitionUserRole = 'Acquisition user',
    SalesUserRole = 'Sales user',
    AcquisitionManagerRole = 'Acquisition manager',
    SuperAdmin = 'Super Admin',
    OpportunityRole = 'Opportunity'
}

export enum WorkflowFeatureName {
    SalesAcquisition = 'Sales acquisition',
    SalesAcquisitionMenu = 'SideMenu.SalesAcquisition'
}

export enum RflIncludedValue {
    Yes = 1,
    No = 2,
    FirstYearOnly = 0
}

export enum SelectedTab {
    options = 'options',
    fleetSelector = 'fleetSelector',
    ls = 'ls',
    otr = 'otr',
    holdingCost = 'holdingCost',
    hireAggrement = 'hireAggrement',
    purchaseAggrement = 'purchaseAggrement',
    outright = 'outright',
    quoteSummary = 'quoteSummary',
    businessRentToBuy = 'businessRentToBuy',
    rentalAggrement = 'rentalAggrement'
}

export enum RentalEnum {
    RentalMonthDays = 28,
    Default28MileageDaily = 2800,
    Default28MileageLongTerm = 2000,
    DefaultWeeklyMileage = 1000,
    DefaultDailyMileage = 300,
    InsuranceFactor = 0.3444
}

export enum GearBox {
    A = 'A',
    C = 'C',
    S = 'S',
    M = 'M',
}

export enum TargetRentalType {
    Upsell = 0,
    SubsidyRequested = 1,
    ManualAdjustment = 2,
    Discount = 3,
    ManualAdjustmentForPurchase = 1
}

export enum PageName {
    holdingCost = 'Tab.HoldingCost',
    salesHireAgreement = 'Sales.HireAgreement',
    hireAgreement = 'Tab.HireAgreement',
    salesPurchaseAgreement = 'Sales.PurchaseAgreement',
    purchaseAgreement = 'Tab.PurchaseAgreement',
    salesOutRightPurchase = 'Sales.OutRightPurchase',
    outRightPurchase = 'Tab.OutRightPurchase'
}

export enum FieldName {
    ManufacturerCustomDiscount = 'Field.ManufacturerCustomDiscount',
    CapMaintenancePercentage = 'CapMaintenancePercentage',
    ResidualPercentage = 'ResidualPercentage',
    ResidualValue = 'ResidualValue',
    Maintenancevalue = 'Maintenancevalue',
    OnTheRoadPrice = 'Field.OnTheRoadPrice',
    TotalProfit = 'Field.TotalProfit',
    DealerCustomDiscount = 'Field.DealerCustomDiscount',
    MonthlyFinanceRental = 'Field.MonthlyFinanceRental',
    MonthlyMaintenanceRental = 'Field.MonthlyMaintenanceRental',
    TotalMonthlyRental = 'Field.TotalMonthlyRental',
    Upsell = 'Field.Upsell',
    TotalCommission = 'Field.TotalCommission'
}

export enum DocumentFieldIncludeStatus {
    included='Included',
    notIncluded='Not Included',
    FirstYearOnly='First Year Only'
}

export enum RFLDropDownMaster {
    Yes=1,
    FirstYearOnly=0,
    No=2
}

export enum FuelTypeCodeEnum {
    Diesel = 'D',
    Petrol = 'P',
    All = 'All',
    PetrolOrDiesel = 'PD',
    Electric = 'E',
    DieselElectricHybrid = 'Y',
    Other = 'Other',
    PetrolAndDiesel = 'PAD'
}

export enum ShareQuotePermissionEnum {
    Editor ='Editor',
    Viewer ='Viewer'
}

export enum AcquisitionListingTabEnum {
    AcquisitionTab = '1',
    SharedByMeTab = '2',
    SharedWithMeTab = '3'
}

export enum LinkTypeEnum {
    Quote = 'Quote',
}


export enum FuelTypeDescEnum {
    Diesel = 'Diesel',
    Petrol = 'Petrol',
    All = 'Alternative',
    PetrolOrDiesel = 'Petrol or diesel',
    Electric = 'Electric',
    Other = 'Alternative fuel cars (TC59)',
    PetrolAndDiesel = 'Petrol car (TC48) and diesel car (TC49)'
}
export enum FuelTypeDescEnumForApril2017 {
    Diesel = 'All other diesel cars (TC49)',
    Other = 'Alternative fuel cars (TC59)',
    PetrolAndDiesel = 'Diesel cars (TC49) that meet the RDE2 standard and petrol cars (TC48)'
}

export enum DefaultValue {
    TotalCommission = 1300
}

export enum FormTypeEnum {
    Leasing = '001',
    ShortTermLease = '002',
    Buy = '003',
    PartExchangeOrSell = '004'
}

export enum ChannelsEnum {
    Lease = '001',
    Rent = '002',
    Buy = '003',
    Sell = '004'
}
export enum SourceEnum {
  Inbound = '001',
  Website = '002'
}

export enum RequestParamEnum {
    Addnewquote = 'addnewquote',
    Edit = 'edit',
    View = 'view'
}

export enum OpportunityLeadListStatusEnum {
    Open = '001',
    Won = '002',
    Lost = '003',
    ProposalReceived = '004'
}

export enum OpportunityLeadVehicleRequestStatusEnum {
    Pending = '001',
    Done = '002'
}

export enum OpportunityLeadMapQuoteStatusEnum {
    Draft = '001',
    Sent_To_Customer = '002',
    Contract_Signed = '003',
    Contract_Rejected = '004',
    Proposal_Sent = '005',
    Proposal_Received = '006',
    Awaiting_Underwriting = '007',
    Underwriting_accepted = '008',
    Accepted_with_conditions = '009',
    Underwriting_Referred = '010',
    Underwriting_Declined = '011'
}

export enum ActionEnum {
    Edit = 'Edit',
    First = 'First',
    Second = 'Second',
    Third = 'Third',
    View = 'View',
    Copy = 'Copy',
    Delete = 'Delete',
    PartExchange = 'Part exchange',
    Refresh = 'Refresh',
    Add_new_vehicle_request = 'Add new vehicle request',
    Add_New_Quote = 'Add New Quote',
    Map_New_Quote = 'Map New Quote',
    Communication_log = 'Communication log',
    Underwriting = 'Underwriting',
    Share_Quote = 'Share Quote',
    Send_Contract = 'Send Contract',
    Send_Proposal = 'Send Proposal',
    Assign = 'Assign',
    Convert = 'Convert',
    Save = 'Save',
    Draft = "Draft",
    GoToQuote = 'Go to quote',
    ViewDocument = 'View Document',
    ConvertToOrder = 'Create order',
    Option = 'Option',
    ViewProposal = 'View proposal',
    RowDoubleClicked = 'RowDoubleClicked',
    Add = "Add",
    Cancel = "Cancel",
    Remove = "Remove",
    CancelQuote = 'Cancel Quote',
    Details = 'Details',
    History = 'History',
    Remind = 'Remind',
    Revertcollection = 'Revert collection',
    ViewSignedContract = "View Signed Document"
}

export enum FleetSelectorRequestStatus {
    VehicleSelected = 1,
    OtrCalculated = 2,
    HoldingCostCalculated = 3,
    QuoteCreated = 4
}

export enum ComponentTypeEnum {
    Purchase = 'purchase',

}

export enum PaymentProfilesNamesByCode{
  MA = "Monthly in advance",
  RSV = "Spread rentals initial payment",
  RS3 = "Spread rentals with 3 down",
  RS6 = "Spread rentals with 6 down",
  RS9 = "Spread rentals with 9 down",
  RS12 = "Spread rentals with 12 down",
  TP3 = "Terminal pause with 3 down",
  TP6 = "Terminal pause with 6 down",
  TP9 = "Terminal pause with 9 down",
}

export class IsAddedFromAccessoriesEnum {
 IsFromAccessories = 1;
}

export enum QuotePositionStatus
{
    Reserved = 1
}
