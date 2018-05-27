import type { Action } from '../../types/actions';
import { getInitialBarCodesByIdState } from '../../types/reducers/barcodes';

export const byId = (
  state: BarCodesByIdState = getInitialBarCodesByIdState(),
  action: Action
): BarCodesByIdState => {
  switch (action.type) {
    default: {
      return state;
    }
  }
};
