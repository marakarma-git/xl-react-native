import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import Table from '../../components/table/Table';
import {
  ButtonLabelComponent,
  HeaderContainer,
  OverlayBackground,
  Text,
} from '../../components';
import {useDispatch, useSelector} from 'react-redux';
import Loading from '../../components/loading';
import {subscriptionStyle} from '../../style';
import {
  getEnterpriseList,
  enterpriseManagementHideShow,
  enterpriseManagementCheckBoxToggle,
  enterpriseManagementSetDataGenerated,
  enterpriseManagementSetDetailParams,
} from '../../redux/action/enterprise_management_action';
import SearchHeader from '../../components/subscription/searchHeader';
import AppliedFilter from '../../components/subscription/appliedFilter';
import Helper from '../../helpers/helper';
import {
  enterpriseManagementDynamicReset,
  enterpriseManagementGenerateParams,
  enterpriseManagementSetSearchText,
  enterpriseManagementUpdateBundleArray,
} from '../../redux/action/enterprise_management_array_header_action';
import TableFooter from '../../components/subscription/tableFooter';
import ModalMenuPicker from '../../components/modal/ModalMenuPicker';
import {dataMatcherArray2D} from '../../redux/action/get_sim_inventory_action';
import {useNavigation} from '@react-navigation/native';

const EnterpriseManagement = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [firstRender, setFirstRender] = useState(true);
  const [showMenu, setShowMenu] = useState(false);
  const {imageBase64} = useSelector((state) => state.enterprise_reducer);
  const {
    dataHeaderEnterprise,
    searchText,
    generatedParams,
    appliedFilterEnterprise,
  } = useSelector((state) => state.enterprise_management_header_array_reducer);
  const {
    loading,
    errorText,
    data_enterprise,
    data_enterprise_generated,
    enterprise_page,
    enterprise_total_page,
    enterprise_total_size,
    enterprise_elements_static,
    enterprise_elements_dynamic,
    enterprise_applied_header_sort,
    enterprise_applied_filter,
  } = useSelector(
    (state) => state.enterprise_management_get_enterprise_reducer,
  );
  useEffect(() => {
    if (!firstRender) {
      dispatch(
        getEnterpriseList({
          page_params: 0,
        }),
      );
    } else {
      dispatch(getEnterpriseList());
      setFirstRender(false);
    }
    return () =>
      navigation.addListener('focus', () => {
        dispatch(getEnterpriseList());
      });
  }, [navigation, dispatch, searchText, generatedParams]);
  return (
    <HeaderContainer
      headerTitle={'Enterprise Management'}
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
                      enterpriseManagementSetSearchText({
                        searchText: e,
                      }),
                    );
                  }}
                  showMenu={showMenu}
                  onClickColumn={() => setShowMenu(true)}
                  navigateTo={'EnterpriseManagementFilter'}
                  placeholder={'Search enterprise...'}
                />
                <AppliedFilter
                  data={appliedFilterEnterprise}
                  onDelete={(e) => {
                    const {formId} = e || {};
                    dispatch(enterpriseManagementDynamicReset({formId}));
                    dispatch(enterpriseManagementGenerateParams());
                  }}
                />
                <ButtonLabelComponent
                  buttonText={'Create Enterprise'}
                  buttonAction={() =>
                    navigation.navigate('EnterpriseManagementOnboard')
                  }
                  buttonWidth={150}
                  buttonStyle={{marginHorizontal: 15}}
                  total={enterprise_elements_static || ''}
                  filtered={
                    enterprise_applied_filter &&
                    !loading &&
                    data_enterprise_generated.length > 0 &&
                    data_enterprise_generated.length
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
                getEnterpriseList({
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
                getEnterpriseList({
                  page_params: 0,
                }),
              );
            }
          }}
          dataHeader={dataHeaderEnterprise}
          dataTable={data_enterprise_generated}
          onPressCell={(e) => {
            dispatch(enterpriseManagementSetDetailParams(e.item.enterpriseId));
            navigation.navigate('EnterpriseManagementEditView');
          }}
          onPressCheckCell={(e) =>
            dispatch(
              enterpriseManagementCheckBoxToggle(e.item.item.enterpriseId),
            )
          }
          onPressTreeArrow={(e) =>
            dispatch(enterpriseManagementHideShow(e.item.enterpriseId))
          }
          selectedHeaderOrderSort={enterprise_applied_header_sort}
        />
        <TableFooter
          currentPage={enterprise_page}
          totalPage={enterprise_total_page}
          perPageValue={enterprise_total_size}
          onChangePerPage={(e) => {
            const {value} = e || {};
            dispatch(
              getEnterpriseList({
                size_params: value,
              }),
            );
          }}
          onChangePaging={(e) => {
            dispatch(
              getEnterpriseList({
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
          data={dataHeaderEnterprise}
          onApply={(e) => {
            dispatch(enterpriseManagementUpdateBundleArray({data: e}));
            const reGenerated = dataMatcherArray2D(
              Helper.makeMultiDimensionalArrayTo2DArray(data_enterprise),
              e,
            );
            dispatch(
              enterpriseManagementSetDataGenerated({
                dataEnterpriseGenerated: reGenerated,
              }),
            );
            setShowMenu(false);
          }}
          onClose={() => setShowMenu(false)}
        />
      )}
    </HeaderContainer>
  );
};
export default EnterpriseManagement;
