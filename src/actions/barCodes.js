// @flow
export const saveScanData = (productId, binId, scanData) => (
  dispatch: Dispatch
) => {
  dispatch({ type: 'SAVE_SCAN_DATA', scanData });
  dispatch({
    type: 'SAVE_SCAN_TO_BIN',
    productId,
    binId,
    scanId: scanData.data,
  });
};
