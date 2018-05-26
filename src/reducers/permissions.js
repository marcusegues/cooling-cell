import type { PermissionsState } from '../types/reducers/permissions';
import { getInitialPermissionsState } from '../types/reducers/permissions';

export const permissions = (
  state: PermissionsState = getInitialPermissionsState(),
  action
): DeclarationState => {
  switch (action.type) {
    default: {
      return state;
    }
  }
};
