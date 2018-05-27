import type { ProductsAllIdsState } from '../../types/reducers/products';
import { getInitialProductsAllIdsState } from '../../types/reducers/products';
import type { Action } from '../../types/actions';

export const allIds = (
  state: ProductsAllIdsState = getInitialProductsAllIdsState(),
  action: Action
): ProductsAllIdsState => {
  switch (action.type) {
    default: {
      return state;
    }
  }
};
