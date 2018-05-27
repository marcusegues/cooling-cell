import * as byIdApi from './byId';

export const getBarCodesById = (state, ids) =>
  byIdApi.getBarCodesById(state.byId, ids);
