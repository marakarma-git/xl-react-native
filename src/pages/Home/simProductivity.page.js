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
import {device_height} from '../../constant/config';
import AppliedFilter from '../../components/subscription/appliedFilter';

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
            style={{
              marginTop: 16,
              borderWidth: 1,
              borderRadius: 6,
              elevation: 0,
              borderColor: '#8D8D8D',
            }}
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
                width={widthChart - widthChart * 0.1}
                height={widthChart}
                padding={{top: 105, bottom: 105}}
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
                  {x: 'Excess Usage', y: 35, dll: 'hai there', percentage: 10},
                  {x: 'Normal High', y: 40, dll: 'hai there', percentage: 10},
                  {x: 'Normal Low', y: 55, dll: 'hai there', percentage: 10},
                ]}
                // style={{labels: {padding: 30}}}
                labelComponent={
                  <VictoryLabel
                    dy={15}
                    dx={10}
                    text={({datum}) => [
                      `${datum.x}`,
                      `(${datum.percentage}%)  `,
                    ]}
                    verticalAnchor={'middle'}
                    style={{
                      fontSize: 12,
                      fontWeight: 'bold',
                    }}
                  />
                }
              />
            </Svg>
            {[
              {
                type: 'header',
              },
              {
                type: 'usage',
                label: 'Excess Usage',
                value: '>100%',
              },
              {
                type: 'usage',
                label: 'Excess Usage',
                value: '>100%',
              },
              {
                type: 'usage',
                label: 'Excess Usage',
                value: '>100%',
              },
            ].map(({type, label, value}) => {
              return (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  {type === 'header' ? (
                    <>
                      <Text fontType={'bold'} style={{fontSize: 16}}>
                        Productivity Level
                      </Text>
                      <Text>
                        %{' '}
                        <Text fontType={'bold'} style={{fontSize: 16}}>
                          of Quota usage
                        </Text>
                      </Text>
                    </>
                  ) : (
                    <>
                      <View
                        style={{
                          flex: 1,
                          justifyContent: 'center',
                          alignItems: 'center',
                          flexDirection: 'row',
                          marginTop: 12,
                        }}>
                        <View
                          style={{
                            width: 16,
                            height: 16,
                            backgroundColor: 'tomato',
                            padding: 5,
                            borderRadius: 16,
                            marginRight: 4,
                          }}>
                          <View
                            style={{
                              flex: 1,
                              backgroundColor: 'white',
                              borderRadius: 16,
                            }}
                          />
                        </View>
                        <Text style={{flex: 1}} fontType={'bold'}>
                          {label}
                        </Text>
                      </View>
                      <View
                        style={{
                          flex: 1,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <Text>{value}</Text>
                      </View>
                    </>
                  )}
                </View>
              );
            })}
          </Container>
        </ScrollView>
      </View>
    </HeaderContainer>
  );
};

export default SimProductivityPage;
