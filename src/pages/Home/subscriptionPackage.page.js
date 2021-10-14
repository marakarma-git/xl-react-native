import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import callSubscriptionPackage, {
  subscriptionPackageCheckAlDataSubscription,
  subscriptionPackageDynamicCheckDataSubscription,
  subscriptionPackageSetDataSubscriptionGenerated,
} from '../../redux/action/subscription_package_get_subscription_action';
import {HeaderContainer, OverlayBackground} from '../../components';
import {subscriptionStyle} from '../../style';
import ModalMenuPicker from '../../components/modal/ModalMenuPicker';
import {dataMatcherArray2D} from '../../redux/action/get_sim_inventory_action';
import {
  subscriptionPackageChangeCheckHeader,
  subscriptionPackageDynamicReset,
  subscriptionPackageGenerateParams,
  subscriptionPackageUpdateBundleArray,
} from '../../redux/action/subscription_package_array_header_action';
import Table from '../../components/table/Table';
import AppliedFilter from '../../components/subscription/appliedFilter';
import FilterActionLabel from '../../components/subscription/filterActionLabel';
import Helper from '../../helpers/helper';
import TableFooter from '../../components/subscription/tableFooter';
import SearchHeader, {
  SearchHeaderTwo,
} from '../../components/subscription/searchHeader';
import Loading from '../../components/loading';
import {useNavigation} from '@react-navigation/native';

const SubscriptionPackagePage = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [firstRender, setFirstRender] = useState(true);
  const [showMenu, setShowMenu] = useState(false);
  const {imageBase64} = useSelector((state) => state.enterprise_reducer);
  const {
    dataSubscriptionHeader,
    searchText,
    generatedParams,
    appliedFilterSubscription,
  } = useSelector((state) => state.subscription_package_array_header_reducer);
  const {
    loading,
    errorText,
    data_subscription,
    data_subscription_generated,
    subscription_page,
    subscription_total_page,
    subscription_total_size,
    subscription_elements_static,
    subscription_elements_dynamic,
    subscription_applied_header_sort,
    subscription_applied_filter,
    subscription_params_applied_activity_log,
  } = useSelector(
    (state) => state.subscription_package_get_subscription_reducer,
  );
  useEffect(() => {
    if (!firstRender) {
      dispatch(
        callSubscriptionPackage({
          page_params: 0,
        }),
      );
    } else {
      dispatch(callSubscriptionPackage());
      setFirstRender(false);
    }
  }, [dispatch, searchText, generatedParams]);
  return (
    <HeaderContainer
      headerTitle={'Subscription Package'}
      style={{flex: 1}}
      companyLogo={imageBase64}>
      <View style={subscriptionStyle.containerBackground}>
        <Table
          onPressEdit={({position_table_index}) => {
            navigation.navigate('SubscriptionPackageEdit', {
              positionTableIndex: position_table_index,
            });
            // console.log(
            //   JSON.stringify(
            //     data_subscription_generated[position_table_index],
            //     null,
            //     2,
            //   ),
            // )
          }}
          isScrollView={true}
          stickHeaderIndices={[1]}
          onRight
          headerOtherLayout={() => {
            return (
              <>
                <OverlayBackground />
                <SearchHeaderTwo
                  total={Helper.numberWithDot(subscription_elements_static)}
                  filtered={
                    subscription_applied_filter &&
                    !loading &&
                    data_subscription_generated.length > 0 &&
                    !errorText &&
                    Helper.numberWithDot(subscription_elements_dynamic)
                  }
                  onClickFilter={() =>
                    navigation.navigate('SubscriptionPackageFilter')
                  }
                  onClickColumn={() => setShowMenu(true)}
                />
                <AppliedFilter
                  data={appliedFilterSubscription}
                  onDelete={(e) => {
                    const {formId} = e || {};
                    dispatch(subscriptionPackageDynamicReset({formId}));
                    dispatch(subscriptionPackageGenerateParams());
                  }}
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
                callSubscriptionPackage({
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
                callSubscriptionPackage({
                  page_params: 0,
                }),
              );
            }
          }}
          onPressCheckHeader={(e) => {
            const {valueCheck, indexHeader} = e || {};
            dispatch(subscriptionPackageChangeCheckHeader());
            dispatch(
              subscriptionPackageCheckAlDataSubscription({
                valueCheck,
                index: indexHeader,
              }),
            );
          }}
          onPressCheckCell={({firstIndex, secondIndex, ...rest}) => {
            console.log(JSON.stringify(rest, null, 2));
            alert(firstIndex.toString() + secondIndex);
            dispatch(
              subscriptionPackageDynamicCheckDataSubscription({
                index: firstIndex,
                index2: secondIndex,
              }),
            );
          }}
          selectedHeaderOrderSort={subscription_applied_header_sort}
          dataHeader={dataSubscriptionHeader}
          dataTable={data_subscription_generated}
        />
        <TableFooter
          currentPage={subscription_page}
          totalPage={subscription_total_page}
          perPageValue={subscription_total_size}
          onChangePerPage={(e) => {
            const {value} = e || {};
            dispatch(
              callSubscriptionPackage({
                size_params: value,
              }),
            );
          }}
          onChangePaging={(e) => {
            dispatch(
              callSubscriptionPackage({
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
          data={dataSubscriptionHeader}
          onApply={(e) => {
            const {content} = data_subscription || {};
            dispatch(subscriptionPackageUpdateBundleArray({data: e}));
            const reGenerated = dataMatcherArray2D(content, e);
            dispatch(
              subscriptionPackageSetDataSubscriptionGenerated({
                dataSubscriptionGenerated: reGenerated,
              }),
            );
            setShowMenu(false);
          }}
          onClose={() => setShowMenu((state) => !state)}
        />
      )}
    </HeaderContainer>
  );
};

export default SubscriptionPackagePage;
