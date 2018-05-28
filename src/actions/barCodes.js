// @flow
import type { Dispatch, GetState, Id } from '../types';
import type { BarCode } from '../types/reducers/barcodes';
import {
  getBinTotalByProductAndBin,
  getBinTotalScannedByProductAndBin,
} from '../selectors';

export const saveScanData = (
  productId: Id,
  binId: Id,
  scanData: BarCode
): any => (dispatch: Dispatch, getState: GetState): any => {
  dispatch({ type: 'SAVE_SCAN_DATA', scanData });
  dispatch({
    type: 'SAVE_SCAN_TO_BIN',
    productId,
    binId,
    scanId: scanData.data,
  });
  const state = getState();

  // return whether scanned amount is total amount => finished scanning
  return (
    getBinTotalByProductAndBin(state, productId, binId) ===
    getBinTotalScannedByProductAndBin(state, productId, binId)
  );
};
