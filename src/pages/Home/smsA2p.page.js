import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import getSmsA2p, {
  smsA2pSetDataSmsGenerated,
} from '../../redux/action/sms_a2p_get_all_sms_action';
import {HeaderContainer, OverlayBackground} from '../../components';
import {subscriptionStyle} from '../../style';
import ModalMenuPicker from '../../components/modal/ModalMenuPicker';
import {dataMatcherArray2D} from '../../redux/action/get_sim_inventory_action';
import Table from '../../components/table/Table';
import SearchHeader from '../../components/subscription/searchHeader';
import AppliedFilter from '../../components/subscription/appliedFilter';
import FilterActionLabel from '../../components/subscription/filterActionLabel';
import Helper from '../../helpers/helper';
import {
  smsA2pDynamicReset,
  smsA2pGenerateParams,
  smsA2pSetSearchText,
  smsA2pUpdateBundleArray,
} from '../../redux/action/sms_a2p_array_header_action';
import TableFooter from '../../components/subscription/tableFooter';
import Loading from '../../components/loading';

const SmsA2p = () => {
  const dispatch = useDispatch();
  const [firstRender, setFirstRender] = useState(true);
  const [showMenu, setShowMenu] = useState(false);
  const {imageBase64} = useSelector((state) => state.enterprise_reducer);
  const {
    dataSmsHeader,
    searchText,
    generatedParams,
    appliedFilter,
  } = useSelector((state) => state.sms_a2p_array_header_reducer);
  const {
    loading,
    errorText,
    data_sms,
    data_sms_generated,
    sms_page,
    sms_total_page,
    sms_total_size,
    sms_elements_static,
    sms_elements_dynamic,
    sms_applied_header_sort,
    sms_applied_filter,
    sms_params_applied_activity_log,
  } = useSelector((state) => state.sms_a2p_get_all_sms_reducer);
  useEffect(() => {
    if (!firstRender) {
      dispatch(
        getSmsA2p({
          page_params: 0,
        }),
      );
    } else {
      dispatch(getSmsA2p());
      setFirstRender(false);
    }
  }, [dispatch, searchText, generatedParams]);
  return (
    <HeaderContainer
      headerTitle={'SMS A2P Configuration'}
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
                      smsA2pSetSearchText({
                        searchText: e,
                      }),
                    );
                  }}
                  showMenu={showMenu}
                  onClickColumn={() => setShowMenu((state) => !state)}
                  navigateTo={'SmsA2pFilter'}
                  placeholder={
                    'Search with Enterprise Name, Sender Address, User Name or Registration ID'
                  }
                />
                <AppliedFilter
                  data={appliedFilter}
                  onDelete={(e) => {
                    const {formId} = e || {};
                    dispatch(smsA2pDynamicReset({formId}));
                    dispatch(smsA2pGenerateParams());
                  }}
                />
                <FilterActionLabel
                  total={Helper.numberWithDot(sms_elements_static)}
                  filtered={
                    sms_applied_filter &&
                    !loading &&
                    data_sms_generated.length > 0 &&
                    !errorText &&
                    Helper.numberWithDot(sms_elements_dynamic)
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
                getSmsA2p({
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
                getSmsA2p({
                  page_params: 0,
                }),
              );
            }
          }}
          selectedHeaderOrderSort={sms_applied_header_sort}
          dataHeader={dataSmsHeader}
          dataTable={data_sms_generated}
        />
        <TableFooter
          currentPage={sms_page}
          totalPage={sms_total_page}
          perPageValue={sms_total_size}
          onChangePerPage={(e) => {
            const {value} = e || {};
            dispatch(
              getSmsA2p({
                size_params: value,
              }),
            );
          }}
          onChangePaging={(e) => {
            dispatch(
              getSmsA2p({
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
          data={dataSmsHeader}
          onApply={(e) => {
            const {result} = data_sms || {};
            const {content} = result || {};
            dispatch(smsA2pUpdateBundleArray({data: e}));
            const reGenerated = dataMatcherArray2D(content, e);
            dispatch(
              smsA2pSetDataSmsGenerated({
                dataSmsGenerated: reGenerated,
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

export default SmsA2p;