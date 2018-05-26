// @flow

import type { ById } from './index';

export type BinId = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8';

export type BinData = {
  total: number,
  scanned: number,
};

export type Bins = { [BinId]: BinData };

export type Product = { name: string, bins: Bins };

export type ProductsState = {
  byId: ById<Product>,
  allIds: Array<number>,
};

export const getInitialProductsState = (): ProductsState => ({
  byId: {
    '0': {
      name: 'Chicken Barley',
      bins: {
        '0': { total: 2, scanned: 0 },
        '1': { total: 4, scanned: 0 },
        '2': { total: 5, scanned: 0 },
      },
    },
    '1': {
      name: 'ACAO',
      bins: {
        '0': { total: 2, scanned: 0 },
        '1': { total: 4, scanned: 0 },
        '2': { total: 5, scanned: 0 },
      },
    },
    '2': {
      name: 'Beef Curry',
      bins: {
        '0': { total: 2, scanned: 0 },
        '1': { total: 4, scanned: 0 },
        '2': { total: 5, scanned: 0 },
      },
    },
    '3': {
      name: 'Ice Tea',
      bins: {
        '0': { total: 2, scanned: 0 },
        '1': { total: 4, scanned: 0 },
        '2': { total: 5, scanned: 0 },
      },
    },
    '4': {
      name: 'Chocolate Cake',
      bins: {
        '0': { total: 2, scanned: 0 },
        '1': { total: 4, scanned: 0 },
        '2': { total: 5, scanned: 0 },
      },
    },
    '5': {
      name: 'Cheesecake',
      bins: {
        '0': { total: 2, scanned: 0 },
        '1': { total: 4, scanned: 0 },
        '2': { total: 5, scanned: 0 },
      },
    },
    '6': {
      name: 'Quinoa Lentil Soup',
      bins: {
        '0': { total: 2, scanned: 0 },
        '1': { total: 4, scanned: 0 },
        '2': { total: 5, scanned: 0 },
      },
    },
    '7': {
      name: 'Caeser Salad',
      bins: {
        '0': { total: 2, scanned: 0 },
        '1': { total: 4, scanned: 0 },
        '2': { total: 5, scanned: 0 },
      },
    },
    '8': {
      name: 'Mango Poppy Juice',
      bins: {
        '0': { total: 2, scanned: 0 },
        '1': { total: 4, scanned: 0 },
        '2': { total: 5, scanned: 0 },
      },
    },
    '9': {
      name: 'Lemon Cake',
      bins: {
        '0': { total: 2, scanned: 0 },
        '1': { total: 4, scanned: 0 },
        '2': { total: 5, scanned: 0 },
      },
    },
    '10': {
      name: 'Orange Juice',
      bins: {
        '0': { total: 2, scanned: 0 },
        '1': { total: 4, scanned: 0 },
        '2': { total: 5, scanned: 0 },
      },
    },
    '11': {
      name: 'Beet Sweet Potato Mix',
      bins: {
        '0': { total: 2, scanned: 0 },
        '1': { total: 4, scanned: 0 },
        '2': { total: 5, scanned: 0 },
      },
    },
  },
  allIds: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
});
