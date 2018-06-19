import { ActionReducerMap, createSelector, createFeatureSelector, MemoizedSelector } from '@ngrx/store';

import * as fromShipping from './shipping.reducer';
import { Address } from '../../../interfaces/models/address';

export interface ShippingState {
  shipping: fromShipping.State;
}

export interface State {
  shipping: ShippingState
}

export const reducers : ActionReducerMap<ShippingState> = {
  shipping: fromShipping.reducer
}

/**
 * Shipping State
 */
export const selectShippingState: MemoizedSelector<object, ShippingState> = createFeatureSelector<ShippingState>('shipping');

export const shippingStateSelector = createSelector(
  selectShippingState,
  (state: ShippingState) => state.shipping
)

export const selectShippingValueState: MemoizedSelector<object, Address> = createSelector(
  shippingStateSelector,
  fromShipping.getShipping
)
