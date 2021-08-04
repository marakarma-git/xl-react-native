import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {View, Alert, ToastAndroid} from 'react-native';
import {
  HeaderContainer,
  OverlayBackground,
  ModalConfirmation,
} from '../../components';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {subscriptionStyle} from '../../style';
import TableFooter from '../../components/subscription/tableFooter';
import Table from '../../components/table/Table';
import SearchHeader from '../../components/subscription/searchHeader';
import AppliedFilter from '../../components/subscription/appliedFilter';
import FilterActionLabel from '../../components/subscription/filterActionLabel';
import {
  userAdministrationDynamicReset,
  userAdministrationGenerateParams,
  userAdministrationSetSearchText,
  userAdministrationUpdateBundleArray,
} from '../../redux/action/user_administration_array_header_action';
import callUserAdministrationGetUser, {
  userAdministrationSetDataUserGenerated,
  userAdministrationDynamicCheckDataUser,
  userAdministrationCheckAllDataUser,
  userAdministrationChangeCheckHeader,
  callUserAdministrationUpdateLockUnlockUser,
  callUserAdministrationDeleteUser,
} from '../../redux/action/user_administration_get_user_action';
import ModalMenuPicker from '../../components/modal/ModalMenuPicker';
import {dataMatcherArray2D} from '../../redux/action/get_sim_inventory_action';
import Helper from '../../helpers/helper';
import Loading from '../../components/loading';
import {setRequestError} from '../../redux/action/dashboard_action';
import {base_url} from '../../constant/connection';
import {ADMINISTRATION_PRIVILEDGE_ID} from '../../constant/actionPriv';
import {saveActivityLog} from '../../redux/action/save_activity_log_action';
import {useToastHooks} from '../../customHooks/customHooks';

const actionDataArray = [
  {
    value: '0',
    actionName: 'Create',
    label: 'Create New User',
    isDisabled: false,
    isVisible: true,
  },
  {
    value: '1',
    actionName: 'Edit',
    label: 'Edit User',
    isDisabled: true,
    isVisible: true,
  },
  {
    value: '2',
    actionName: 'Delete',
    label: 'Delete User(s)...',
    isDisabled: true,
    isVisible: true,
  },
  {
    value: '3',
    actionName: 'Lock',
    label: 'Lock User',
    isDisabled: true,
    isVisible: true,
  },
  {
    value: '4',
    actionName: 'Unlock',
    label: 'Unlock User',
    isDisabled: true,
    isVisible: true,
  },
];

const UserAdministrationPage = ({route}) => {
  const dispatch = useDispatch();
  const openToast = useToastHooks();
  const navigation = useNavigation();
  const [actionData, setActionData] = useState(actionDataArray);
  const [firstRender, setFirstRender] = useState(true);
  const [showMenu, setShowMenu] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalDescription, setModalDescription] = useState('');
  const [modalConfirmText, setModalConfirmText] = useState('');
  const [selectedUser, setSelectedUser] = useState([]);
  const [isFilterVisible, setIsFilterVisible] = useState(true);
  const {imageBase64} = useSelector((state) => state.enterprise_reducer);
  const accessToken = useSelector(
    (state) => state.auth_reducer.data.access_token,
  );
  const userAuthority = useSelector(
    (state) => state.auth_reducer.data?.authority,
  );
  const {dataHeader, searchText, generatedParams, appliedFilter} = useSelector(
    (state) => state.user_administration_array_header_reducer,
  );
  const {
    loading,
    errorText,
    data_user,
    data_user_generated,
    page_pagination,
    total_size_pagination,
    total_page_pagination,
    total_elements_pagination,
    total_dynamic_elements_pagination,
    applied_filter,
    applied_header_sort,
    params_applied_activity_log,
  } = useSelector((state) => state.user_administration_get_user_reducer);
  useEffect(() => {
    if (!firstRender) {
      dispatch(
        callUserAdministrationGetUser({
          paginate_page: 0,
        }),
      );
    } else {
      dispatch(callUserAdministrationGetUser());
      setFirstRender(false);
    }
  }, [dispatch, searchText, generatedParams]);

  const actionChange = (e) => {
    switch (e.value) {
      case '0':
        navigation.navigate('Create User', {
          userId: '',
        });
        break;

      case '1':
        if (selectedUser.length > 0) {
          navigation.navigate('Create User', {
            userId: selectedUser[0].userId,
          });
        } else {
          ToastAndroid.show('Please select at least 1 user', ToastAndroid.LONG);
        }
        break;

      case '2':
        setShowModal(true);
        setModalTitle('Delete User');
        setModalDescription('Are you sure ? Selected user(s) will be deleted');
        setModalConfirmText('Delete');
        break;

      case '3':
        setShowModal(true);
        setModalTitle('Lock User');
        setModalDescription('Are you sure ? Selected user(s) will be locked');
        setModalConfirmText('Confirm');
        break;

      case '4':
        setShowModal(true);
        setModalTitle('Unlock User');
        setModalDescription('Are you sure ? Selected user(s) will be unlocked');
        setModalConfirmText('Confirm');
        break;

      default:
        console.log(e);
        break;
    }
  };

  const deleteFunction = async () => {
    const roleId = new Array();
    const usernameArray = new Array();

    selectedUser.map((user) => {
      roleId.push(user.userId);
      usernameArray.push(user.username);
    });

    setModalLoading(true);

    try {
      //dispatch(
      //   saveActivityLog(
      //     route.name,
      //     'Delete',
      //     ADMINISTRATION_PRIVILEDGE_ID,
      //     `Delete for data: ${usernameArray.join(', ')}`,
      //   ),
      // );
      const {data} = await axios.post(
        `${base_url}/user/usr/deleteUser`,
        {userId: roleId},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      if (data) {
        if (data.statusCode === 0) {
          setModalLoading(false);
          setShowModal(false);
          openToast({
            title: 'Delete User',
            type: 'success',
            message: 'Selected user(s) has been deleted',
            duration: 4500,
            showToast: true,
            position: 'top',
          });
          setSelectedUser([]);
          updateActionAccess([]);
          dispatch(callUserAdministrationDeleteUser(roleId));
        }
      }
    } catch (error) {
      dispatch(setRequestError(error.response.data));
      openToast({
        title: 'Error',
        type: 'error',
        message: JSON.stringify(error.response.data),
        duration: 4500,
        showToast: true,
        position: 'top',
      });
    }
  };

  const lockUnlockFunction = async (lockUser) => {
    try {
      setModalLoading(true);
      //dispatch(
        // saveActivityLog(
        //   route.name,
        //   lockUser ? 'Lock' : 'Unlock',
        //   ADMINISTRATION_PRIVILEDGE_ID,
        //   `${lockUser ? 'Lock' : 'Unlock'} for data: ${usernameArray.join(
        //     ', ',
        //   )}`,
        // ),
      );
      const roleId = new Array();
      const usernameArray = new Array();
      let successMessage = lockUser ? 'locked' : 'unlocked';

      selectedUser.map((user) => {
        roleId.push(user.userId);
        usernameArray.push(user.username);
      });

      const {data} = await axios.post(
        `${base_url}/user/usr/updateLock`,
        {lockStatus: lockUser, userId: roleId},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      if (data) {
        if (data.statusCode === 0) {
          setModalLoading(false);
          setShowModal(false);
          openToast({
            title: `${lockUser ? 'Lock' : 'Unlock'} user`,
            type: 'success',
            message: `Selected user(s) has been ${successMessage}`,
            duration: 4500,
            showToast: true,
            position: 'top',
          });

          dispatch(
            callUserAdministrationUpdateLockUnlockUser(roleId[0], lockUser),
          );
        }
      }
    } catch (error) {
      dispatch(setRequestError(error.response.data));
      openToast({
        title: 'Error',
        type: 'error',
        message: JSON.stringify(error.response.data),
        duration: 4500,
        showToast: true,
        position: 'top',
      });
    }
  };

  const selectUserToggle = (data, index) => {
    let isUnique = true;
    let selectedData = data[index];

    const dataUser = selectedUser.slice();

    dataUser.map((user, index) => {
      if (selectedData.userId === user.userId) {
        isUnique = false;
        dataUser.splice(index, 1);
      }
    });

    if (isUnique) {
      dataUser.push(selectedData);
    }

    updateActionAccess(dataUser);
    setSelectedUser((prevState) => (prevState = dataUser));
  };

  const updateActionAccess = (dataUser) => {
    const dataAction = actionData.slice();

    dataAction[1].isDisabled = dataUser.length === 1 ? false : true;
    dataAction[2].isDisabled = dataUser.length > 0 ? false : true;
    dataAction[3].isDisabled = dataUser.length === 1 ? false : true;
    dataAction[4].isDisabled = dataUser.length === 1 ? false : true;

    setActionData((prevState) => (prevState = dataAction));
  };

  const checkActionPriviledge = () => {
    const dataAction = actionData.slice();
    const isVisible = Helper.findAndReturnPriviledge(
      route.name,
      'Filter',
      userAuthority,
      ADMINISTRATION_PRIVILEDGE_ID,
    );

    // Filter
    setIsFilterVisible(isVisible);

    // Action
    dataAction.map((action) => {
      let isVisible = Helper.findAndReturnPriviledge(
        route.name,
        action.actionName,
        userAuthority || [],
        ADMINISTRATION_PRIVILEDGE_ID,
      );
      action.isVisible = isVisible;
    });

    setActionData(dataAction);
  };

  const reFetchListAction = (dataUser) => {
    selectedUser.map((user) => {
      dataUser.map((data, index) => {
        if (user.userId === data.userId) {
          dispatch(userAdministrationDynamicCheckDataUser(index));
        }
      });
    });
  };

  useEffect(() => {
    reFetchListAction(data_user?.result?.content || []);
  }, [data_user]);

  useEffect(() => {
    return navigation.addListener('focus', () => {
      checkActionPriviledge();
      // dispatch(
      //   saveActivityLog(route.name, 'View', ADMINISTRATION_PRIVILEDGE_ID),
      // );
      dispatch(
        callUserAdministrationGetUser({
          paginate_page: 0,
        }),
      );
    });
  }, [navigation]);

  return (
    <HeaderContainer
      headerTitle={'User Administration'}
      style={{flex: 1}}
      companyLogo={imageBase64}>
      <View style={subscriptionStyle.containerBackground}>
        <Table
          isScrollView={true}
          stickHeaderIndices={[1]}
          headerOtherLayout={() => {
            return (
              <>
                <OverlayBackground height={isFilterVisible ? 100 : 0} />
                {isFilterVisible && (
                  <SearchHeader
                    value={''}
                    onSubmitEditing={(e) => {
                      console.log(e);
                      dispatch(
                        userAdministrationSetSearchText({
                          searchText: e,
                        }),
                      );
                    }}
                    showMenu={showMenu}
                    onClickColumn={() => setShowMenu((state) => !state)}
                    navigateTo={'UserAdministrationFilter'}
                    placeholder={'Search with user ID, name or organization'}
                  />
                )}
                <AppliedFilter
                  data={appliedFilter}
                  onDelete={(e) => {
                    const {formId} = e || {};
                    dispatch(userAdministrationDynamicReset({formId}));
                    dispatch(userAdministrationGenerateParams());
                  }}
                />
                <FilterActionLabel
                  actionData={actionData}
                  onChange={actionChange}
                  total={Helper.numberWithDot(total_elements_pagination)}
                  filtered={
                    applied_filter &&
                    !loading &&
                    data_user_generated.length > 0 &&
                    !errorText &&
                    Helper.numberWithDot(total_dynamic_elements_pagination)
                  }
                  selected={selectedUser.length}
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
                callUserAdministrationGetUser({
                  paginate_page: 0,
                  data_to_sort: {
                    formId: formId,
                    order_by: api_id,
                    sort_by: getOrder(),
                  },
                }),
              );
            } else {
              dispatch(
                callUserAdministrationGetUser({
                  paginate_page: 0,
                }),
              );
            }
          }}
          onPressCheckHeader={(e) => {
            const {valueCheck} = e || {};
            dispatch(userAdministrationChangeCheckHeader());
            dispatch(userAdministrationCheckAllDataUser(valueCheck));
          }}
          onPressCheckCell={({index}) => {
            selectUserToggle(data_user?.result?.content || [], index);
            dispatch(userAdministrationDynamicCheckDataUser(index));
          }}
          selectedHeaderOrderSort={applied_header_sort}
          dataHeader={dataHeader}
          dataTable={data_user_generated}
        />
        <TableFooter
          totalPage={total_page_pagination}
          currentPage={page_pagination}
          perPageValue={total_size_pagination}
          onChangePerPage={(e) => {
            const {value} = e || {};
            dispatch(
              callUserAdministrationGetUser({
                paginate_size: value,
              }),
            );
          }}
          onChangePaging={(e) => {
            dispatch(
              callUserAdministrationGetUser({
                paginate_page: e,
              }),
            );
          }}
        />
        {loading && <Loading />}
      </View>
      {showMenu && (
        <ModalMenuPicker
          title={'Column'}
          data={dataHeader}
          onApply={(e) => {
            const {result} = data_user || {};
            const {content} = result || {};
            dispatch(userAdministrationUpdateBundleArray({data: e}));
            const reGenerated = dataMatcherArray2D(content, e);
            dispatch(userAdministrationSetDataUserGenerated(reGenerated));
            setShowMenu((state) => !state);
          }}
          onClose={() => setShowMenu((state) => !state)}
        />
      )}
      {showModal && (
        <ModalConfirmation
          showModal={showModal}
          loading={modalLoading}
          closeModal={() => setShowModal(false)}
          title={modalTitle}
          description={modalDescription}
          confirmText={modalConfirmText}
          confirmAction={
            modalTitle == 'Delete User'
              ? deleteFunction
              : () =>
                  lockUnlockFunction(modalTitle == 'Lock User' ? true : false)
          }
        />
      )}
    </HeaderContainer>
  );
};

export default UserAdministrationPage;
