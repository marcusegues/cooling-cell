// @flow
import { combineReducers } from 'redux';
import { products } from './products';
import type { AppState } from '../types/reducers';

/**
 * Combines reducers
 * @type {Reducer<any>}
 */
export const root: AppState = combineReducers({
  products,
});
