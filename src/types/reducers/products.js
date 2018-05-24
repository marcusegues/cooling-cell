// @flow

import type { ById } from './index';

export type Product = Object;

export type ProductsState = {
  byId: ById<Product>,
  allIds: Array<any>,
  displayOrder: Array<any>,
};

export const getInitialProductsState = () => ({
  byId: {},
  allIds: [],
  displayOrder: [],
});
