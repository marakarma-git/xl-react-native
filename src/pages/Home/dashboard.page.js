import React, {useEffect, useState} from 'react';
import Helper from '../../helpers/helper';
import {useDispatch, useSelector} from 'react-redux';
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  View,
	Modal,
  TouchableOpacity,
} from 'react-native';
import Text from '../../components/global/text';
import {Card, Headline} from 'react-native-paper';
import {
  HeaderContainer,
  OverlayBackground,
  WidgetStore,
} from '../../components/index';
import DropDownPicker from 'react-native-dropdown-picker';
import {
  getDashboardSummary,
  getWidgetList,
  getEnterpriseList,
  resetTopTrafficStatistics,
  requestWidgetData,
  requestWidgetDataFinance,
} from '../../redux/action/dashboard_action';
import Orientation from '../../helpers/orientation';

import style from '../../style/home.style';
import {colors} from '../../constant/color';
import FontAwesome from 'react-native-vector-icons/FontAwesome'; 
const DashboardPage = ({navigation}) => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth_reducer.data);
  const widgetList = useSelector((state) => state.dashboard_reducer.widgetList);
  const {imageBase64} = useSelector((state) => state.enterprise_reducer);
  const summaryDashboardData = useSelector(
    (state) => state.dashboard_reducer.summaryData,
  );
  const loading = useSelector((state) => state.dashboard_reducer.loading);
  const {access_token} = useSelector((state) => state.auth_reducer?.data) || {};
  const [filteringData, setFilteringData] = useState(null) 
  const [modalVisible, setModalVisible] = useState(false) 
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [valueSelect, setValueSelect] = useState(null);
  const [valueSelectEnterprise, setValueSelectEnterprise] = useState(null);
  const [items, setItems] = useState([]);
  const listItems = useSelector((state) => state.dashboard_reducer.enterpriseList);
  const filterParams = {}
  const renderItem = ({item, index}) => {
    return (
      <View
        style={[
          style.itemSeparatorCard,
          {
            borderLeftWidth: index % 2 === 0 ? 0 : 0.2,
            borderBottomWidth: index === 0 || index === 1 ? 0.2 : 0,
          },
        ]}>
        <Text
          numberOfLines={1}
          adjustsFontSizeToFit
          style={{
            fontSize: Orientation.getWidth() * 0.033,
            marginVertical: '5%',
          }}>
          {item.title}
        </Text>
        <Headline style={{fontWeight: 'bold', color: '#1139BF'}}>
          {item.resultId === 'totalaggregatedtraffic'
            ? Helper.formatBytes(item.value)
            : Helper.numberFormat(item.value, '.')}
        </Headline>
      </View>
    );
  };

  useEffect(() => {
    return navigation.addListener('focus', () => {
      dispatch(getDashboardSummary(access_token, {param1: valueSelect}));
      dispatch(getWidgetList());
      dispatch(resetTopTrafficStatistics());
      dispatch(getEnterpriseList(access_token));
    });
  }, [dispatch, navigation]);

  const changeParams = () =>{
    let splitarr = value.split(' - ')
    setValueSelect(splitarr[0])
    setValueSelectEnterprise(splitarr[1])
    setFilteringData(splitarr[2])
    dispatch(getDashboardSummary(access_token, {param1: splitarr[0]}));
    dispatch(resetTopTrafficStatistics());
    widgetList.map((item, index) => {
      if (item.widgetCode == 'SIM-Statistics'){
          return dispatch(requestWidgetData(
            userData.access_token,
            item,
            {param1: splitarr[0]},
            (type = 'sim'),
          ))
      }else if(item.widgetCode == 'Top-Traffic'){
          return dispatch(requestWidgetData(
            userData.access_token,
            item,
            {param1: splitarr[0], param3: 2, param4: 10},
            (type = 'top'),
          ))
      }else if(item.widgetCode == 'Financial-Report'){
        return dispatch(requestWidgetDataFinance(userData.access_token, item, {param1: splitarr[1]}, 'finance', userData.principal.username))
      }else if(item.widgetCode == 'custom-statistics'){
        return dispatch(requestWidgetData(
            userData.access_token,
            item,
            {param1: splitarr[0]},
            (type = 'custom'),
          ))
      }else if(item.widgetCode == 'Aggregated-Traffic'){
        //    return <Aggregate item={item} filterParams={{}} />; 
      }else if(item.widgetCode == 'Device-Network-Statistics'){
          return dispatch(requestWidgetData(
            userData.access_token,
            item,
            {param1: splitarr[0]},
            (type = 'devicepopulation'),
          ))
      }else if(item.widgetCode == 'Top-Device'){
          return dispatch(requestWidgetData(
            userData.access_token,
            item,
            {param1: splitarr[0]},
            (type = 'topdevice'),
          ),)
      }
    })
    setModalVisible(!modalVisible)
  }

  const resetParams = () =>{
    setValueSelect(null)
    setValue(null)
    setValueSelectEnterprise(null)
    setFilteringData(null)
    dispatch(getDashboardSummary(access_token, {}));
    dispatch(resetTopTrafficStatistics());
    widgetList.map((item, index) => {
      if (item.widgetCode == 'SIM-Statistics'){
          return dispatch(requestWidgetData(
            userData.access_token,
            item,
            {},
            (type = 'sim'),
          ))
      }else if(item.widgetCode == 'Top-Traffic'){
          return dispatch(requestWidgetData(
            userData.access_token,
            item,
            {param3: 2, param4: 10},
            (type = 'top'),
          ))
      }else if(item.widgetCode == 'Financial-Report'){
        return dispatch(requestWidgetDataFinance(userData.access_token, item, {}, 'finance', userData.principal.username))
      }else if(item.widgetCode == 'custom-statistics'){
        return dispatch(requestWidgetData(
            userData.access_token,
            item,
            {},
            (type = 'custom'),
          ))
      }else if(item.widgetCode == 'Aggregated-Traffic'){
        //    return <Aggregate item={item} filterParams={{}} />; 
      }else if(item.widgetCode == 'Device-Network-Statistics'){
          return dispatch(requestWidgetData(
            userData.access_token,
            item,
            {},
            (type = 'devicepopulation'),
          ))
      }else if(item.widgetCode == 'Top-Device'){
          return dispatch(requestWidgetData(
            userData.access_token,
            item,
            {},
            (type = 'topdevice'),
          ),)
      }
    })
  }

  return (
    <><View>
      <HeaderContainer
        navigation={navigation}
        headerTitle={'Dashboard'}
        companyLogo={imageBase64} />
      <ScrollView
        style={{ marginBottom: 130 }}
        showsVerticalScrollIndicator={false}>
        <View style={{ height: '100%', alignItems: 'center' }}>
          <OverlayBackground />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'stretch',
              justifyContent: 'space-between',
              marginTop: 20,
              width: "100%",
              paddingHorizontal: 15
            }}>
            {filteringData ?
              <TouchableOpacity
                onPress={() => resetParams()}
                style={{
                  backgroundColor: '#B3D335',
                  borderRadius: 10,
                  paddingHorizontal: 6,
                  paddingVertical: 3,
                }}>
                <Text style={{ color: '#fff' }}>
                  {filteringData ? filteringData : ''} | X
                </Text>
              </TouchableOpacity>
              :
              <View></View>
            }
            <TouchableOpacity onPress={() => { setModalVisible(!modalVisible); } }
              style={{
                flexDirection: 'row',
              }}>
              <FontAwesome name="filter" size={24} color="#fff" />
              <Text style={{ fontSize: 16, marginLeft: 10, color: "#fff" }}>Filter</Text>
            </TouchableOpacity>
          </View>
          <View style={[style.cardWrapper]}>
            <Card style={[style.cardSection, { marginTop: '3%' }]}>
              <Card.Content style={style.cardContentWrapper}>
                {loading ? (
                  <ActivityIndicator color={colors.main_color} size="large" />
                ) : (
                  <FlatList
                    data={summaryDashboardData}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.title}
                    numColumns={2}
                    columnWrapperStyle={style.cardContentRow} />
                )}
              </Card.Content>
            </Card>
            <View>{widgetList && <WidgetStore widgetList={widgetList} param1={valueSelect}/>}</View>
          </View>
        </View>
      </ScrollView>
    </View><Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      >
        <View
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "#00000030",
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
          activeOpacity={(0, 1)}>
          <View style={{
              alignItems: "center",
              position:"relative",
              marginTop: 22}}>
            <View style={{margin: 20,
                backgroundColor: '#fff',
                borderRadius: 5,
                paddingHorizontal: 20,
                paddingVertical: 24,
                height:open ? 390 : 200,
                shadowColor: "#000",
                shadowOffset: 0,
                shadowOpacity: 0.25,
                shadowRadius: 4,
                elevation: 5}}>
              <Text
                type="semiBold"
                textAlign="center"
                style={{
                  fontSize: 15,
                  marginBottom: 15,
                  textAlign: "left"
                }}>
                Enterprise
              </Text>
              <DropDownPicker
                open={open}
                value={value}
                items={listItems}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                searchable={true}
                containerStyle={{width: '100%'}}
                itemStyle={{justifyContent: 'flex-start'}}
                dropDownStyle={{backgroundColor: '#ddd',zIndex: 1000, elevation: 1000 }}
              />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: open? 210 : 20,
                }}>
                <TouchableOpacity
                  onPress={() => setModalVisible(!modalVisible)}
                  style={{
                    backgroundColor: '#BACAD3',
                    borderRadius: 5,
                    textAlign: 'center',
                    width: "45%",
                    height: 50,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: "5%",
                    shadowColor: '#999',
                  }}>
                  <Text
                    textAlign="center"
                    style={{
                      fontFamily: 'RobotoMedium',
                      fontSize: 14,
                      color: '#fff',
                    }}>
                    Cancel
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => changeParams()}
                  style={{
                    backgroundColor: '#165096',
                    borderRadius: 5,
                    textAlign: 'center',
                    width: "45%",
                    height: 50,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginLeft: "5%",
                    shadowColor: '#999'
                  }}>
                  <Text
                    textAlign="center"
                    style={{
                      fontSize: 14,
                      color: '#fff',
                    }}>
                    Apply Changes
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal></>
  );
};

export default DashboardPage;
