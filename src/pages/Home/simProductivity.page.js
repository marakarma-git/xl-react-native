import React, {useState} from 'react';
import {View, ScrollView} from 'react-native';
import {useSelector} from 'react-redux';
import {HeaderContainer, OverlayBackground} from '../../components';
import {Container} from './subscriptionFilter.page';
import {useNavigation} from '@react-navigation/native';
import {subscriptionStyle} from '../../style';
import AppliedFilter from '../../components/subscription/appliedFilter';
import {analyticStyle} from '../../style';
import TableSummary from '../../components/table/tableSummary';
import SimChart from '../../components/simProductivity/simChart.component';

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
              onPressFilter={() => navigation.navigate('simProductivityFilter')}
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
            <SimChart
              widthChart={widthChart}
              data={[
                {
                  label: 'Excess Usage',
                  y: 35.55,
                  dll: 'hai there',
                  percentage: 10,
                },
                {label: 'Normal High', y: 40, dll: 'hai there', percentage: 10},
                {label: 'Normal Low', y: 55, dll: 'hai there', percentage: 10},
              ]}
              dataColor={['#24395B', '#134FAD', '#0266FF']}
              onPressPie={(e) => alert(JSON.stringify(e, null, 2))}
            />
            <TableSummary data={[]} />
          </Container>
        </ScrollView>
      </View>
    </HeaderContainer>
  );
};

export default SimProductivityPage;
