import React from 'react';
import styles from '../../style/home.style';
import {Card} from 'react-native-paper';
import {Text} from '../index';
import {View} from 'react-native';
import PropTypes from 'prop-types';
import InputHybrid from '../InputHybrid';
import GridSwitchComponent from '../grid/GridSwitch';
import {automationCreditStyle} from '../../style';
const InputWrapper = (props) => {
  const {dataInput} = props || [];
  return (
    <>
      {dataInput &&
        dataInput.map((item) => {
          const {inputType, titleInput, config} = item || {};
          return (
            <InputHybrid type={inputType} label={titleInput} {...config} />
          );
        })}
    </>
  );
};
const WrapperOne = (props) => {
  const {dataInput, containerTitle, containerDescription, isRemoveBottomLine} =
    props || {};
  return (
    <Card style={[styles.cardSection, {marginTop: '5%'}]}>
      <Card.Content>
        <Text fontType="bold" style={styles.formStepHeaderTextTitle}>
          {containerTitle}
        </Text>
        <Text style={styles.formStepHeaderTextBody}>
          {containerDescription}
        </Text>
      </Card.Content>
      {!isRemoveBottomLine && (
        <View style={automationCreditStyle.wrapperOneLine} />
      )}
      <Card.Content>
        <InputWrapper dataInput={dataInput} />
      </Card.Content>
    </Card>
  );
};
const WrapperTwo = (props) => {
  const {dataInput, containerTitle, containerDescription, isSwitch} =
    props || {};
  return (
    <View
      style={[styles.cardSection, automationCreditStyle.wrapperTwoContainer]}>
      <View style={automationCreditStyle.wrapperTwoInnerContainer}>
        <GridSwitchComponent
          inActiveText={''}
          activeText={''}
          switchBorderRadius={50}
          switchWidthMultiplier={3}
          value={isSwitch}
        />
        {containerTitle && (
          <Text fontType="bold" style={automationCreditStyle.wrapperTitle}>
            {containerTitle}
          </Text>
        )}
      </View>
      {isSwitch === true && (
        <Card.Content>
          <Text
            style={[
              styles.formStepHeaderTextBody,
              {marginTop: containerDescription ? 16 : 0},
            ]}>
            {containerDescription}
          </Text>
          <InputWrapper dataInput={dataInput} />
        </Card.Content>
      )}
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
