import React from 'react';
import PropTypes from 'prop-types';
import {View, TouchableOpacity} from 'react-native';
import {Text} from '..';
import AntDesign from 'react-native-vector-icons/AntDesign';
import styles from '../../style/reatimeDiagnosticStyle';
import ModalSearchPickerCustom from '../modal/ModalSearchPickerCustom';

const ButtonCurveTypeComponent = (props) => {
  const {
    isDisabled,
    label,
    placeholder,
    setShowModal,
    showModal,
    setCurveType,
    curveType,
    curveTypeOptions,
  } = props;
  return (
    <>
      <TouchableOpacity
        disabled={isDisabled}
        style={styles.actionBar}
        onPress={() => setShowModal(true)}>
        <Text style={styles.actionText}>
          {label
            ? `${label.length > 10 ? `${label.substring(0, 10)}...` : label}`
            : placeholder}
        </Text>
        <View style={styles.actionButton}>
          <AntDesign name="caretdown" size={12} color="black" />
        </View>
      </TouchableOpacity>
      {showModal && (
        <ModalSearchPickerCustom
          modalHeight={230}
          data={curveTypeOptions}
          onChange={(e) => {
            setCurveType(e);
            setShowModal(false);
          }}
          onClose={() => setShowModal(false)}
          removeSearch={true}
          title={'Curve Type'}
          value={curveType?.value}
        />
      )}
    </>
  );
};

ButtonCurveTypeComponent.propTypes = {
  isDisabled: PropTypes.bool,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  setShowModal: PropTypes.func,
  showModal: PropTypes.bool,
  setCurveType: PropTypes.func,
  curveType: PropTypes.objectOf(
    PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.string,
    }),
  ),
  curveTypeOptions: PropTypes.array,
};
ButtonCurveTypeComponent.defaultProps = {
  isDisabled: false,
  label: '',
  placeholder: 'Curve Type',
  setShowModal: () => {},
  showModal: false,
  setCurveType: () => {},
  curveType: {value: '', label: ''},
  curveTypeOptions: [],
};

export default ButtonCurveTypeComponent;
