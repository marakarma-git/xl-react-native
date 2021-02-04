import React, {useEffect} from 'react';
import {View, ScrollView, Text} from 'react-native';
import {subscriptionStyle} from '../../style';
import {HeaderContainer, OverlayBackground} from '../../components/index';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {getCustomLabel} from '../../redux/action/get_custom_label_action';
import AppliedFilter from '../../components/subscription/appliedFilter';
import SearchHeader from '../../components/subscription/searchHeader';
import FilterActionLabel from '../../components/subscription/filterActionLabel';
import TableFooter from '../../components/subscription/tableFooter';

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
          <ScrollView>
            <Text>tengah</Text>
          </ScrollView>
        </View>
        <TableFooter />
      </View>
    </HeaderContainer>
  );
};
export default Subscription;
