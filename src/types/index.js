// @flow

import type { Store as ReduxStore, Dispatch as ReduxDispatch } from 'redux';
import type { Action } from './actions';
import type { AppState } from './reducers';

export type Store = ReduxStore<AppState, Action>;

export type GetState = () => AppState;

export type Thunk<A> = ((Dispatch, GetState) => Promise<void> | void) => A;

export type Dispatch = ReduxDispatch<Action> & Thunk<Action>;

export type Id = string;

/**
 * Type for the navigation object as it is used to get around in the application
 */
export type Navigation = {
  goBack: (?string) => void,
  navigate: (route: string, params?: {}) => void,
  state: Object,
  setParams: Object => void,
  getParam: (param: string, fallback: string) => any,
  dispatch: Function,
};
