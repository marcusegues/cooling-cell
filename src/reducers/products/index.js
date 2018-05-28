// @flow
import { combineReducers } from 'redux';
import type { ProductsState } from '../../types/reducers/products';
import { byId } from './byId';
import { allIds } from './allIds';

export const products: ProductsState = combineReducers({
  byId,
  allIds,
});
