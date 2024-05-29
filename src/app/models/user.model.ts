import { Guid } from 'guid-typescript';
import { ColumnModel } from './common.model';
import { AddressModel } from './address.model';

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
  addressMaster: AddressModel[] = [];
  toClassName(): string {
    return this.constructor.name;
  }
  toComponentName(): string {
    return this.constructor.name;
  }
}

