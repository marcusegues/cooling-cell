import {
  getInitialProductsByIdState,
  getInitialProductsState,
} from '../../types/reducers/products';
import type { ProductsByIdState } from '../../types/reducers/products';
import type { Action } from '../../types/actions';

export const byIdBins = (state, action) => {
  switch (action.type) {
    case 'SAVE_SCAN_TO_BIN': {
      return {
        ...state,
        [action.binId]: {
          ...state[action.binId],
          scanned: [...state[action.binId].scanned, action.data],
        },
      };
    }
  }
};

export const byIdProduct = (state, action) => {
  switch (action.type) {
    case 'SAVE_SCAN_TO_BIN': {
      return { ...state, bins: byIdBins(state.bins, action) };
    }
    default: {
      return state;
    }
  }
};

export const byId = (
  state: ProductsByIdState = getInitialProductsByIdState(),
  action: Action
): ProductsByIdState => {
  switch (action.type) {
    case 'SAVE_SCAN_TO_BIN': {
      const { productId } = action;
      return {
        ...state,
        [productId]: byIdProduct(state[productId], action),
      };
    }
    default: {
      return state;
    }
  }
};
