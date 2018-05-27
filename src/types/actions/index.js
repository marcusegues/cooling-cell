// @flow
import type { Id } from '../index';

export type Action = {
  type: 'SAVE_SCAN_TO_BIN',
  productId: Id,
  binId: Id,
  data: any,
};
