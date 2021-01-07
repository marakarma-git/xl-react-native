import React, {useState} from 'react';
import {Card, Title} from 'react-native-paper';
import {View, Text, ScrollView, Image} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {useSelector} from 'react-redux';
import style from '../../style/home.style';
import {framerBanner} from '../../assets/images';
import {HeaderContainer, OverlayBackground} from '../../components/index';

const LandingPage = ({navigation}) => {
  const userData = useSelector((state) => state.auth_reducer.data);
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselItems = [
    {
      title: 'Item 1',
      text: 'Text 1',
    },
    {
      title: 'Item 2',
      text: 'Text 2',
    },
    {
      title: 'Item 3',
      text: 'Text 3',
    },
    {
      title: 'Item 4',
      text: 'Text 4',
    },
  ];
  const pagination = () => {
    return (
      <Pagination
        dotsLength={carouselItems.length}
        activeDotIndex={activeIndex}
        containerStyle={{backgroundColor: 'white'}}
        dotStyle={style.paginationDot}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    );
  };
  const renderItem = ({item, index}) => {
    return (
      <View style={style.cellItem}>
        <Image source={framerBanner} style={style.imageCellItem} />
      </View>
    );
  };
  return (
    <View>
      <HeaderContainer navigation={navigation} />
      <ScrollView>
        <View style={{height: '100%'}}>
          <OverlayBackground />
          <Card style={[style.cardSection]}>
            <Card.Content style={{marginBottom: 10}}>
              <Title>
                Hi!{' '}
                {userData.principal.firstName +
                  ' ' +
                  userData.principal.lastName}
              </Title>
            </Card.Content>
            <View style={{alignItems: 'center', backgroundColor: '#002DBB'}}>
              <Carousel
                style={{margin: 0, padding: 0}}
                layout={'default'}
                data={carouselItems}
                sliderWidth={300}
                itemWidth={500}
                renderItem={renderItem}
                onSnapToItem={(index) => setActiveIndex(index)}
                loop
                scrollEnabled
                autoplay
              />
            </View>
            {pagination()}
            <View style={style.tradeMark}>
              <Text style={{fontWeight: 'bold'}}>
                {'IoT SIMCare Mobile version 4.0'}
              </Text>
            </View>
          </Card>
        </View>
      </ScrollView>
    </View>
  );
};
export default LandingPage;
