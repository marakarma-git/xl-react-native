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
        <View style={{flex: 1, backgroundColor: 'tomato'}}>
          <TableCellViewMap />
        </View>
        <TableFooter />
      </View>
    </HeaderContainer>
  );
};
export default Subscription;
