import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {TouchableOpacity, View, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {subscriptionStyle} from '../../style';
import Table from '../../components/table/Table';
import TableFooter from '../../components/subscription/tableFooter';
import SearchHeader from '../../components/subscription/searchHeader';
import AppliedFilter from '../../components/subscription/appliedFilter';
import {HeaderContainer, OverlayBackground} from '../../components/index';
import {getCustomLabel} from '../../redux/action/get_custom_label_action';
import FilterActionLabel from '../../components/subscription/filterActionLabel';
import callSimInventory, {
  changeCheckSimInventory,
  changeCheckSimInventoryAllTrue,
  changeCheckSimInventoryAllFalse,
  dataMatcherArray2D,
  setSimInventoryTable,
  getSimInventoryLoading,
  getSimInventoryLoadingFalse,
} from '../../redux/action/get_sim_inventory_action';
import {updateDataFilter} from '../../redux/action/dynamic_array_filter_action';
import ModalMenuPicker from '../../components/modal/ModalMenuPicker';

const Subscription = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [showMenu, setShowMenu] = useState(false);
  const {array_filter, loading_array_filter} = useSelector(
    (state) => state.dynamic_array_filter_reducer,
  );
  const {loading, data_sim_inventory_table, data_sim_inventory} = useSelector(
    (state) => state.get_sim_inventory_reducer,
  );
  useEffect(() => {
    dispatch(getCustomLabel(navigation));
    dispatch(callSimInventory());
  }, [dispatch, navigation]);
  return (
    <HeaderContainer headerTitle={'Subscription'}>
      <View style={subscriptionStyle.containerBackground}>
        <OverlayBackground />
        <SearchHeader
          showMenu={showMenu}
          onClickColumn={() => setShowMenu((state) => !state)}
          loading={loading_array_filter || loading}
        />
        <AppliedFilter data={[{type: 'abc', title: '123'}]} />
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
        <TableFooter totalPage={50} currentPage={2} />
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
