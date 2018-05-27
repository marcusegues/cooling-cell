import { BarCodesState } from '../../types/reducers/barcodes';
import { combineReducers } from 'redux';
import { byId } from './byId';

export const barCodes: BarCodesState = combineReducers({
  byId,
});
