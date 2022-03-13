import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import {ButtonLabelComponent, Text} from '../index';
import {Image} from 'react-native';
import {color_theme_one} from '../../constant/color';
import {TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import styles from '../../style/reatimeDiagnosticStyle';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  realtimeDiagnosticeHideUnhideMenu,
  realtimeDiagnosticFixLoading,
  realtimeDiagnosticFixStatus,
} from '../../redux/action/realtime_diagnostic_action';

const ViewInformationComponent = (props) => {
  const dispatch = useDispatch();
  const {listInformation, isFixStatusDisabled} = props;
  const {fixLoading} = useSelector(
    (state) => state.realtime_diagnostic_reducer,
  );
  const renderList = () =>
    listInformation.map((list, index) => (
      <>
        <View
          style={[
            styles.viewInformationList,
            styles.rightBorder,
            {
              borderBottomWidth: list.isActionEnable
                ? 1
                : index === listInformation.length - 1
                ? 0
                : 1,
            },
          ]}>
          <Image style={styles.viewInformationIcon} source={list.icon} />
          <Text fontType="semi-bold" style={styles.viewInformationTitle}>
            {list.title}
          </Text>
        </View>
        <View
          style={[
            styles.viewInformationList,
            {
              borderBottomWidth: list.isActionEnable
                ? 1
                : index === listInformation.length - 1
                ? 0
                : 1,
            },
          ]}>
          {list.isActionEnable ? (
            <View style={styles.buttonFixContainer}>
              <View style={styles.buttonFixTextContainer}>
                <Text
                  style={[
                    styles.viewInformationText,
                    {
                      color: list.isActionEnable
                        ? color_theme_one.red
                        : 'black',
                    },
                  ]}>
                  {list.value}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() =>
                  dispatch(realtimeDiagnosticeHideUnhideMenu(list.field))
                }
                style={styles.arrowButton}>
                <AntDesign name={list.buttonArrow} size={16} color="black" />
              </TouchableOpacity>
            </View>
          ) : (
            <Text
              style={[
                styles.viewInformationText,
                {color: list.isActionEnable ? color_theme_one.red : 'black'},
              ]}>
              {list.value}
            </Text>
          )}
        </View>
        {list.isActionEnable && list.isCollapse && (
          <View
            style={[
              styles.viewInformationList,
              styles.viewInformationListFull,
              {
                borderBottomWidth: index === listInformation.length - 1 ? 0 : 1,
              },
            ]}>
            <View style={[styles.buttonFixTextContainer, {width: '55%'}]}>
              <Text
                style={[
                  styles.viewInformationText,
                  {
                    color: list.isActionEnable ? color_theme_one.red : 'black',
                  },
                ]}>
                {list.statusDesc}
              </Text>
            </View>
            <ButtonLabelComponent
              isDisabled={isFixStatusDisabled}
              isLoading={fixLoading[list.field]}
              buttonAction={() => {
                dispatch(realtimeDiagnosticFixLoading(list.field));
                dispatch(
                  realtimeDiagnosticFixStatus({
                    fixType: list.field,
                    msisdn: list.msisdn,
                  }),
                );
              }}
              buttonWidth={150}
              buttonText={list.buttonText}
              textStyle={{fontSize: 10}}
            />
          </View>
        )}
      </>
    ));
  return (
    <View style={styles.viewInformationContainer}>
      {listInformation && renderList()}
    </View>
  );
};

ViewInformationComponent.propTypes = {
  listInformation: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.element,
      value: PropTypes.string,
      isActionEnable: PropTypes.bool,
      statusDesc: PropTypes.string,
      iccid: PropTypes.string,
      imsi: PropTypes.string,
      msisdn: PropTypes.string,
    }),
  ),
  isFixStatusDisabled: PropTypes.bool,
};
ViewInformationComponent.defaultProps = {
  listInformation: [],
  isFixStatusDisabled: false,
};

export default ViewInformationComponent;
