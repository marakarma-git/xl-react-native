import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import callRoleAction, {
  roleAdministrationCheckAlDataRole,
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
import Table from '../../components/table/Table';
import SearchHeader from '../../components/subscription/searchHeader';
import AppliedFilter from '../../components/subscription/appliedFilter';
import FilterActionLabel from '../../components/subscription/filterActionLabel';
import Helper from '../../helpers/helper';
import TableFooter from '../../components/subscription/tableFooter';
import Loading from '../../components/loading';

const RoleAdministrationPage = () => {
  const dispatch = useDispatch();
  const [firstRender, setFirstRender] = useState(true);
  const [showMenu, setShowMenu] = useState(false);
  const {imageBase64} = useSelector((state) => state.enterprise_reducer);
  const {
    dataRoleHeader,
    searchText,
    generatedParams,
    appliedFilter,
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
  useEffect(() => {
    if (!firstRender) {
      dispatch(
        callRoleAction({
          page_params: 0,
        }),
      );
    } else {
      dispatch(callRoleAction());
      setFirstRender(false);
    }
  }, [dispatch, searchText, generatedParams]);
  return (
    <HeaderContainer
      headerTitle={'Role Administration'}
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
                  data={appliedFilter}
                  onDelete={(e) => {
                    const {formId} = e || {};
                    dispatch(roleAdministrationDynamicReset({formId}));
                    dispatch(roleAdministrationGenerateParams());
                  }}
                />
                <FilterActionLabel
                  total={Helper.numberWithDot(role_elements_static)}
                  filtered={
                    role_applied_filter &&
                    !loading &&
                    data_role_generated.length > 0 &&
                    !errorText &&
                    Helper.numberWithDot(role_elements_dynamic)
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
            dispatch(roleAdministrationChangeCheckHeader());
            dispatch(roleAdministrationCheckAlDataRole({valueCheck}));
          }}
          onPressCheckCell={({index}) => {
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
    </HeaderContainer>
  );
};

export default RoleAdministrationPage;
