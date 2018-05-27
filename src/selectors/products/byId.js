export const getBinTotalForProduct = (state, productId) =>
  Object.values(state[productId].bins).reduce(
    (acc, bin) => (acc += bin.total),
    0
  );

export const getBinTotalScannedForProduct = (state, productId) =>
  Object.values(state[productId].bins).reduce(
    (acc, bin) => (acc += bin.scanned.length),
    0
  );
