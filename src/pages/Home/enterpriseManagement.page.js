import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import Table from '../../components/table/Table';
import {HeaderContainer, OverlayBackground, Text} from '../../components';
import {useDispatch, useSelector} from 'react-redux';
import Loading from '../../components/loading';
import {subscriptionStyle} from '../../style';
import {
  getEnterpriseList,
  enterpriseManagementHideShow,
} from '../../redux/action/enterprise_management_action';

const EnterpriseManagement = ({navigation}) => {
  const dispatch = useDispatch();
  const {imageBase64} = useSelector((state) => state.enterprise_reducer);
  const {dataHeaderEnterprise} = useSelector(
    (state) => state.enterprise_management_header_array_reducer,
  );
  const {loading, data_enterprise_generated} = useSelector(
    (state) => state.enterprise_management_get_enterprise_reducer,
  );
  useEffect(() => {
    const pageLoad = navigation.addListener('focus', () => {
      dispatch(getEnterpriseList());
    });

    return pageLoad;
  }, [navigation]);
  return (
    <HeaderContainer
      headerTitle={'Enterprise Management'}
      style={{flex: 1}}
      companyLogo={imageBase64}>
      <View style={subscriptionStyle.containerBackground}>
        <Table
          isScrollView={true}
          dataHeader={dataHeaderEnterprise}
          dataTable={data_enterprise_generated}
          onPressTreeArrow={(e) =>
            dispatch(enterpriseManagementHideShow(e.item.enterpriseId))
          }
        />
        {loading && <Loading />}
      </View>
    </HeaderContainer>
  );
};
export default EnterpriseManagement;
