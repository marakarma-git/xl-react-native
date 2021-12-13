import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {TouchableOpacity, View} from 'react-native';
import styles from '../../style/account.style';
import {Text} from '..';
import Feather from 'react-native-vector-icons/Feather';
import ModalSearchPicker from '../../components/modal/ModalSearchPickerCustom';

const GridDropDownComponent = (props) => {
  const [showModal, setShowModal] = useState(false);
  const {
    fontSize,
    items,
    onPickItem,
    color,
    modalHeight,
    dataId,
    isDisabled,
    value,
  } = props;
  return (
    <>
      <TouchableOpacity
        disabled={isDisabled}
        onPress={() => setShowModal(true)}
        style={styles.tableDropDown}>
        <View style={styles.tableDropDownTextContainer}>
          <Text style={{color: color, fontSize: fontSize}}>{value}</Text>
        </View>
        <View style={styles.tableDropDownButton}>
          <Feather name="chevron-down" size={16} color={color} />
        </View>
      </TouchableOpacity>
      {showModal && (
        <ModalSearchPicker
          modalHeight={modalHeight}
          data={items}
          onChange={(e) => {
            onPickItem(e.value, dataId);
            setShowModal(false);
          }}
          onClose={() => setShowModal(false)}
          removeSearch={true}
          title={'FieldType'}
          value={value}
        />
      )}
    </>
  );
};

GridDropDownComponent.propTypes = {
  fontSize: PropTypes.number,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
    }),
  ),
  onPickItem: PropTypes.func,
  color: PropTypes.string,
  modalHeight: PropTypes.number,
  dataId: PropTypes.string,
  isDisabled: PropTypes.bool,
  value: PropTypes.string,
};
GridDropDownComponent.defaultProps = {
  fontSize: 12,
  items: [],
  onPickItem: () => {},
  color: 'black',
  modalHeight: 170,
  dataId: '',
  isDisabled: false,
  value: '',
};

export default GridDropDownComponent;
