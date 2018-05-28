// @flow
import type { Id } from '../index';
import type { BinId } from '../reducers/products';
import type { BarCode } from '../reducers/barcodes';

export type Action =
  | {
      type: 'SAVE_SCAN_TO_BIN',
      productId: Id,
      binId: BinId,
      scanId: Id,
    }
  | {
      type: 'SET_HAS_CAMERA_PERMISSION',
      hasPermission: boolean,
    }
  | { type: 'SAVE_SCAN_DATA', scanData: BarCode };
