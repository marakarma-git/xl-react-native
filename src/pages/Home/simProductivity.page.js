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
import {
  simGetChart,
  simProductivityDynamicResetSelectedValue,
  simProductivityGenerateParams,
} from '../../redux/action/sim_productivity_filter_action';
import {getCustomLabel} from '../../redux/action/get_custom_label_action';

const SimProductivityPage = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [firstRender, setFirstRender] = useState(true);
  const [widthChart, setWidthChart] = useState(0);
  const {imageBase64} = useSelector((state) => state.enterprise_reducer);
  const {
    dataHeader,
    loading,
    errorText,
    dataChartSim,
    dataChartColor,
    appliedFilter,
    generatedParams,
  } = useSelector((state) => state.sim_productivity_filter_reducer);
  useEffect(() => {
    dispatch(simGetChart());
    if (firstRender) {
      dispatch(getCustomLabel(navigation));
      setFirstRender(false);
    }
  }, [generatedParams]);
  const handleToSubscription = ({label}) => {
    navigation.navigate('Subscription', {
      navigationFrom: 'simProductivity',
      dataNavigation: {
        arrayNavigation: [
          ...dataHeader,
          {
            formIdTo: 'sim-productivity-percentage-group-params-only-drop-down',
            value: {
              label: label,
              value: label,
            },
          },
        ],
      },
    });
  };
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
                  navigation.navigate('SimProductivityFilterPage')
                }
                style={{marginLeft: 0, flex: 1}}
                data={appliedFilter}
                onDelete={(e) => {
                  const {formId} = e || {};
                  dispatch(simProductivityDynamicResetSelectedValue({formId}));
                  dispatch(simProductivityGenerateParams());
                }}
              />
              <Text>{`${errorText && `Error: ${errorText}`}`}</Text>
              <SimChart
                widthChart={widthChart}
                data={dataChartSim}
                dataColor={dataChartColor}
                onPressPie={({datum}) => {
                  handleToSubscription({
                    value: datum.value,
                    label: datum.label,
                  });
                }}
              />
              <TableSummary
                data={dataChartSim}
                onPress={({label}) => {
                  handleToSubscription({
                    label,
                  });
                }}
              />
            </Container>
          )}
        </ScrollView>
        {loading && <Loading />}
      </View>
    </HeaderContainer>
  );
};

export default SimProductivityPage;
