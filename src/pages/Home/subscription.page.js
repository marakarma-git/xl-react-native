import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {subscriptionStyle} from '../../style';
import Table from '../../components/table/Table';
import TableFooter from '../../components/subscription/tableFooter';
import SearchHeader from '../../components/subscription/searchHeader';
import AppliedFilter from '../../components/subscription/appliedFilter';
import {HeaderContainer, OverlayBackground} from '../../components/index';
import {getCustomLabel} from '../../redux/action/get_custom_label_action';
import FilterActionLabel from '../../components/subscription/filterActionLabel';
import callSimInventory from '../../redux/action/get_sim_inventory_action';

const Subscription = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {array_filter, loading_array_filter} = useSelector(
    (state) => state.dynamic_array_filter_reducer,
  );
  const {loading, data_sim_inventory_table} = useSelector(
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
        <SearchHeader loading={loading_array_filter} />
        <AppliedFilter data={[{type: 'abc', title: '123'}]} />
        <FilterActionLabel />
        <Table
          dataHeader={array_filter}
          dataTable={data_sim_inventory_table}
          loading={loading}
          onPressCheckCell={(e) => alert(JSON.stringify(e, null, 2))}
        />
        <TableFooter totalPage={50} currentPage={2} />
      </View>
    </HeaderContainer>
  );
};
export default Subscription;
