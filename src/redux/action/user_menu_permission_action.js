import {PERMISSION_ID} from '../../constant/actionPriv';

const setUserMenuPermission = (data) => ({
  type: 'SET_USER_MENU_PERMISSION',
  payload: data,
});

const checkUserMenuPermission = (userAuthority) => {
  return async (dispatch, getState) => {
    const {menu} = await getState().user_menu_permission_reducer;
    const menuPermissionUpdate = {...menu};
    const permissionIds = [...PERMISSION_ID];

    permissionIds.map((permission) => {
      const {permissionId, menu, action} = permission;
      const isHasPermission = [...userAuthority].some(
        (authority) => authority === permissionId,
      );
      menuPermissionUpdate[menu][action] = isHasPermission;
    });
    console.log(JSON.stringify(menuPermissionUpdate, null, 2));
    dispatch(setUserMenuPermission(menuPermissionUpdate));
  };
};

export {checkUserMenuPermission};
