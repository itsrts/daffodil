import { Action } from '@ngrx/store';

import { PaymentDetails } from '../models/payment-details';

export enum PaymentActionTypes {
  UpdatePaymentInfoAction = "[Payment] Update Payment Info Action"
}

export class UpdatePaymentInfo implements Action {
  readonly type = PaymentActionTypes.UpdatePaymentInfoAction;

  constructor(public payload: PaymentDetails) {}
}

export type PaymentActions =
    | UpdatePaymentInfo;
