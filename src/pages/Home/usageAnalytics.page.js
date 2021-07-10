import React, {useEffect, useState} from 'react';
import {Container} from './subscriptionFilter.page';
import {useDispatch, useSelector} from 'react-redux';
import {analyticStyle, subscriptionStyle} from '../../style';
import {ActivityIndicatorScrollView, View, ScrollView} from 'react-native';
import {Card, Headline} from 'react-native-paper';
import {
  HeaderContainer,
  OverlayBackground,
  WidgetStore,
  Text
} from '../../components';

// Undestruct
import Helper from '../../helpers/helper';
import AppliedFilter from '../../components/subscription/appliedFilter';

const UsageAnalyticsPage = ({navigation}) => {
  const dispatch = useDispatch();
  const [widthChart, setWidthChart] = useState(0);
  const {imageBase64} = useSelector((state) => state.enterprise_reducer);

  return (
    <View>
      <HeaderContainer
        navigation={navigation}
        headerTitle={'Usage Analytics'}
        companyLogo={imageBase64}
      />
      <ScrollView
        style={{marginBottom: 130}}
        showsVerticalScrollIndicator={false}>
        <View style={[subscriptionStyle.containerBackground]}>
          <OverlayBackground />
          <Container
            style={analyticStyle.container}
            onLayout={({nativeEvent}) => {
              const {layout} = nativeEvent || {};
              const {width} = layout || {};
              setWidthChart(width);
            }}>
            <AppliedFilter
              withFilterButton
              onPressFilter={() => navigation.navigate('simProductivityFilter')}
              style={{marginLeft: 0, flex: 1}}
              data={[
                {
                  config: {
                    label: 'Enterprise',
                  },
                  value: 'Company A',
                },
              ]}
            />
            
          </Container>
        </View>
      </ScrollView>
    </View>
  );
};

export default UsageAnalyticsPage;
