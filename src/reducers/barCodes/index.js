// @flow
import { combineReducers } from 'redux';
import type { BarCodesState } from '../../types/reducers/barcodes';
import { byId } from './byId';

export const barCodes: BarCodesState = combineReducers({
  byId,
});
