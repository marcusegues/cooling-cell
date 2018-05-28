import * as productsApi from './products';
import * as barCodesApi from './barCodes';

export const getBinTotalForProduct = (state, productId) =>
  productsApi.getBinTotalForProduct(state.products, productId);

export const getBinTotalScannedForProduct = (state, productId) =>
  productsApi.getBinTotalScannedForProduct(state.products, productId);

export const getBinTotalByProductAndBin = (state, productId, binId) =>
  productsApi.getBinTotalByProductAndBin(state.products, productId, binId);

export const getBinTotalScannedByProductAndBin = (state, productId, binId) =>
  productsApi.getBinTotalScannedByProductAndBin(
    state.products,
    productId,
    binId
  );

export const getScannedIdsForProductAndBin = (state, productId, binId) => {
  const scannedIds = productsApi.getScannedIdsForProductAndBin(
    state.products,
    productId,
    binId
  );
  return barCodesApi.getBarCodesById(state.barCodes, scannedIds);
};
