import { Guid } from "guid-typescript";
export class AddressModel{
    addressId: Guid;
    houseNo = '';
    address1 = '';
    address2 = '';
    state = '';
    city = '';
    postalCode = '';
    country = '';
    isActive = true;
    isDeleted = false;
    createdDate: Date = null;
    createdBy: any;
    modifiedDate: Date = null;
    modifyBy: any;
}