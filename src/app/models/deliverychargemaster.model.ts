import { Guid } from 'guid-typescript';
import { ColumnModel } from './common.model';


export class DeliveryChargeMasterModel extends ColumnModel {
  deliveryChargeId: Guid;
  postalCode: string | null;
  price: number | null;
  isActive: boolean | null;
}

