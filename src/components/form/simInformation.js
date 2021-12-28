import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import {Text} from '../index';
import styles from '../../style/reatimeDiagnosticStyle';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {colors, color_theme_one} from '../../constant/color';
const fieldList = [
  {title: 'Sim Status :', name: 'status', type: 'text'},
  {title: 'In Session :', name: 'session', type: 'symbolText'},
  {title: 'Subscription Package :', name: 'packageDesc', type: 'text'},
  {
    title: 'Total Usage ',
    name: 'totalUsage',
    type: 'custom',
    otherField: 'dataUsageDate',
  },
];
const SimInformationComponent = (props) => {
  const {value} = props;
  const renderList = () =>
    fieldList.map((field, index) => (
      <View key={index} style={styles.listWrapper}>
        <Entypo name="dot-single" size={14} color="black" />
        {fieldType(field)}
      </View>
    ));
  const fieldType = (field) => {
    switch (field.type) {
      case 'text':
        return (
          <>
            <Text fontType="semi-bold" style={styles.listTitle}>
              {field.title}
            </Text>
            <Text fontType="semi-bold" style={styles.listTitle}>
              &nbsp;{value[field.name] || ' - '}
            </Text>
          </>
        );
      case 'symbolText':
        return (
          <>
            <Text fontType="semi-bold" style={styles.listTitle}>
              {field.title}
            </Text>
            <Text fontType="semi-bold" style={styles.listTitle}>
              {typeof value[field.name] === 'boolean' ? (
                <>
                  &nbsp;
                  <FontAwesome
                    name="circle"
                    size={14}
                    color={
                      value[field.name] ? colors.tab_edit : color_theme_one.red
                    }
                  />
                  {value[field.name] ? ' Yes ' : ' No '}
                </>
              ) : (
                ' - '
              )}
            </Text>
          </>
        );
      case 'custom':
        return (
          <>
            <Text fontType="semi-bold" style={styles.listTitle}>
              {field.title}{' '}
              {value[field.otherField] ? `(${value[field.otherField]})` : ''} :
            </Text>
            <Text fontType="semi-bold" style={styles.listTitle}>
              &nbsp;{value[field.name] || ' - '}
            </Text>
          </>
        );
      default:
        return (
          <>
            <Text fontType="semi-bold" style={styles.listTitle}>
              {field.title}
            </Text>
            <Text fontType="semi-bold" style={styles.listTitle}>
              &nbsp;{value[field.name] || ' - '}
            </Text>
          </>
        );
    }
  };
  return (
    <View style={styles.simInformationContainer}>
      <Text fontType="semi-bold">SIM Information</Text>
      {renderList()}
    </View>
  );
};

SimInformationComponent.propTypes = {
  value: PropTypes.object,
};
SimInformationComponent.defaultProps = {
  value: {},
};

export default SimInformationComponent;
