import { Guid } from 'guid-typescript';
import { ColumnModel } from './common.model';

export interface ClassName {
  toClassName(): string;
  toComponentName(): string;
}

export class MenuCategoryMasterModel extends ColumnModel implements ClassName {
  menuCategoryId: Guid | null;
  sequenceNo: number | null;
  code: string;
  categoryName: string;
  categoryName_SEO: string;
  isAvailableForTakeaway: boolean | null;
  isAvailableForChristmas: boolean | null;
  isPOS: boolean | null;
  isOnline: boolean | null;
  menuItemMaster: MenuItemMasterModel[] | null;
  toClassName(): string {
    return this.constructor.name;
  }
  toComponentName(): string {
    return this.constructor.name;
  }
}

export class MenuItemMasterModel {
  menuItemId: Guid | null;
  menuCategoryId: Guid | null;
  code: string;
  itemName: string;
  itemDescription: string;
  isAvailableForTakeaway: boolean | null;
  price: number | null;
  quantity: number | null = 1;
  isSpiceLevelAvailable: boolean | null;
  spicyType: string | null;
  comment: string | null;
  isDescriptionAvailable: boolean | null;
  seoName: string | null;
  longDescription: string | null;
  longDescription_dk: string | null;
  imageMaster: ImageMasterModel[] | null;
  isCustomOption: boolean | null;
  isItemCustom: boolean | null;
  noOfGrayOption: number | null;
  noOfNaanOption: number | null;
  noOfSizlerOption: number | null;
  noOfSodaOption: number | null;
  isAvailableForChristmas: boolean | null;
  isPOS: boolean | null;
  isOnline: boolean | null;
  customMenuItemId: Guid | null;
  customItemName: string;
  customOrderItemDetailMaster: CustomOrderItemDetailMaster[] | null;
}
export class ImageMasterModel {
  imageId: Guid | null;
  menuItemId: Guid | null;
  imageName: string | null;
  imageUrl: string | null;
  isPrimary: boolean | null;
}

export class CustomOrderItemDetailMaster {
  dynamicId: Guid | null;
  orderDetailId: Guid | null;
  menuItemId: Guid | null;
  customMenuItemId: Guid | null;
  customItemName: string;
  customType: string;
  customSpicyType: string;
  customComment: string;
}
