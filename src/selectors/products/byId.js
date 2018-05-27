export const getBinTotalForProduct = (state, productId) =>
  Object.values(state[productId].bins).reduce((acc, bin) => {
    acc += bin.total;
    return acc;
  }, 0);

export const getBinTotalScannedForProduct = (state, productId) =>
  Object.values(state[productId].bins).reduce((acc, bin) => {
    acc += bin.scanned.length;
    return acc;
  }, 0);

export const getBinTotalByProductAndBin = (state, productId, binId) =>
  state[productId].bins[binId].total;

export const getBinTotalScannedByProductAndBin = (state, productId, binId) =>
  state[productId].bins[binId].scanned.length;

export const getScannedIdsForProductAndBin = (state, productId, binId) =>
  state[productId].bins[binId].scanned;
