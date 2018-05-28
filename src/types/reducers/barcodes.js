// @flow
import type { ById } from './index';

export type BarCode = { data: string, type: string };

export type BarCodesByIdState = ById<BarCode>;

export type BarCodesState = {
  byId: BarCodesByIdState,
};

export const getInitialBarCodesByIdState = () => ({});
