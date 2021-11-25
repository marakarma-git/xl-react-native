import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  BackHandler,
  Linking,
  Modal,
  ScrollView,
  Text,
  View,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {subscriptionStyle} from '../../style';
import Table from '../../components/table/Table';
import TableFooter from '../../components/subscription/tableFooter';
import SearchHeader from '../../components/subscription/searchHeader';
import {HeaderContainer, OverlayBackground} from '../../components/index';
import {getCustomLabel} from '../../redux/action/get_custom_label_action';
import FilterActionLabel from '../../components/subscription/filterActionLabel';
import Helper from '../../helpers/helper';
import callSimInventory, {
  changeCheckSimInventory,
  changeCheckSimInventoryAllFalse,
  changeCheckSimInventoryAllTrue,
  dataMatcherArray2D,
  setSimInventoryTable,
} from '../../redux/action/get_sim_inventory_action';
import {
  generateArrayFilterParams,
  setSomethingToFilter,
  updateDataFilter,
  updateDataSearchText,
} from '../../redux/action/dynamic_array_filter_action';
import {
  subscriptionDynamicArraySnapshotGenerateParams,
  subscriptionDynamicArrayReApplyDataFromSnapshot,
} from '../../redux/action/dynamic_array_filter_action';
import ModalMenuPicker from '../../components/modal/ModalMenuPicker';
import AppliedFilter from '../../components/subscription/appliedFilter';
import dayjs from 'dayjs';
import ModalMapOnly from '../../components/modal/ModalMapOnly';
import lod from 'lodash';
import Loading from '../../components/loading';
import generateLink from '../../helpers/generateLink';

const Subscription = ({route}) => {
  const dispatch = useDispatch();
  const {params} = route;
  const {navigationFrom, dataNavigation} = params || {}; //dataNavigation -> {arrayNavigation:[]}
  const navigation = useNavigation();
  const [firstRender, setFirstRender] = useState(true);
  const [showMenu, setShowMenu] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [mapData, setMapData] = useState({});
  const {imageBase64} = useSelector((state) => state.enterprise_reducer);
  const {customerNo} = useSelector((state) => state.auth_reducer.data);
  const {
    array_filter,
    loading_array_filter,
    searchText,
    generatedParams,
    applied_filter,
    totalFiltered,
    dynamic_array_filter_snapshot,
  } = useSelector((state) => state.dynamic_array_filter_reducer);
  const {
    loading,
    data_sim_inventory_table,
    data_sim_inventory,
    current_size,
    current_page,
    current_total_page,
    current_total_elements,
    current_dynamic_total_elements,
    current_applied_filter,
    current_header_sort,
    current_params_applied,
  } = useSelector((state) => state.get_sim_inventory_reducer);
  useEffect(() => {
    if (!firstRender) {
      dispatch(
        callSimInventory({
          page_value: 0,
        }),
      );
    }
    if (lod.isEmpty(navigationFrom) && firstRender) {
      // alert('78');
      dispatch(callSimInventory());
      dispatch(getCustomLabel(navigation));
      setFirstRender(false);
    }
  }, [current_size, dispatch, navigation, searchText, generatedParams]);
  useEffect(() => {
    if (current_params_applied) {
      console.log('params_ada_isi: ' + current_params_applied);
    }
  }, [current_params_applied]);

  // This for params handling ===============
  useEffect(() => {
    if (!lod.isEmpty(navigationFrom)) {
      async function preConfig() {
        const {arrayNavigation} = dataNavigation || [];
        const resetArray = await Helper.resetAllForm(array_filter);
        const {newArray} = await Helper.merge2ArrayObject({
          arrayFrom: arrayNavigation,
          arrayTo: resetArray,
        });
        const {linkParams, containerData} = await generateLink(newArray);
        return {newArray, linkParams, containerData};
      }
      preConfig()
        .then(({newArray, linkParams, containerData}) => {
          if (!firstRender) {
            dispatch(
              subscriptionDynamicArraySnapshotGenerateParams({
                firstRender: false,
                newArray,
                linkParams,
                containerData,
              }),
            );
          } else if (firstRender) {
            setFirstRender(false);
            dispatch(
              subscriptionDynamicArraySnapshotGenerateParams({
                firstRender: true,
                newArray,
                linkParams,
                containerData,
              }),
            );
          }
        })
        .catch((e) => {
          alert('Fatal, Please restart the app');
        });
    }
  }, [params, dispatch, navigationFrom, dataNavigation]);
  const handlingBack = () => {
    dispatch(subscriptionDynamicArrayReApplyDataFromSnapshot());
    navigation.setParams({
      navigationFrom: undefined,
      dataNavigation: undefined,
    });
    dispatch(callSimInventory());
  };
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      if (!lod.isEmpty(navigationFrom)) {
        handlingBack();
      }
    });
  }, [BackHandler, navigationFrom]);
  // End for params handling ===============

  return (
    <>
      <HeaderContainer
        headerTitle={'Subscription'}
        style={{flex: 1}}
        companyLogo={imageBase64}
        backIcon={!lod.isEmpty(navigationFrom)}
        onPressBack={() => {
          if (!lod.isEmpty(navigationFrom)) {
            handlingBack();
            navigation.goBack();
          }
        }}>
        <View style={subscriptionStyle.containerBackground}>
          <Table
            isScrollView={true}
            stickHeaderIndices={[1]}
            headerOtherLayout={() => {
              return (
                <>
                  <OverlayBackground />
                  <SearchHeader
                    value={searchText}
                    onSubmitEditing={(e) => dispatch(updateDataSearchText(e))}
                    showMenu={showMenu}
                    onClickColumn={() => setShowMenu((state) => !state)}
                    navigateTo={'SubscriptionFilter'}
                    placeholder={
                      'Search with IMSI, MSISDN, ICCID, Detected IMEI'
                    }
                  />
                  <AppliedFilter
                    data={applied_filter}
                    onDelete={(e) => {
                      const {formId, typeInput} = e || {};
                      if (typeInput !== 'ForParamsOnlyDropDown') {
                        dispatch(
                          setSomethingToFilter([
                            {
                              formId: formId,
                              needs: `OnChange${typeInput}`,
                              value:
                                typeInput === 'DateTimePicker'
                                  ? dayjs().toDate()
                                  : typeInput === 'DropDown'
                                  ? {}
                                  : '',
                              selectedValue: {},
                              isSelected: false,
                            },
                          ]),
                        );
                      } else {
                        dispatch(
                          setSomethingToFilter([
                            {
                              formId: formId,
                              needs: 'ForParamsOnlyDropDown',
                              value: {},
                            },
                          ]),
                        );
                      }
                      dispatch(generateArrayFilterParams());
                    }}
                  />
                  <FilterActionLabel
                    filtered={
                      current_applied_filter &&
                      !loading &&
                      data_sim_inventory_table.length > 0 &&
                      Helper.numberWithDot(current_dynamic_total_elements)
                    }
                    total={Helper.numberWithDot(current_total_elements)}
                  />
                </>
              );
            }}
            selectedHeaderOrderSort={current_header_sort}
            dataHeader={array_filter}
            dataTable={data_sim_inventory_table}
            onPressHeader={(e) => {
              const {dataSort, item} = e || {};
              const {sortBy, formId: currentFormId} = dataSort || {};
              const {formId, api_id} = item || {};
              const getSort = () => {
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
              if (getSort()) {
                dispatch(
                  callSimInventory({
                    page_value: 0,
                    selectedHeaderSort: {
                      formId: formId,
                      orderBy: api_id,
                      sortBy: getSort(),
                    },
                  }),
                );
              } else {
                dispatch(
                  callSimInventory({
                    page_value: 0,
                  }),
                );
              }
            }}
            onPressCheckHeader={({selectedValue}) => {
              const {value} = selectedValue || {};
              switch (value) {
                case 'select_all_local':
                  return dispatch(changeCheckSimInventoryAllTrue());
                case 'deselect_all_local':
                  return dispatch(changeCheckSimInventoryAllFalse());
                default:
                  return null;
              }
            }}
            onPressCheckCell={({index}) =>
              dispatch(changeCheckSimInventory(index))
            }
            onPressCell={(e) => {
              const {subItem, item} = e || {};
              const {imsi, msisdn, inventoryId} = item || '';
              const {formId} = subItem || '';
              if (formId === 'dummy-map-hard-code') {
                setShowMap(true);
                setMapData({
                  inventoryId: inventoryId,
                  msisdn: msisdn,
                });
              } else if (formId === 'imsi-hard-code') {
                const createLink = `https://xl.dcp.ericsson.net/portal/#/en/${customerNo}/subscription-inventory/${imsi}`;
                Linking.openURL(createLink);
              }
            }}
          />
          <TableFooter
            totalPage={current_total_page}
            currentPage={current_page}
            perPageValue={current_size}
            onChangePerPage={(e) => {
              const {value} = e || {};
              dispatch(
                callSimInventory({
                  size_value: value,
                }),
              );
            }}
            onChangePaging={(e) => {
              dispatch(
                callSimInventory({
                  page_value: e,
                }),
              );
            }}
          />
          {loading && <Loading />}
        </View>
      </HeaderContainer>
      {showMap && !lod.isEmpty(mapData) && (
        <ModalMapOnly onClose={() => setShowMap(false)} mapData={mapData} />
      )}
      {showMenu && (
        <ModalMenuPicker
          title={'Column'}
          data={array_filter}
          onApply={(e) => {
            const {result} = data_sim_inventory || {};
            const {content} = result || {};
            dispatch(updateDataFilter(e));
            const reGenerated = dataMatcherArray2D(content, e);
            dispatch(setSimInventoryTable(reGenerated));
            setShowMenu((state) => !state);
          }}
          onClose={() => setShowMenu((state) => !state)}
        />
      )}
    </>
  );
};
export default Subscription;
