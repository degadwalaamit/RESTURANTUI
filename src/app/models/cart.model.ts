import { Guid } from 'guid-typescript';
import { AddressModel } from './address.model';
import { CustomOrderItemDetailMaster } from './menu.model';

export interface ClassName {
  toClassName(): string;
  toComponentName(): string;
}

export class RequestOrderListModel implements ClassName {
  dataType: number;
  orderType: number;
  orderId: Guid | null;
  userId: Guid | null;
  createdDate: Date | null;
  toClassName(): string {
    return this.constructor.name;
  }
  toComponentName(): string {
    return this.constructor.name;
  }
}

export class TableOrderDetails implements ClassName {
  tableId: number;
  orderMaster: OrderMasterModel = new OrderMasterModel();
  toClassName(): string {
    return this.constructor.name;
  }
  toComponentName(): string {
    return this.constructor.name;
  }
}


export class OrderMasterModel implements ClassName {
  userId: Guid;
  userType = '';
  firstName = '';
  lastName = '';
  email = '';
  mobileNo = '';
  discountPercentage = 0;

  subAmount = 0;
  discountAmount = 0;
  totalAmount = 0;
  isPaid = false;
  orderStatus = '';

  orderNo = 0;
  isTakeAway = false;
  isDelivery = true;
  takeAwayTime = '';
  message = '';
  addressId: Guid | null;
  addressMaster: AddressModel = new AddressModel();
  orderDetailMaster: OrderDetailMasterModel[] | null;
  token = '';

  couponId: Guid | null;
  couponCode = '';
  isAgreeMarketing = false;
  isSendOffer = false;
  toClassName(): string {
    return this.constructor.name;
  }
  toComponentName(): string {
    return this.constructor.name;
  }
}

export class OrderDetailMasterModel implements ClassName {
  orderDetailId: Guid | null;
  orderId: Guid | null;
  menuCategoryId: Guid | null;
  categoryName: string;
  mcode: string;
  menuItemId: Guid | null;
  code: string;
  itemName: string;
  itemDescription: string;
  isAvailableForTakeaway: boolean | null;
  price: number | null;
  quantity: number | null;
  spicyType: string | null;
  comment: string | null;
  isSpiceLevelAvailable: boolean | null;
  imageUrl: string | null;
  cartSequence: number | null;
  customMenuItemId: Guid | null;
  customItemName: string;
  customOrderItemDetailMaster: CustomOrderItemDetailMaster[] | null;
  toClassName(): string {
    return this.constructor.name;
  }
  toComponentName(): string {
    return this.constructor.name;
  }
}
