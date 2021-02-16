import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {inputHybridStyle} from '../style';
import {colors} from '../constant/color';
import ModalSearchPicker from './modal/ModalSearchPicker';

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
  ]),
  label: PropTypes.string,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  disableText: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func,
  data: PropTypes.array,
  selectedValue: PropTypes.string,
  onChange2: PropTypes.func,
  errorText: PropTypes.string,
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
  } = props;
  const CustomTouch = isTouchable ? TouchableOpacity : View;
  return (
    <View style={inputHybridStyle.containerInput}>
      <Text style={inputHybridStyle.titleInput}>{label}</Text>
      <CustomTouch
        style={inputHybridStyle.innerContainerInput}
        {...customTouchProps}
        disabled={loading || disableText || disabled}>
        {children}
        {(disabled || loading) && (
          <View style={inputHybridStyle.disableInput}>
            {loading && <ActivityIndicator size={'small'} color={'white'} />}
            {disableText && !loading && <Text>{disableText}</Text>}
          </View>
        )}
      </CustomTouch>
      <Text style={{fontSize: 10, color: 'red'}} numberOfLines={2}>
        {errorText && `Error: ${errorText}`}
      </Text>
    </View>
  );
};
const NormalInput = (props) => {
  const {onChange, value} = props;
  return (
    <ContainerInput {...props}>
      <TextInput
        style={inputHybridStyle.textInputStyle}
        onChangeText={onChange}
        value={value}
      />
    </ContainerInput>
  );
};
const SelectInput = (props) => {
  const {value, onChange, data, label} = props;
  const [visible, setVisible] = useState(false);
  return (
    <React.Fragment>
      <ContainerInput
        {...props}
        label={label}
        isTouchable
        customTouchProps={{onPress: () => setVisible(true)}}>
        <Text style={{paddingVertical: 8, flex: 1}}>
          {value.label || 'Please Select'}
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
