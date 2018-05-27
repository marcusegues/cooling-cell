// @flow
import type { PermissionsState } from '../types/reducers/permissions';
import { getInitialPermissionsState } from '../types/reducers/permissions';
import type { Action } from '../types/actions';

export const permissions = (
  state: PermissionsState = getInitialPermissionsState(),
  action: Action
): PermissionsState => {
  switch (action.type) {
    case 'SET_HAS_CAMERA_PERMISSION': {
      return { ...state, hasCameraPermission: action.hasPermission };
    }
    default: {
      return state;
    }
  }
};
