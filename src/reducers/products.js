import {
  getInitialProductsState,
  ProductsState,
} from '../types/reducers/products';

export const products = (
  state: ProductsState = getInitialProductsState(),
  action
): DeclarationState => {
  switch (action.type) {
    default: {
      return state;
    }
  }
};
