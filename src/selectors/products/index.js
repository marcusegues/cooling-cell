import * as byIdApi from './byId';
// Total amount that needs to be scanned for a given product
export const getBinTotalForProduct = (state, productId) =>
  byIdApi.getBinTotalForProduct(state.byId, productId);

export const getBinTotalScannedForProduct = (state, productId) =>
  byIdApi.getBinTotalScannedForProduct(state.byId, productId);
