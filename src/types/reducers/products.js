// @flow

import type { ById } from './index';

export type BinId = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8';

export type ScanData = string;

export type BinData = {
  total: number,
  scanned: Array<ScanData>,
};

export type Bins = { [BinId]: BinData };

export type Product = { name: string, bins: Bins };

export type ProductsByIdState = ById<Product>;

export const getInitialProductsByIdState = (): ProductsByIdState => ({
  '0': {
    name: 'Chicken Barley',
    bins: {
      '0': { total: 2, scanned: [] },
      '1': { total: 4, scanned: [] },
      '2': { total: 5, scanned: [] },
    },
  },
  '1': {
    name: 'ACAO',
    bins: {
      '0': { total: 2, scanned: [] },
      '1': { total: 4, scanned: [] },
      '2': { total: 5, scanned: [] },
    },
  },
  '2': {
    name: 'Beef Curry',
    bins: {
      '0': { total: 5, scanned: [] },
      '1': { total: 4, scanned: [] },
      '2': { total: 5, scanned: [] },
    },
  },
  '3': {
    name: 'Ice Tea',
    bins: {
      '0': { total: 2, scanned: [] },
      '1': { total: 4, scanned: [] },
      '2': { total: 5, scanned: [] },
    },
  },
  '4': {
    name: 'Chocolate Cake',
    bins: {
      '0': { total: 2, scanned: [] },
      '1': { total: 4, scanned: [] },
      '2': { total: 5, scanned: [] },
    },
  },
  '5': {
    name: 'Cheesecake',
    bins: {
      '0': { total: 2, scanned: [] },
      '1': { total: 4, scanned: [] },
      '2': { total: 5, scanned: [] },
    },
  },
  '6': {
    name: 'Quinoa Lentil Soup',
    bins: {
      '0': { total: 2, scanned: [] },
      '1': { total: 4, scanned: [] },
      '2': { total: 5, scanned: [] },
    },
  },
  '7': {
    name: 'Caeser Salad',
    bins: {
      '0': { total: 2, scanned: [] },
      '1': { total: 4, scanned: [] },
      '2': { total: 5, scanned: [] },
    },
  },
  '8': {
    name: 'Mango Poppy Juice',
    bins: {
      '0': { total: 2, scanned: [] },
      '1': { total: 4, scanned: [] },
      '2': { total: 5, scanned: [] },
    },
  },
  '9': {
    name: 'Lemon Cake',
    bins: {
      '0': { total: 2, scanned: [] },
      '1': { total: 4, scanned: [] },
      '2': { total: 5, scanned: [] },
    },
  },
  '10': {
    name: 'Orange Juice',
    bins: {
      '0': { total: 2, scanned: [] },
      '1': { total: 4, scanned: [] },
      '2': { total: 5, scanned: [] },
    },
  },
  '11': {
    name: 'Beet Sweet Potato Mix',
    bins: {
      '0': { total: 2, scanned: [] },
      '1': { total: 4, scanned: [] },
      '2': { total: 5, scanned: [] },
    },
  },
});

export type ProductsAllIdsState = Array<number>;

export const getInitialProductsAllIdsState = (): ProductsAllIdsState => [
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
];

export type ProductsState = {
  byId: ProductsByIdState,
  allIds: ProductsAllIdsState,
};
