export enum StatusCode {
  Deleted = "DL",
  New = "NW",
  Active = "AC",
  InActive = "IN",
}

export enum StatusCodeNumber {
  InActive = 0,
  Active = 1,
  Delete = 2,
}

export enum OpportunityListStatus {
  Open = "001",
  Won = "002",
  Lost = "003",
}

export enum OpportunityProposalStatus {
  Required = "001",
  Sent = "002",
  Received = "003",
}

export enum OpportunityProposalStatusNames {
  "001" = "Proposal Required",
  "002" = "Proposal Sent",
  "003" = "Proposal Received"
}

export enum VehicleRequestStatus {
  Pending = "001",
  Done = "002",
}

export enum MapQuoteStatus {
  Draft = "001",
  SentToCustomer = "002",
  ContractSigned = "003",
  ContractRejected = "004",
  ProposalSent = "005",
  ProposalReceived = "006",
  AwaitingUnderwriting = "007",
  UnderwritingAccepted = "008",
  ConditionalAcceptance = "009",
  UnderwritingReferred = "010",
  UnderwritingDeclined = "011",
  ConvertedToOrder = "012",
  Cancelled = "013",
  ReadyforUnderwriting = "014",
  ResponseReceived = "015",
  ApplicationWithdrawn = "016",
  ContractCancelled = "017",
  PartExchange = "019",
  ContractSignedOP = "020",
  VehicleSold = "021"
}

export enum MapQuoteStatusNames {
  "001" = "Draft",
  "002" = "Sent to customer",
  "003" = "Contract signed",
  "004" = "Contract rejected",
  "005" = "Proposal sent",
  "006" = "Proposal received",
  "007" = "Awaiting underwriting",
  "008" = "Underwriting accepted",
  "009" = "Conditional acceptance",
  "010" = "Underwriting referred",
  "011" = "Underwriting declined",
  "012" = "Converted to order",
  "013" = "Cancelled",
  "014" = "Ready for underwriting",
  "015" = "Response received",
  "016" = "Application withdrawn",
  "017" = "Contract cancelled"
}

export enum WhatsAppStatus {
  Queued = "queued",
  Sending = "sending",
  Sent = "sent",
  Failed = "failed",
  Delivered = "delivered",
  Undelivered = "undelivered",
  Read = "read",
  Pending = "pending",
}

