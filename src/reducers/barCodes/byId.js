// @flow
import type { Action } from '../../types/actions';
import { getInitialBarCodesByIdState } from '../../types/reducers/barcodes';
import type { BarCodesByIdState } from '../../types/reducers/barcodes';

export const byId = (
  state: BarCodesByIdState = getInitialBarCodesByIdState(),
  action: Action
): BarCodesByIdState => {
  switch (action.type) {
    case 'SAVE_SCAN_DATA': {
      return {
        ...state,
        [action.scanData.data]: {
          data: action.scanData.data,
          type: action.scanData.type,
        },
      };
    }
    default: {
      return state;
    }
  }
};
