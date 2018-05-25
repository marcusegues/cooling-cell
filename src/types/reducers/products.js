// @flow

import type { ById } from './index';

export type Product = { name: string };

export type ProductsState = {
  byId: ById<Product>,
  allIds: Array<number>,
};

export const getInitialProductsState = (): ProductsState => ({
  byId: {
    '0': { name: 'Chicken Barley' },
    '1': { name: 'ACAO' },
    '2': { name: 'Beef Curry' },
    '3': { name: 'Ice Tea' },
    '4': { name: 'Chocolate Cake' },
    '5': { name: 'Cheesecake' },
    '6': { name: 'Quinoa Lentil Soup' },
    '7': { name: 'Caeser Salad' },
    '8': { name: 'Mango Poppy Juice' },
    '9': { name: 'Lemon Cake' },
    '10': { name: 'Orange Juice' },
    '11': { name: 'Beet Sweet Potato Mix' },
  },
  allIds: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
});
