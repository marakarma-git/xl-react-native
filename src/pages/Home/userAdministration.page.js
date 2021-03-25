import React, {useEffect, useState} from 'react';
import {ActivityIndicator, View} from 'react-native';
import {HeaderContainer, OverlayBackground} from '../../components';
import {useDispatch, useSelector} from 'react-redux';
import {inputHybridStyle, subscriptionStyle} from '../../style';
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
} from '../../redux/action/user_administration_get_user_action';
import ModalMenuPicker from '../../components/modal/ModalMenuPicker';
import {dataMatcherArray2D} from '../../redux/action/get_sim_inventory_action';
import Helper from '../../helpers/helper';
import {colors} from '../../constant/color';
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
    data_user,
    data_user_generated,
    page_pagination,
    total_size_pagination,
    total_page_pagination,
    total_elements_pagination,
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
                  onSubmitEditing={(e) =>
                    dispatch(userAdministrationSetSearchText(e))
                  }
                  showMenu={showMenu}
                  onClickColumn={() => setShowMenu((state) => !state)}
                  navigateTo={'UserAdministrationFilter'}
                  placeholder={'Search with user ID, name or organization'}
                />
                <AppliedFilter
                  data={applied_filter}
                  onDelete={(e) => {
                    const {formId} = e || {};
                    dispatch(userAdministrationDynamicReset({formId}));
                    dispatch(userAdministrationGenerateParams());
                  }}
                />
                <FilterActionLabel
                  filtered={
                    appliedFilter &&
                    !loading &&
                    data_user_generated.length > 0 &&
                    Helper.numberWithDot(total_elements_pagination)
                  }
                  total={Helper.numberWithDot(total_elements_pagination)}
                />
              </>
            );
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
        {loading && (
          <View
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              right: 0,
              left: 0,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View style={inputHybridStyle.modalBackdrop} />
            <ActivityIndicator size={'large'} color={colors.button_color_one} />
          </View>
        )}
      </View>
      {showMenu && (
        <ModalMenuPicker
          title={'Column'}
          data={dataHeader}
          onApply={(e) => {
            const {result} = data_user || {};
            const {content} = result || {};
            dispatch(userAdministrationUpdateBundleArray(e));
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
