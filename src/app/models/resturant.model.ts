import { Guid } from 'guid-typescript';
import { ColumnModel } from './common.model';
import { AddressModel } from './address.model';

export interface ClassName {
  toClassName(): string;
  toComponentName(): string;
}

export class ResturantMasterModel extends ColumnModel implements ClassName {
  resturantId: Guid = null;
  userId: Guid = null;
  name: string = null;
  addressId: Guid = null;
  mobileNo: string = null;
  whatsappNo: string = null;
  faxNo: string = null;
  officeNo: string = null;
  establishDate: Date = null;
  addressMaster: AddressModel = new AddressModel();
  toClassName(): string {
    return this.constructor.name;
  }
  toComponentName(): string {
    return this.constructor.name;
  }
}

