import React, {useState} from 'react';
import {View, ScrollView} from 'react-native';
import {useSelector} from 'react-redux';
import {HeaderContainer, OverlayBackground} from '../../components';
import {Container} from './subscriptionFilter.page';
import {useNavigation} from '@react-navigation/native';
import {subscriptionStyle} from '../../style';
import {VictoryLabel, VictoryPie} from 'victory-native';
import Text from '../../components/global/text';
import Svg from 'react-native-svg';
import AppliedFilter from '../../components/subscription/appliedFilter';
import {analyticStyle} from '../../style';
import PropTypes from 'prop-types';
import Loading from '../../components/loading';
import TableSummary from '../../components/table/tableSummary';

const SimProductivityPage = () => {
  const navigation = useNavigation();
  const [widthChart, setWidthChart] = useState(0);
  const {imageBase64} = useSelector((state) => state.enterprise_reducer);
  return (
    <HeaderContainer
      headerTitle={'Sim Productivity'}
      style={{flex: 1}}
      companyLogo={imageBase64}>
      <View style={[subscriptionStyle.containerBackground]}>
        <ScrollView style={{backgroundColor: 'white'}}>
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
              onPressFilter={() =>
                navigation.navigate('SubscriptionFilter', {key: true})
              }
              style={{marginLeft: 0, flex: 1}}
              data={[
                {
                  config: {
                    label: 'hai',
                  },
                  value: 'there',
                },
              ]}
            />
            <Svg width={widthChart - widthChart * 0.1} height={widthChart}>
              <VictoryPie
                colorScale={['#24395B', '#134FAD', '#0266FF']}
                width={widthChart - widthChart * 0.1}
                height={widthChart}
                padding={analyticStyle.paddingChart}
                events={[
                  {
                    target: 'data',
                    eventHandlers: {
                      onPressIn: () => {
                        return [
                          {
                            target: 'data',
                            mutation: ({slice, ...props}) => {
                              alert(JSON.stringify(slice, null, 2));
                              // navigation.navigate('Subscription', {key: true});
                              console.log(JSON.stringify(props, null, 2));
                              return null;
                            },
                          },
                        ];
                      },
                    },
                  },
                ]}
                data={[
                  {
                    x: 'Excess Usage',
                    y: 35.55,
                    dll: 'hai there',
                    percentage: 10,
                  },
                  {x: 'Normal High', y: 40, dll: 'hai there', percentage: 10},
                  {x: 'Normal Low', y: 55, dll: 'hai there', percentage: 10},
                ]}
                labelComponent={
                  <VictoryLabel
                    dy={15}
                    dx={10}
                    text={({datum}) => [
                      `${datum.x}`,
                      `(${datum.percentage}%)  `,
                    ]}
                    verticalAnchor={'middle'}
                    style={analyticStyle.labelChart}
                  />
                }
              />
            </Svg>
            <TableSummary data={[]} />
          </Container>
        </ScrollView>
      </View>
    </HeaderContainer>
  );
};

export default SimProductivityPage;
