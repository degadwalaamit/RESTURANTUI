import { Guid } from 'guid-typescript';
import { ColumnModel } from './common.model';
import { AddressModel } from './address.model';
import { ResturantMasterModel } from './resturant.model';

export interface ClassName {
  toClassName(): string;
  toComponentName(): string;
}

export class UserModel extends ColumnModel implements ClassName {
  userId: Guid;
  firstName = '';
  lastName = '';
  email = '';
  password = '';
  passwordSalt = '';
  mobileNo = '';
  addressId = '';
  resturantId = '';
  addressMaster: AddressModel[] = [];
  tableMaster: TableMaster[] = [];
  toClassName(): string {
    return this.constructor.name;
  }
  toComponentName(): string {
    return this.constructor.name;
  }
}
export class TableMaster {
  tableId: Guid;
  tableNo: number | null;
  takeAwayTableNo: number | null;
  resturantId: string;
  resturantMaster: ResturantMasterModel | null;
}