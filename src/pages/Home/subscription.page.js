import React, {useEffect, useState} from 'react';
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
import {dataMatcherArray2D} from '../../redux/action/get_sim_inventory_action';
import exampleDataLisSimSubscription from '../../backup_code/example_data_list_sim_subscription';

const Subscription = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [local, setLocal] = useState([]);
  const {array_filter} = useSelector(
    (state) => state.dynamic_array_filter_reducer,
  );
  useEffect(() => {
    dispatch(getCustomLabel(navigation));
  }, [dispatch, navigation]);
  useEffect(() => {
    const generate = dataMatcherArray2D(
      exampleDataLisSimSubscription,
      array_filter,
    );
    setLocal(generate);
  }, [array_filter]);
  return (
    <HeaderContainer headerTitle={'Subscription'}>
      <View style={subscriptionStyle.containerBackground}>
        <OverlayBackground />
        <SearchHeader />
        <AppliedFilter data={[{type: 'abc', title: '123'}]} />
        <FilterActionLabel />
        <Table dataHeader={array_filter} dataTable={local} />
        <TableFooter totalPage={50} currentPage={2} />
      </View>
    </HeaderContainer>
  );
};
export default Subscription;
