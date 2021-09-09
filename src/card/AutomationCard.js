import {cardStyle} from '../style';
import {View} from 'react-native';
import {Text} from '../components';
import CustomCheckBox from '../components/customCheckBox';
import {colors} from '../constant/color';
import InputHybrid from '../components/InputHybrid';
import React from 'react';
import PropType from 'prop-types';

const AutomationCard = (props) => {
  const {
    type,
    title,
    checked,
    disabled,
    cardDescription,
    cardWarningDescription,
    typeTitle,
    data,
    value,
    valueError,
    subValue,
    subValueError,
    onChange,
    subOnChange,
    onChangeCheck,
  } = props || {};
  const remap = data?.map(({packageId, packageDesc}) => ({
    value: packageId,
    label: packageDesc,
  }));
  return (
    <View style={cardStyle.containerRule}>
      <View
        style={[
          cardStyle.containerHeaderRule,
          {
            backgroundColor: !disabled ? colors.main_color : colors.gray_0,
          },
        ]}>
        <Text numberOfLines={1} style={cardStyle.headerText}>
          {title}
        </Text>
        {!disabled && (
          <CustomCheckBox
            style={{marginLeft: 16}}
            value={checked}
            onPress={onChangeCheck}
          />
        )}
      </View>
      <View style={{padding: 8}}>
        {cardDescription && (
          <Text
            style={{
              paddingBottom: 14,
            }}>
            {cardDescription}
          </Text>
        )}
        {cardWarningDescription && (
          <Text
            style={{
              paddingBottom: 14,
              borderBottomWidth: 1,
              borderColor: colors.gray_0,
            }}>
            {cardWarningDescription}
          </Text>
        )}
        {typeTitle && (
          <Text fontType={'bold'} style={{marginTop: 16, marginBottom: 10}}>
            {typeTitle}
          </Text>
        )}
        {type === 'CardFromTo' && (
          <>
            <InputHybrid
              labelLeft
              type={'DropDown'}
              label={'From:'}
              data={remap}
              value={value}
              errorText={valueError}
              disabled={disabled || !checked}
              onChange={onChange}
            />
            <InputHybrid
              labelLeft
              type={'DropDown'}
              label={'To:'}
              data={remap}
              value={subValue}
              errorText={subValueError}
              disabled={disabled || !checked}
              onChange={subOnChange}
            />
          </>
        )}
        {type === 'CardEmail' && (
          <InputHybrid
            customStyle={{marginTop: 0}}
            placeholder={'example@email.com'}
            fullWidthInput
            type={'TextInput'}
            value={value}
            errorText={valueError}
            disabled={disabled || !checked}
            removeLabel
            onChange={onChange}
          />
        )}
      </View>
    </View>
  );
};
export default AutomationCard;
AutomationCard.propTypes = {
  type: PropType.oneOf(['CardFromTo', 'CardEmail']).isRequired,
  title: PropType.string,
  checked: PropType.bool,
  disabled: PropType.bool,
  cardDescription: PropType.string,
  cardWarningDescription: PropType.string,
  typeTitle: PropType.string,
  data: PropType.arrayOf(),
  value:
    PropType.string ||
    PropType.objectOf({
      value: PropType.string.isRequired,
      label: PropType.string.isRequired,
      ...PropType.any,
    }) ||
    PropType.object,
  valueError: PropType.string,
  subValue:
    PropType.string ||
    PropType.objectOf({
      value: PropType.string.isRequired,
      label: PropType.string.isRequired,
      ...PropType.any,
    }) ||
    PropType.object,
  subValueError: PropType.string,
  onChange: PropType.func,
  subOnChange: PropType.func,
  onChangeCheck: PropType.func,
};
AutomationCard.defaultProp = {
  onChange: () => {},
  subOnChange: () => {},
};
