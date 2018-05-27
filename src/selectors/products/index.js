// Total amount that needs to be scanned for a given product
export const getBinTotalForProduct = (state, productId) =>
  Object.values(state.byId[productId].bins).reduce(
    (acc, bin) => (acc += bin.total),
    0
  );

export const getBinTotalScannedForProduct = (state, productId) =>
  Object.values(state.byId[productId].bins).reduce(
    (acc, bin) => (acc += bin.scanned),
    0
  );
