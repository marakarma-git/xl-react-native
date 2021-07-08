import React, {useEffect, useState} from 'react';
import {View, ScrollView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {HeaderContainer, OverlayBackground, Text} from '../../components';
import {Container} from './subscriptionFilter.page';
import {useNavigation} from '@react-navigation/native';
import {subscriptionStyle} from '../../style';
import AppliedFilter from '../../components/subscription/appliedFilter';
import {analyticStyle} from '../../style';
import TableSummary from '../../components/table/tableSummary';
import SimChart from '../../components/simProductivity/simChart.component';
import Loading from '../../components/loading';
import {simGetChart} from '../../redux/action/sim_productivity_filter_action';

const SimProductivityPage = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [widthChart, setWidthChart] = useState(0);
  const {imageBase64} = useSelector((state) => state.enterprise_reducer);
  const {
    loading,
    errorText,
    dataChartSim,
    dataChartColor,
    appliedFilter,
    generatedParams,
  } = useSelector((state) => state.sim_productivity_filter_reducer);
  useEffect(() => {
    dispatch(simGetChart());
  }, [generatedParams]);
  return (
    <HeaderContainer
      headerTitle={'Sim Productivity'}
      style={{flex: 1}}
      companyLogo={imageBase64}>
      <View style={[subscriptionStyle.containerBackground]}>
        <ScrollView style={{backgroundColor: 'white'}}>
          <OverlayBackground />
          {!loading && (
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
                  navigation.navigate('simProductivityFilter')
                }
                style={{marginLeft: 0, flex: 1}}
                data={appliedFilter}
              />
              <SimChart
                widthChart={widthChart}
                data={dataChartSim}
                dataColor={dataChartColor}
                onPressPie={(e) => alert(JSON.stringify(e, null, 2))}
              />
              <TableSummary data={dataChartSim} />
            </Container>
          )}
        </ScrollView>
        {loading && <Loading />}
      </View>
    </HeaderContainer>
  );
};

export default SimProductivityPage;
