import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {View, ScrollView} from 'react-native';
import {
  HeaderContainer,
  OverlayBackground,
  Text,
  ContentCard,
  FilterCard,
} from '../../components';

// Undestruct
import styles from '../../style/usageAnalytics.style';
import BarChartComponent from '../../components/widget/barchart';

const UsageAnalyticsPage = ({route, navigation}) => {
  const dispatch = useDispatch();
  const {imageBase64} = useSelector((state) => state.enterprise_reducer);
  const widgetList = useSelector((state) => state.dashboard_reducer.widgetList);

  // Data State
  const [topTrafficWidget, setTopTrafficWidget] = useState({});

  useEffect(() => {
    const pageLoad = navigation.addListener('focus', () => {
      const topTrafficWidget = widgetList.filter(
        (widget) => widget.widgetCode === 'Top-Traffic',
      );

      setTopTrafficWidget(topTrafficWidget);
    });

    return pageLoad;
  }, []);

  return (
    <View>
      <HeaderContainer
        navigation={navigation}
        headerTitle={'Usage Analytics'}
        companyLogo={imageBase64}
      />
      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}>
        <View style={styles.cardContainer}>
          <OverlayBackground />
          <View style={styles.cardWrapper}>
            <FilterCard />
            <ContentCard
              loadingContent={topTrafficWidget ? false : true}
              cardContent={
                <BarChartComponent item={topTrafficWidget} filterParams={{}} />
              }
              cardTitle="Top Traffic Statistics"
            />
            <ContentCard cardTitle="Aggregated Traffic" />
            <ContentCard cardTitle="Previous 12 month average" />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default UsageAnalyticsPage;
