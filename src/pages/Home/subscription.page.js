import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {subscriptionStyle} from '../../style';
import TableFooter from '../../components/subscription/tableFooter';
import SearchHeader from '../../components/subscription/searchHeader';
import AppliedFilter from '../../components/subscription/appliedFilter';
import {HeaderContainer, OverlayBackground} from '../../components/index';
import {getCustomLabel} from '../../redux/action/get_custom_label_action';
import FilterActionLabel from '../../components/subscription/filterActionLabel';
import TableCellViewMap from '../../components/table/tableCellViewMap';
import Table from '../../components/table/Table';

const Subscription = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  useEffect(() => {
    dispatch(getCustomLabel(navigation));
  }, [dispatch, navigation]);
  return (
    <HeaderContainer navigation={navigation} headerTitle={'Subscription'}>
      <View style={subscriptionStyle.containerBackground}>
        <OverlayBackground />
        <SearchHeader />
        <AppliedFilter data={[{type: 'abc', title: '123'}]} />
        <FilterActionLabel />
        <Table dataHeader={dataTableHeaderDummy} dataTable={dataTableDummy} />
        <TableFooter />
      </View>
    </HeaderContainer>
  );
};
export default Subscription;
const dataTableHeaderDummy = [
  {
    type: 'TableCellHeaderOptionCheckBox',
    config: {
      label: 'IMSI',
      isTouchable: true,
      width: 200,
    },
    dataOption: [
      {
        value: 'Select all',
        label: 'select_all',
      },
      {
        value: 'Select all local',
        label: 'select_all_local',
      },
      {
        value: 'Deselect all',
        label: 'deselect_all',
      },
      {
        value: 'Deselect all local',
        label: 'deselect_all_local',
      },
    ],
    shown: true,
  },
  {
    type: 'TableCellHeaderAscDesc',
    config: {
      label: 'State Lock',
    },
    shown: true,
  },
  {
    type: 'TableCellHeaderAscDesc',
    config: {
      label: 'Detected IMEI',
      width: 200,
    },
    shown: true,
  },
  {
    type: 'TableCellHeader',
    config: {
      label: 'Peta',
    },
    shown: true,
  },
];
const dataTableDummy = [
  [
    {
      type: 'TableCellCheckBox',
      config: {
        label: 'Table Check Box',
        isTouchable: true,
        width: 200,
      },
      otherInformation: {
        other_id: '12321321321321',
        other_name: 'hello world',
      },
    },
    {
      type: 'TableCellStatus',
      config: {
        label: 'Table Status',
        ballColor: 'yellow',
      },
      otherInformation: {
        other_id: 'table_status_123',
        other_name: 'table_status',
      },
    },
    {
      type: 'TableCellText',
      config: {
        label: 'n321d9k129dk21',
        width: 200,
      },
    },
    {
      type: 'TableCellViewMap',
      otherInformation: {
        other_id: 'dummy_123',
        other_name: 'its just dummy button',
      },
    },
  ],
];
