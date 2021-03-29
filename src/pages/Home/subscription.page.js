import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {ActivityIndicator, View, Linking} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {inputHybridStyle, subscriptionStyle} from '../../style';
import Table from '../../components/table/Table';
import TableFooter from '../../components/subscription/tableFooter';
import SearchHeader from '../../components/subscription/searchHeader';
import {HeaderContainer, OverlayBackground} from '../../components/index';
import {getCustomLabel} from '../../redux/action/get_custom_label_action';
import FilterActionLabel from '../../components/subscription/filterActionLabel';
import Helper from '../../helpers/helper';
import callSimInventory, {
  changeCheckSimInventory,
  changeCheckSimInventoryAllTrue,
  changeCheckSimInventoryAllFalse,
  dataMatcherArray2D,
  setSimInventoryTable,
} from '../../redux/action/get_sim_inventory_action';
import {
  generateArrayFilterParams,
  setSomethingToFilter,
  updateDataFilter,
  updateDataSearchText,
} from '../../redux/action/dynamic_array_filter_action';
import ModalMenuPicker from '../../components/modal/ModalMenuPicker';
import AppliedFilter from '../../components/subscription/appliedFilter';
import dayjs from 'dayjs';
import {colors} from '../../constant/color';
import ModalMapOnly from '../../components/modal/ModalMapOnly';
import lod from 'lodash';

const Subscription = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [firstRender, setFirstRender] = useState(true);
  const [showMenu, setShowMenu] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [mapData, setMapData] = useState({});
  const {data} = useSelector((state) => state.auth_reducer);
  const {
    array_filter,
    loading_array_filter,
    searchText,
    generatedParams,
    applied_filter,
    totalFiltered,
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
  const {imageBase64} = useSelector((state) => state.enterprise_reducer);
  useEffect(() => {
    if (!firstRender) {
      dispatch(
        callSimInventory({
          page_value: 0,
        }),
      );
    } else {
      dispatch(getCustomLabel(navigation));
      dispatch(callSimInventory());
      setFirstRender(false);
    }
    // return () => clearTimeout(timer);
  }, [current_size, dispatch, navigation, searchText, generatedParams]);
  useEffect(() => {
    if (current_params_applied) {
      console.log('params_ada_isi: ' + current_params_applied);
    }
  }, [current_params_applied]);
  return (
    <HeaderContainer
      headerTitle={'Subscription'}
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
                  value={searchText}
                  onSubmitEditing={(e) => dispatch(updateDataSearchText(e))}
                  showMenu={showMenu}
                  onClickColumn={() => setShowMenu((state) => !state)}
                  navigateTo={'SubscriptionFilter'}
                  placeholder={'Search with IMSI, MSISDN, ICCID, Detected IMEI'}
                />
                <AppliedFilter
                  data={applied_filter}
                  onDelete={(e) => {
                    const {formId, typeInput} = e || {};
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
                if (sortBy === '') {
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
              const createLink = `https://xl.dcp.ericsson.net/portal/#/en/${data.customerNo}/subscription-inventory/${imsi}`;
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
        {loading_array_filter ||
          (loading && (
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
              <ActivityIndicator
                size={'large'}
                color={colors.button_color_one}
              />
            </View>
          ))}
      </View>
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
    </HeaderContainer>
  );
};
export default Subscription;
