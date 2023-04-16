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
import LineChart from './../../components/widget/linechart';
import Orientation from '../../helpers/orientation';

import style from '../../style/home.style';
import {colors} from '../../constant/color';
import FontAwesome from 'react-native-vector-icons/FontAwesome'; 
const DeviceAnalyticPage = ({navigation}) => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth_reducer.data);
  const {imageBase64} = useSelector((state) => state.enterprise_reducer);
 
  const loading = useSelector((state) => state.dashboard_reducer.loading);
  const {access_token} = useSelector((state) => state.auth_reducer?.data) || {};
  const [filteringData, setFilteringData] = useState(null) 
  const [modalVisible, setModalVisible] = useState(false) 
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [valueSelect, setValueSelect] = useState(null);
  const [valueSelectEnterprise, setValueSelectEnterprise] = useState(null);
  const [items, setItems] = useState([]);
  const listItems = useState({item: '1', value:'1'});

  const [open2, setOpen2] = useState(false);
  const [value2, setValue2] = useState(null);
  const [valueSelect2, setValueSelect2] = useState(null);
  const [valueSelectEnterprise2, setValueSelectEnterprise2] = useState(null);
  const [items2, setItems2] = useState([]);
  const listItems2 = useState({item: '1', value:'1'});

  useEffect(() => {
    return navigation.addListener('focus', () => {
      
    });
  }, [dispatch, navigation]);


  return (
    <><View>
      <HeaderContainer
        navigation={navigation}
        headerTitle={'Device Analytics'}
        companyLogo={imageBase64} />
      <ScrollView
        style={{ marginBottom: 120 }}
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
            
            <TouchableOpacity onPress={() => { setModalVisible(!modalVisible); } }
              style={{
                flexDirection: 'row',
                backgroundColor:"#fff",
                width:"100%",
                borderRadius:5,
                paddingVertical:10,
                paddingHorizontal:10,
              }}>
              <FontAwesome name="filter" size={20} color="#707070" />
              <Text style={{ fontSize: 14, marginLeft: 10, color: "#707070" }}>Filter</Text>
            </TouchableOpacity>
          </View>
          <View style={{width:"100%", borderRadius:0,marginTop:18}}>
            <Card style={{borderRadius:0}}>
              <Card.Content style={style.cardContentWrapper}>
                {/* {loading ? (
                  <ActivityIndicator color={colors.main_color} size="large" />
                ) : ( */}
                  <LineChart/>
                {/* )} */}
              </Card.Content>
            </Card>
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
                height: (open || open2) ? 440 : 230,
                shadowColor: "#000",
                shadowOffset: 0,
                shadowOpacity: 0.25,
                shadowRadius: 4,
                elevation: 5}}>
              <Text
                type="bold"
                textAlign="center"
                style={{
                  fontSize: 15,
                  marginBottom: 15,
                  textAlign: "left"
                }}>
                Filter
              </Text>
              <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }}>
                <View style={{width: "48%"}}>
                    <Text
                        type="bold"
                        textAlign="center"
                        style={{
                        fontSize: 12,
                        marginBottom: 5,
                        textAlign: "left"
                        }}>
                        Enterprise Type
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
                </View>
                <View style={{width: "48%"}}>
                    <Text
                        type="bold"
                        textAlign="center"
                        style={{
                        fontSize: 12,
                        marginBottom: 5,
                        textAlign: "left"
                        }}>
                        Enterprise
                    </Text>
                    <DropDownPicker
                        open={open2}
                        value={value2}
                        items={listItems2}
                        setOpen={setOpen2}
                        setValue={setValue2}
                        setItems={setItems2}
                        searchable={true}
                        containerStyle={{width: '100%'}}
                        itemStyle={{justifyContent: 'flex-start'}}
                        dropDownStyle={{backgroundColor: '#ddd',zIndex: 1000, elevation: 1000 }}
                    />
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: (open || open2) ? 240 : 20,
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

export default DeviceAnalyticPage;
