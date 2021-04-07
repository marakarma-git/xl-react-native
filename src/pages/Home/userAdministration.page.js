import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {HeaderContainer, OverlayBackground} from '../../components';
import {useDispatch, useSelector} from 'react-redux';
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
} from '../../redux/action/user_administration_get_user_action';
import ModalMenuPicker from '../../components/modal/ModalMenuPicker';
import {dataMatcherArray2D} from '../../redux/action/get_sim_inventory_action';
import Helper from '../../helpers/helper';
import Loading from '../../components/loading';
const UserAdministrationPage = () => {
  const dispatch = useDispatch();
  const [firstRender, setFirstRender] = useState(true);
  const [showMenu, setShowMenu] = useState(false);
  const {imageBase64} = useSelector((state) => state.enterprise_reducer);
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
      console.log('panggil');
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
                <OverlayBackground />
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
                <AppliedFilter
                  data={appliedFilter}
                  onDelete={(e) => {
                    const {formId} = e || {};
                    dispatch(userAdministrationDynamicReset({formId}));
                    dispatch(userAdministrationGenerateParams());
                  }}
                />
                <FilterActionLabel
                  total={Helper.numberWithDot(total_elements_pagination)}
                  filtered={
                    applied_filter &&
                    !loading &&
                    data_user_generated.length > 0 &&
                    !errorText &&
                    Helper.numberWithDot(total_dynamic_elements_pagination)
                  }
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
    </HeaderContainer>
  );
};

export default UserAdministrationPage;
