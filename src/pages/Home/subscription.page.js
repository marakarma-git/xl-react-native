import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {subscriptionStyle} from '../../style';
import Table from '../../components/table/Table';
import TableFooter from '../../components/subscription/tableFooter';
import SearchHeader from '../../components/subscription/searchHeader';
import {HeaderContainer, OverlayBackground} from '../../components/index';
import {getCustomLabel} from '../../redux/action/get_custom_label_action';
import FilterActionLabel from '../../components/subscription/filterActionLabel';
import callSimInventory, {
  changeCheckSimInventory,
  changeCheckSimInventoryAllTrue,
  changeCheckSimInventoryAllFalse,
  dataMatcherArray2D,
  setSimInventoryTable,
} from '../../redux/action/get_sim_inventory_action';
import {
  updateDataFilter,
  updateDataSearchText,
} from '../../redux/action/dynamic_array_filter_action';
import ModalMenuPicker from '../../components/modal/ModalMenuPicker';

const Subscription = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [firstRender, setFirstRender] = useState(true);
  const [showMenu, setShowMenu] = useState(false);
  const {array_filter, loading_array_filter, searchText} = useSelector(
    (state) => state.dynamic_array_filter_reducer,
  );
  const {
    loading,
    data_sim_inventory_table,
    data_sim_inventory,
    current_size,
  } = useSelector((state) => state.get_sim_inventory_reducer);
  useEffect(() => {
    const timer = setTimeout(() => {
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
    }, 500);
    return () => clearTimeout(timer);
  }, [current_size, dispatch, firstRender, navigation, searchText]);
  return (
    <HeaderContainer headerTitle={'Subscription'}>
      <View style={subscriptionStyle.containerBackground}>
        <OverlayBackground />
        <SearchHeader
          value={searchText}
          onChangeText={(e) => dispatch(updateDataSearchText(e))}
          showMenu={showMenu}
          onClickColumn={() => setShowMenu((state) => !state)}
          loading={loading_array_filter || loading}
        />
        {/*<AppliedFilter data={[{type: 'abc', title: '123'}]} />*/}
        <FilterActionLabel />
        <Table
          dataHeader={array_filter}
          dataTable={data_sim_inventory_table}
          loading={loading}
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
        />
        <TableFooter
          totalPage={50}
          currentPage={2}
          onChangePerPage={(e) => {
            const {value} = e || {};
            dispatch(
              callSimInventory({
                size_value: value,
              }),
            );
          }}
          perPageValue={current_size}
        />
      </View>
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
