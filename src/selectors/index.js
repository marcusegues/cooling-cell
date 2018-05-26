import * as productsApi from './products';
export const getBinTotalForProduct = (state, productId) =>
  productsApi.getBinTotalForProduct(state.products, productId);
