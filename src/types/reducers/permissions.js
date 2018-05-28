// @flow

export type PermissionsState = {
  hasCameraPermission: ?boolean,
};

export const getInitialPermissionsState = () => ({
  hasCameraPermission: null,
});
