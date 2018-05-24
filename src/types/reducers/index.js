// @flow

import type { ProductsState } from './products';
import type { Id } from '../index';

export type AppState = {
  products: ProductsState,
};

export type ById<T> = { [Id]: T };
