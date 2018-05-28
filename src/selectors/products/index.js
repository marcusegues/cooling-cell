import * as byIdApi from './byId';
// Total amount that needs to be scanned for a given product
export const getBinTotalForProduct = (state, productId) =>
  byIdApi.getBinTotalForProduct(state.byId, productId);

export const getBinTotalScannedForProduct = (state, productId) =>
  byIdApi.getBinTotalScannedForProduct(state.byId, productId);

export const getBinTotalByProductAndBin = (state, productId, binId) =>
  byIdApi.getBinTotalByProductAndBin(state.byId, productId, binId);

export const getBinTotalScannedByProductAndBin = (state, productId, binId) =>
  byIdApi.getBinTotalScannedByProductAndBin(state.byId, productId, binId);

export const getScannedIdsForProductAndBin = (state, productId, binId) =>
  byIdApi.getScannedIdsForProductAndBin(state.byId, productId, binId);
