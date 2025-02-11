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
  // tableId: number;
  orderMaster: PwaOrderMasterModel = new PwaOrderMasterModel();
  toClassName(): string {
    return this.constructor.name;
  }
  toComponentName(): string {
    return this.constructor.name;
  }
}
export class CommonOrderMasterModel {
  orderId: Guid = null;
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
  token = '';
  couponId: Guid | null;
  couponCode = '';
  isAgreeMarketing = false;
  isSendOffer = false;
  paymentMode = '';
  tableNo = '';
  isDelete = false;
  resturantId: string | null;
}

export class OrderMasterModel extends CommonOrderMasterModel implements ClassName {
  orderDetailMaster: OrderDetailMasterModel[] | null;
  toClassName(): string {
    return this.constructor.name;
  }
  toComponentName(): string {
    return this.constructor.name;
  }
}

export class PwaOrderMasterModel extends CommonOrderMasterModel implements ClassName {
  orderDetailMaster: PwaOrderDetailMasterModel[] | null;
  toClassName(): string {
    return this.constructor.name;
  }
  toComponentName(): string {
    return this.constructor.name;
  }
}

export class CommonOrderDetailMasterModel implements ClassName {
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
  extraPrice: number = 0;
  totalPrice: number = 0;
  quantity: number | null;
  spicyType: string | null;
  comment: string | null;
  isSpiceLevelAvailable: boolean | null;
  imageUrl: string | null;
  cartSequence: number | null;
  customMenuItemId: Guid | null;
  customItemName: string;
  customOrderItemDetailMaster: CustomOrderItemDetailMaster[] | null;
  isDeleted: boolean | null;
  toClassName(): string {
    return this.constructor.name;
  }
  toComponentName(): string {
    return this.constructor.name;
  }
}
export class OrderDetailMasterModel extends CommonOrderDetailMasterModel {
  orderCustomItemGroupMaster: OrderCustomItemGroupMaster[] | null;
  toClassName(): string {
    return this.constructor.name;
  }
  toComponentName(): string {
    return this.constructor.name;
  }
}
export class OrderCustomItemGroupMaster implements ClassName {
  orderCustomItemGroupId: Guid | null;
  customItemGroupId: Guid | null;
  customGroupId: Guid | null;
  menuItemId: Guid | null;
  customGroupName: string | null;
  customGroupName_DK: string | null;
  restaurantId: Guid | null;
  sequenceNo = 0
  isCommentNeeded = false;
  customGroupDetailId: Guid | null;
  detailName: string | null;
  detailName_DK: string | null;
  isChargable = false;
  price = 0;
  comment = '';
  toClassName(): string {
    return this.constructor.name;
  }
  toComponentName(): string {
    return this.constructor.name;
  }
}
export class PwaOrderCustomItemGroupMaster extends OrderCustomItemGroupMaster {
  toClassName(): string {
    return this.constructor.name;
  }
  toComponentName(): string {
    return this.constructor.name;
  }
}

export class PwaOrderDetailMasterModel extends CommonOrderDetailMasterModel implements ClassName {
  orderCustomItemGroupMaster: PwaOrderCustomItemGroupMaster[] | null;
  toClassName(): string {
    return this.constructor.name;
  }
  toComponentName(): string {
    return this.constructor.name;
  }
}