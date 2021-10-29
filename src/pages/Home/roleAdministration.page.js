import React, {useEffect, useState} from 'react';
import {View, ToastAndroid, Alert} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import callRoleAction, {
  callRoleAdministrationDeleteRole,
  roleAdministrationCheckAlDataRole,
  roleAdministrationCrudActiveMenu,
  roleAdministrationDynamicCheckDataRole,
  roleAdministrationSetDataRoleGenerated,
} from '../../redux/action/role_administration_get_all_role_action';
import {HeaderContainer, OverlayBackground} from '../../components';
import {subscriptionStyle} from '../../style';
import ModalMenuPicker from '../../components/modal/ModalMenuPicker';
import {dataMatcherArray2D} from '../../redux/action/get_sim_inventory_action';
import {
  roleAdministrationChangeCheckHeader,
  roleAdministrationDynamicReset,
  roleAdministrationGenerateParams,
  roleAdministrationSetSearchText,
  roleAdministrationUpdateBundleArray,
} from '../../redux/action/role_administration_array_header_action';
import {ModalConfirmation} from '../../components';
import Table from '../../components/table/Table';
import SearchHeader from '../../components/subscription/searchHeader';
import AppliedFilter from '../../components/subscription/appliedFilter';
import FilterActionLabel from '../../components/subscription/filterActionLabel';
import Helper from '../../helpers/helper';
import TableFooter from '../../components/subscription/tableFooter';
import Loading from '../../components/loading';
import {setRequestError} from '../../redux/action/dashboard_action';
import {useToastHooks} from '../../customHooks/customHooks';
import {ADMINISTRATION_PRIVILEDGE_ID} from '../../constant/actionPriv';
import httpRequest from '../../constant/axiosInstance';

const actionDataArray = [
  {
    value: '0',
    actionName: 'Create',
    label: 'Create new role...',
    isDisabled: false,
    isVisible: true,
  },
  {
    value: '1',
    actionName: 'Edit',
    label: 'Edit role...',
    isDisabled: true,
    isVisible: true,
  },
  {
    value: '2',
    actionName: 'Delete',
    label: 'Delete role(s)...',
    isDisabled: true,
    isVisible: true,
  },
  {
    value: '3',
    actionName: 'Copy',
    label: 'Copy role...',
    isDisabled: true,
    isVisible: true,
  },
];

const RoleAdministrationPage = ({route, navigation}) => {
  const dispatch = useDispatch();
  const showToast = useToastHooks();
  const [actionData, setActionData] = useState(actionDataArray);
  const [firstRender, setFirstRender] = useState(true);
  const [showMenu, setShowMenu] = useState(false);
  const [selectedRoles, setSelectedRoles] = useState([]);
  const {imageBase64} = useSelector((state) => state.enterprise_reducer);
  const [showModal, setShowModal] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const {
    dataRoleHeader,
    searchText,
    generatedParams,
    appliedFilterRole,
  } = useSelector((state) => state.role_administration_array_header_reducer);
  const {
    loading,
    errorText,
    data_role,
    data_role_generated,
    role_page,
    role_total_page,
    role_total_size,
    role_elements_static,
    role_elements_dynamic,
    role_applied_header_sort,
    role_applied_filter,
    role_params_applied_activity_log,
  } = useSelector((state) => state.role_administration_get_all_role_reducer);
  const [isCheckHeader, setIsCheckHeader] = useState(false);
  const accessToken = useSelector(
    (state) => state.auth_reducer.data.access_token,
  );
  const {data} = useSelector((state) => state.auth_reducer);

  const customConfirmAlert = (
    title,
    message,
    actionText,
    cancelAction,
    action,
  ) => {
    Alert.alert(
      title,
      message,
      [
        {
          text: 'Cancel',
          onPress: () => cancelAction(),
        },
        {
          text: actionText,
          onPress: () => action(),
        },
      ],
      {
        cancelable: true,
      },
    );
  };

  const actionChange = (e) => {
    switch (e.value) {
      case '0':
        dispatch(roleAdministrationCrudActiveMenu('create'));
        navigation.navigate('RoleAdministrationCreate', {
          roleId: '',
        });
        break;
      case '1':
        if (selectedRoles.length > 0) {
          dispatch(roleAdministrationCrudActiveMenu('edit'));
          navigation.navigate('RoleAdministrationCreate', {
            roleId: selectedRoles[0].roleId,
          });
        } else {
          ToastAndroid.show('Please select at least 1 role', ToastAndroid.LONG);
        }
        break;
      case '2':
        setShowModal(true);
        break;
      case '3':
        if (selectedRoles.length === 1) {
          dispatch(roleAdministrationCrudActiveMenu('copy'));
          navigation.navigate('RoleAdministrationCreate', {
            roleId: selectedRoles[0].roleId,
          });
        } else {
          ToastAndroid.show('Please select 1 role', ToastAndroid.LONG);
        }
        break;

      default:
        console.log(e);
        break;
    }
  };

  const deleteFunction = async () => {
    const roleId = new Array();
    const roleNameArray = new Array();
    selectedRoles.map((role) => {
      roleId.push(role.roleId);
      roleNameArray.push(role.roleName);
    });
    setDeleteLoading(true);
    const customHeaders = {
      headers: {
        activityId: 'AP-13',
        descSuffix: roleNameArray.join(', '),
      },
    };
    try {
      const {data} = await httpRequest.post(
        `/user/role/deleteRole`,
        {roleId: roleId},
        customHeaders,
      );

      if (data) {
        if (data.statusCode === 0) {
          showToast({
            title: 'Delete Role(s)',
            type: 'success',
            message: 'Selected role(s) has been deleted',
            duration: 4500,
            showToast: true,
            position: 'top',
          });

          setSelectedRoles([]);
          updateActionAccess([]);
          dispatch(callRoleAdministrationDeleteRole(roleId));
        }
        setShowModal(false);
        setDeleteLoading(true);
      }
    } catch (error) {
      setShowModal(false);
      setDeleteLoading(true);
      dispatch(setRequestError(error.response.data));
      showToast({
        title: 'Error',
        type: 'error',
        message: error.response.data.error_description || error.message,
        duration: 4500,
        showToast: true,
        position: 'bottom',
      });
    }
  };

  const updateActionAccess = (dataRole) => {
    const dataAction = actionData.slice();

    dataAction[1].isDisabled = dataRole.length === 1 ? false : true;
    dataAction[2].isDisabled = dataRole.length > 0 ? false : true;
    dataAction[3].isDisabled = dataRole.length === 1 ? false : true;

    setActionData((prevState) => (prevState = dataAction));
  };

  const selectRoleToggle = ([...data], index = 0, type = 'cell') => {
    let isUnique = true;
    let selectedData = data[index];

    const dataRole = selectedRoles.slice();

    if (type === 'header') {
      if (!isCheckHeader) {
        data.map((datas) => {
          dataRole.push(datas);
        });
        setIsCheckHeader(true);
      } else {
        dataRole.splice(0, dataRole.length);
        setIsCheckHeader(false);
      }
    } else {
      dataRole.map((role, index) => {
        if (selectedData.roleId === role.roleId) {
          isUnique = false;
          dataRole.splice(index, 1);
        }
      });

      if (isUnique) {
        dataRole.push(selectedData);
      }
    }

    updateActionAccess(dataRole);
    setSelectedRoles((prevState) => (prevState = dataRole));
  };

  const reFetchListAction = (dataRole) => {
    selectedRoles.map((role) => {
      dataRole.map((data, index) => {
        if (role.roleId === data.roleId) {
          dispatch(roleAdministrationDynamicCheckDataRole({index}));
        }
      });
    });
  };

  const checkActionPriviledge = () => {
    const dataAction = actionData.slice();

    dataAction.map((action) => {
      let isVisible = Helper.findAndReturnPriviledge(
        route.name,
        action.actionName,
        data?.authority || [],
        ADMINISTRATION_PRIVILEDGE_ID,
      );
      action.isVisible = isVisible;
    });

    setActionData(dataAction);
  };

  useEffect(() => {
    reFetchListAction(data_role?.result?.content || []);
  }, [data_role]);

  useEffect(() => {
    dispatch(callRoleAction());
    setFirstRender(false);
  }, [searchText, generatedParams]);

  useEffect(() => {
    return navigation.addListener('focus', () => {
      checkActionPriviledge();
      setSelectedRoles([]);
      updateActionAccess([]);
      dispatch(
        callRoleAction({
          page_params: 0,
        }),
      );
    });
  }, [navigation]);

  return (
    <HeaderContainer
      headerTitle={route.name}
      style={{flex: 1}}
      companyLogo={imageBase64}>
      <View style={subscriptionStyle.containerBackground}>
        <Table
          isScrollView={true}
          stickHeaderIndices={[1]}
          headerOtherLayout={() => {
            return (
              <>
                <OverlayBackground />
                <SearchHeader
                  value={''}
                  onSubmitEditing={(e) => {
                    dispatch(
                      roleAdministrationSetSearchText({
                        searchText: e,
                      }),
                    );
                  }}
                  showMenu={showMenu}
                  onClickColumn={() => setShowMenu((state) => !state)}
                  navigateTo={'RoleAdministrationFilter'}
                  placeholder={
                    'Search with role name, organization or description'
                  }
                />
                <AppliedFilter
                  data={appliedFilterRole}
                  onDelete={(e) => {
                    const {formId} = e || {};
                    dispatch(roleAdministrationDynamicReset({formId}));
                    dispatch(roleAdministrationGenerateParams());
                  }}
                />
                <FilterActionLabel
                  actionData={actionData}
                  onChange={actionChange}
                  total={Helper.numberWithDot(role_elements_static)}
                  filtered={
                    role_applied_filter &&
                    !loading &&
                    data_role_generated.length > 0 &&
                    !errorText &&
                    Helper.numberWithDot(role_elements_dynamic)
                  }
                  selected={selectedRoles.length}
                />
              </>
            );
          }}
          onPressHeader={(e) => {
            const {dataSort, item} = e || {};
            const {sortBy, formId: currentFormId} = dataSort || {};
            const {formId, api_id} = item || {};
            const getOrder = () => {
              if (formId !== currentFormId) {
                return 'ASC';
              }
              if (formId === currentFormId) {
                if (sortBy === '' || sortBy === 'RESET') {
                  return 'ASC';
                }
                if (sortBy === 'ASC') {
                  return 'DESC';
                }
                if (sortBy === 'DESC') {
                  return 'RESET';
                }
              }
            };
            if (getOrder()) {
              dispatch(
                callRoleAction({
                  page_params: 0,
                  header_sort_params: {
                    formId: formId,
                    orderBy: api_id,
                    sortBy: getOrder(),
                  },
                }),
              );
            } else {
              dispatch(
                callRoleAction({
                  page_params: 0,
                }),
              );
            }
          }}
          onPressCheckHeader={(e) => {
            const {valueCheck} = e || {};
            selectRoleToggle(data_role?.result?.content || [], 0, 'header');
            dispatch(roleAdministrationChangeCheckHeader());
            dispatch(roleAdministrationCheckAlDataRole({valueCheck}));
          }}
          onPressCheckCell={({index}) => {
            selectRoleToggle(data_role?.result?.content || [], index);
            dispatch(roleAdministrationDynamicCheckDataRole({index}));
          }}
          selectedHeaderOrderSort={role_applied_header_sort}
          dataHeader={dataRoleHeader}
          dataTable={data_role_generated}
        />
        <TableFooter
          currentPage={role_page}
          totalPage={role_total_page}
          perPageValue={role_total_size}
          onChangePerPage={(e) => {
            const {value} = e || {};
            dispatch(
              callRoleAction({
                size_params: value,
              }),
            );
          }}
          onChangePaging={(e) => {
            dispatch(
              callRoleAction({
                page_params: e,
              }),
            );
          }}
        />
        {loading && <Loading />}
      </View>
      {showMenu && (
        <ModalMenuPicker
          title={'Column'}
          data={dataRoleHeader}
          onApply={(e) => {
            const {result} = data_role || {};
            const {content} = result || {};
            dispatch(roleAdministrationUpdateBundleArray({data: e}));
            const reGenerated = dataMatcherArray2D(content, e);
            dispatch(
              roleAdministrationSetDataRoleGenerated({
                dataRoleGenerated: reGenerated,
              }),
            );
            setShowMenu((state) => !state);
          }}
          onClose={() => setShowMenu((state) => !state)}
        />
      )}
      {showModal && (
        <ModalConfirmation
          showModal={showModal}
          loading={deleteLoading}
          closeModal={() => setShowModal(false)}
          title="Delete Role"
          description="Are you sure want to delete selected role(s)?"
          confirmText="Delete"
          confirmAction={deleteFunction}
        />
      )}
    </HeaderContainer>
  );
};

export default RoleAdministrationPage;
