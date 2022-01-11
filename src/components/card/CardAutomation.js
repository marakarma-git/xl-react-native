import React from 'react';
import styles from '../../style/home.style';
import {Card} from 'react-native-paper';
import {Text} from '../index';
import {View} from 'react-native';
import {colors} from '../../constant/color';
import PropTypes from 'prop-types';
import InputHybrid from '../InputHybrid';
import GridSwitchComponent from '../grid/GridSwitch';

const WrapperOne = (props) => {
  return (
    <Card style={[styles.cardSection, {marginTop: '5%'}]}>
      <Card.Content>
        <Text fontType="bold" style={styles.formStepHeaderTextTitle}>
          Ini Title
        </Text>
        <Text style={styles.formStepHeaderTextBody}>Ini Description</Text>
      </Card.Content>
      <View
        style={{
          flex: 1,
          height: 1,
          backgroundColor: 'black',
          marginTop: 12,
        }}
      />
      <Card.Content />
    </Card>
  );
};
const WrapperTwo = (props) => {
  return (
    <View
      style={[
        styles.cardSection,
        {
          marginTop: '5%',
          marginHorizontal: 0,
          borderWidth: 0,
        },
      ]}>
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: colors.disabled_table,
          paddingHorizontal: '3%',
          paddingVertical: 6,
          alignItems: 'center',
        }}>
        <GridSwitchComponent
          inActiveText={''}
          activeText={''}
          switchBorderRadius={50}
          switchWidthMultiplier={3}
        />
        <Text
          fontType="bold"
          style={{fontSize: 18, color: 'black', marginLeft: 8}}>
          Ini Title
        </Text>
      </View>
      <Card.Content>
        <Text style={[styles.formStepHeaderTextBody, {marginTop: 16}]}>
          Ini Description
        </Text>
      </Card.Content>
    </View>
  );
};
const CardAutomation = (props) => {
  const {containerType} = props || {};
  switch (containerType) {
    case 'WrapperOne':
      return <WrapperOne {...props} />;
    case 'WrapperTwo':
      return <WrapperTwo {...props} />;
    default:
      return <React.Fragment />;
  }
};
CardAutomation.propTypes = {
  containerType: PropTypes.oneOfType(['WrapperOne', 'WrapperTwo']),
};
export default CardAutomation;
