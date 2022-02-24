import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import Text from './global/text';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {inputHybridStyle} from '../style';
import {colors} from '../constant/color';
import ModalSearchPicker from './modal/ModalSearchPicker';
import {device_width} from '../constant/config';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomRadioButtonComponent from './form/CustomRadioButton';

const InputHybrid = (props) => {
  const {type} = props;
  switch (type) {
    case 'TextInput':
      return <NormalInput {...props} />;
    case 'DropDown':
      return <SelectInput {...props} />;
    case 'DateTimePicker':
      return <DateInput {...props} />;
    case 'DropDownType2':
      return <SelectInputType2 {...props} />;
    case 'AutomationLabel':
      return <AutomationLabel {...props} />;
    case 'ThresholdPad':
      return <ThresholdPad {...props} />;
    case 'RadioButton':
      return <RadioButton {...props} />;
    default:
      return <React.Fragment />;
  }
};
InputHybrid.propTypes = {
  type: PropTypes.oneOf([
    'TextInput',
    'DropDown',
    'DateTimePicker',
    'DropDownType2',
    'AutomationLabel',
    'ThresholdPad',
    'RadioButton',
  ]),
  removeLabel: PropTypes.bool,
  customStyle: PropTypes.object,
  customStyleText: PropTypes.object,
  fullWidthInput: PropTypes.bool,
  label: PropTypes.string,
  labelLeft: PropTypes.bool,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  disableText: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func,
  data: PropTypes.array,
  selectedValue: PropTypes.string,
  onChange2: PropTypes.func,
  errorText: PropTypes.string,
  constantLabelLeft: PropTypes.string,
  constantLabelRight: PropTypes.string,
  placeholder: PropTypes.string,
  isSecureTextEntry: PropTypes.bool,
  keyboardType: PropTypes.string,
  isSelected: PropTypes.bool,
  isTitleRequired: PropTypes.bool,
};
export default InputHybrid;

const ContainerInput = (props) => {
  const {
    children,
    label,
    isTouchable,
    disabled,
    loading,
    disableText,
    customTouchProps,
    errorText,
    labelLeft,
    fullWidthInput,
    customStyle,
    customStyleText,
    customTouchStyle,
    removeLabel,
    isPaddingZero,
    isTitleRequired,
  } = props;
  const CustomTouch = isTouchable ? TouchableOpacity : View;
  return (
    <View
      style={[
        inputHybridStyle.containerInput,
        labelLeft && inputHybridStyle.customStyle,
        fullWidthInput && inputHybridStyle.fullWidthInput,
        customStyle,
      ]}>
      {!removeLabel && (
        <Text
          style={[
            inputHybridStyle.titleInput,
            labelLeft && inputHybridStyle.customStyleText,
            customStyleText,
          ]}>
          {label}
          {isTitleRequired && (
            <Text style={{color: colors.chart_line_red}}> *</Text>
          )}
        </Text>
      )}
      <View style={{flex: 1}}>
        <CustomTouch
          style={[
            inputHybridStyle.innerContainerInput,
            labelLeft && inputHybridStyle.customStyleInnerContainer,
            isPaddingZero
              ? {
                  paddingHorizontal: 0,
                  alignItems: null,
                }
              : {},
            customTouchStyle,
          ]}
          {...customTouchProps}
          disabled={loading || disableText || disabled}>
          {children}
          {(disabled || loading) && (
            <View style={inputHybridStyle.disableInput}>
              {loading && (
                <ActivityIndicator size={'small'} color={colors.main_color} />
              )}
              {disableText && !loading && <Text>{disableText}</Text>}
            </View>
          )}
        </CustomTouch>
        <Text style={{fontSize: 10, color: colors.delete}} numberOfLines={2}>
          {errorText && `Error: ${errorText}`}
        </Text>
      </View>
    </View>
  );
};
const RadioButton = (props) => {
  const {data, value: values, onChange, disabled} = props || {};
  return (
    <View style={{marginTop: 16}}>
      {data &&
        data.map(({value, label}) => {
          return (
            <CustomRadioButtonComponent
              disabled={disabled}
              color={colors.main_color}
              label={label}
              radioValue={value}
              fontType={values?.value === value ? 'bold' : ''}
              status={values?.value === value ? 'checked' : 'unchecked'}
              onPressRadio={({label, radioValue}) =>
                onChange({
                  label,
                  value: radioValue,
                })
              }
            />
          );
        })}
    </View>
  );
};
const ThresholdPad = (props) => {
  const {value: values, onChange} = props || {};
  return (
    <ContainerInput
      isPaddingZero
      customTouchProps={{width: device_width * 0.3}}
      {...props}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <View
          style={{
            flex: 1,
            borderRightWidth: 1,
            borderColor: '#8D8D8D',
            flexDirection: 'row',
          }}>
          <TextInput
            style={{flex: 1, textAlign: 'right'}}
            value={values}
            defaultValue={'0'}
            keyboardType={'number-pad'}
            onChange={({nativeEvent}) => {
              const {text} = nativeEvent || '';
              if (text <= 100 && text >= 0) {
                const changeText = parseInt(text, 10) || '0';
                onChange(changeText.toString());
              }
            }}
          />
          <Text style={{textAlignVertical: 'center', paddingHorizontal: 6}}>
            %
          </Text>
        </View>
        <View>
          <TouchableOpacity
            style={{flex: 1, borderColor: '#8D8D8D'}}
            onPress={() => {
              if (parseInt(values, 10) < 100) {
                const calculate = parseInt(values, 10) + 1;
                onChange(calculate.toString());
              }
            }}>
            <Ionicons name={'md-chevron-up'} color={'black'} size={20} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flex: 1,
              borderTopWidth: 1,
              borderColor: '#8D8D8D',
              justifyContent: 'center',
            }}
            onPress={() => {
              if (parseInt(values, 10) > 0) {
                const calculate = parseInt(values, 10) - 1;
                onChange(calculate.toString());
              }
            }}>
            <Ionicons name={'md-chevron-down'} color={'black'} size={20} />
          </TouchableOpacity>
        </View>
      </View>
    </ContainerInput>
  );
};
const AutomationLabel = (props) => {
  const {label} = props;
  return (
    <View style={{marginTop: 16}}>
      <Text fontType={'bold'}>{label}</Text>
    </View>
  );
};
const NormalInput = (props) => {
  const {
    onChange,
    value,
    placeholder,
    constantLabelLeft,
    constantLabelRight,
    isSecureTextEntry,
    keyboardType,
  } = props;
  const [hidden, setHidden] = useState(true);
  return (
    <ContainerInput {...props}>
      <Text>{constantLabelLeft || ''}</Text>
      <TextInput
        style={inputHybridStyle.textInputStyle}
        onChangeText={onChange}
        value={value}
        placeholder={placeholder}
        keyboardType={keyboardType}
        secureTextEntry={isSecureTextEntry === true ? hidden : false}
      />
      {isSecureTextEntry && (
        <MaterialCommunityIcons
          name={hidden ? 'eye-off-outline' : 'eye-outline'}
          color={'black'}
          size={18}
          onPress={() => setHidden((state) => !state)}
        />
      )}
      <Text>{constantLabelRight || ''}</Text>
    </ContainerInput>
  );
};
const SelectInput = (props) => {
  const {value, onChange, data, label} = props;
  const {label: valueLabel} = value || {};
  const [visible, setVisible] = useState(false);
  return (
    <React.Fragment>
      <ContainerInput
        {...props}
        label={label}
        isTouchable
        customTouchProps={{onPress: () => setVisible(true)}}>
        <Text style={{paddingVertical: 8, flex: 1}} numberOfLines={2}>
          {valueLabel || 'Please Select'}
        </Text>
        <MaterialCommunityIcons
          name={'chevron-down'}
          color={colors.gray}
          size={20}
        />
      </ContainerInput>
      {visible && (
        <ModalSearchPicker
          title={`Select ${label}`}
          data={data}
          value={value.value}
          onClose={() => setVisible(false)}
          onChange={(e) => {
            onChange(e);
            setVisible(false);
          }}
        />
      )}
    </React.Fragment>
  );
};
const SelectInputType2 = (props) => {
  const {value, onChange, data, label, selectedValue, onChange2} = props;
  const [visible, setVisible] = useState(false);
  return (
    <React.Fragment>
      <ContainerInput {...props} label={label}>
        <TextInput
          style={{padding: 5, flex: 1}}
          value={value}
          onChangeText={onChange}
        />
        <TouchableOpacity
          style={inputHybridStyle.subSelect}
          onPress={() => setVisible(true)}>
          <Text style={{marginLeft: 9}}>{selectedValue.value || 'Unit'}</Text>
          <MaterialCommunityIcons
            name={'chevron-down'}
            color={colors.gray}
            size={20}
          />
        </TouchableOpacity>
      </ContainerInput>
      {visible && (
        <ModalSearchPicker
          title={`Select ${label}`}
          data={data}
          value={selectedValue.value}
          onClose={() => setVisible(false)}
          onChange={(e) => {
            onChange2(e);
            setVisible(false);
          }}
        />
      )}
    </React.Fragment>
  );
};
const DateInput = (props) => {
  const {value, onChange, isSelected} = props;
  const [showDate, setShowDate] = useState(false);
  return (
    <React.Fragment>
      <ContainerInput
        {...props}
        isTouchable
        customTouchProps={{onPress: () => setShowDate(true)}}>
        <Text numberOfLines={1} style={{paddingVertical: 8, flex: 1}}>
          {isSelected ? dayjs(value).format('DD-MM-YYYY') : 'Choose Date'}
        </Text>
        <FontAwesome5 name={'calendar-alt'} color={colors.gray} size={20} />
      </ContainerInput>
      {showDate && (
        <RNDateTimePicker
          value={value}
          onChange={(e) => {
            const {type, nativeEvent} = e || {};
            if (type === 'dismissed') {
              setShowDate(false);
            } else {
              setShowDate(false);
              onChange(dayjs(e.nativeEvent.timestamp).toDate());
            }
          }}
          mode={'date'}
          is24Hour={true}
          display="default"
        />
      )}
    </React.Fragment>
  );
};
//example how to use
// <InputHybrid type={'TextInput'} label={'IMSI'} />
// <InputHybrid
//   type={'DateTimePicker'}
//   label={'First Activition Date'}
//   value={new Date(1598051730000)}
// />
// <InputHybrid
//   type={'DropDown'}
//   label={'State'}
//   data={[
//     {label: 'test1', value: 'test1'},
//     {label: 'test2', value: 'test2'},
//   ]}
// />
// <InputHybrid
//   type={'DropDownType2'}
//   label={'State'}
//   data={[
//     {label: 'kb', value: 'kb'},
//     {label: 'mb', value: 'mb'},
//   ]}
// />
