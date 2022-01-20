import React from 'react';
import styles from '../../style/home.style';
import {Card} from 'react-native-paper';
import {Text} from '../index';
import {View} from 'react-native';
import PropTypes from 'prop-types';
import InputHybrid from '../InputHybrid';
import GridSwitchComponent from '../grid/GridSwitch';
import {automationCreditStyle} from '../../style';
import {useDispatch, useSelector} from 'react-redux';
import {
  automationAdaptiveOnChange,
  automationContainerSwitch,
} from '../../redux/action/automation_create_edit_action';
import lod from 'lodash';
import {colors} from '../../constant/color';

const InputWrapper = (props) => {
  const dispatch = useDispatch();
  const {dataInput, summaryMode} = props || [];
  const {containerValue} = useSelector(
    (state) => state.automation_create_edit_reducer,
  );
  return (
    <>
      {dataInput &&
        dataInput.map((item) => {
          const {
            inputType,
            titleInput,
            config,
            paramsDefault,
            paramsData,
            paramsError,
            paramsLoading,
            paramsDisabled,
            paramsHide,
          } = item || {};
          return (
            <>
              {containerValue[`${paramsHide}`] !== true && (
                <InputHybrid
                  type={summaryMode === true ? 'TextInput' : inputType}
                  label={titleInput}
                  disabled={
                    !!(
                      containerValue[`${paramsDisabled}`] ||
                      containerValue[`${paramsDefault}Disabled`] ||
                      summaryMode === true
                    )
                  }
                  onChange={(e) => {
                    dispatch(
                      automationAdaptiveOnChange({
                        paramsToWhere: paramsDefault,
                        realData: e,
                      }),
                    );
                  }}
                  value={
                    summaryMode === true
                      ? lod.isObject(containerValue[`${paramsDefault}`])
                        ? containerValue[`${paramsDefault}`]?.value
                        : containerValue[`${paramsDefault}`]
                      : containerValue[`${paramsDefault}`]
                  }
                  data={
                    containerValue[`${paramsData}`] ||
                    containerValue[`${paramsDefault}Data`]
                  }
                  errorText={
                    containerValue[`${paramsError}`] ||
                    containerValue[`${paramsDefault}Error`]
                  }
                  loading={
                    containerValue[`${paramsLoading}`] ||
                    containerValue[`${paramsDefault}Loading`]
                  }
                  {...config}
                />
              )}
            </>
          );
        })}
    </>
  );
};
const WrapperOne = (props) => {
  const {
    dataInput,
    containerTitle,
    containerDescription,
    isRemoveBottomLine,
    summaryMode,
    children,
    style,
  } = props || {};
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
      <Card.Content style={style}>
        {children || (
          <InputWrapper dataInput={dataInput} summaryMode={summaryMode} />
        )}
      </Card.Content>
    </Card>
  );
};
const WrapperTwo = (props) => {
  const dispatch = useDispatch();
  const {
    dataInput,
    containerTitle,
    containerDescription,
    paramsContainerDefault,
    paramsContainerDisabled,
    paramsContainerHide,
    summaryMode,
    containerTopLine,
  } = props || {};
  const {containerValue} = useSelector(
    (state) => state.automation_create_edit_reducer,
  );
  return (
    <>
      {(containerValue[`${paramsContainerDefault}Hide`] !== true ||
        containerValue[`${paramsContainerHide}`] !== true) && (
        <View style={[automationCreditStyle.wrapperTwoContainer]}>
          {containerTopLine === true && (
            <View style={automationCreditStyle.containerTopLineStyle} />
          )}
          <View style={automationCreditStyle.wrapperTwoInnerContainer}>
            <GridSwitchComponent
              isDisabled={
                !!(
                  containerValue[`${paramsContainerDisabled}`] ||
                  containerValue[`${paramsContainerDefault}Disabled`] ||
                  summaryMode === true
                )
              }
              inActiveText={''}
              activeText={''}
              switchBorderRadius={50}
              switchWidthMultiplier={3}
              value={containerValue[`${paramsContainerDefault}`]}
              onSwitch={() => {
                dispatch(
                  automationContainerSwitch({
                    paramsToWhere: paramsContainerDefault,
                  }),
                );
              }}
            />
            {containerTitle && (
              <Text fontType="bold" style={automationCreditStyle.wrapperTitle}>
                {containerTitle}
              </Text>
            )}
          </View>
          {containerValue[`${paramsContainerDefault}`] === true && (
            <Card.Content>
              <Text
                style={[
                  styles.formStepHeaderTextBody,
                  {marginTop: containerDescription ? 16 : 0},
                ]}>
                {containerDescription}
              </Text>
              <InputWrapper dataInput={dataInput} summaryMode={summaryMode} />
            </Card.Content>
          )}
        </View>
      )}
    </>
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
  dataInput: PropTypes.array,
  containerTitle: PropTypes.string,
  containerDescription: PropTypes.string,
  containerSwitch: PropTypes.bool,
  isRemoveBottomLine: PropTypes.bool,
  summaryMode: PropTypes.bool,
};
export default CardAutomation;
export {WrapperOne};
