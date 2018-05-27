import {
  getInitialProductsState,
  ProductsState,
} from '../../types/reducers/products';
import { combineReducers } from 'redux';
import { byId } from './byId';
import { allIds } from './allIds';

export const products: ProductsState = combineReducers({
  byId,
  allIds,
});
