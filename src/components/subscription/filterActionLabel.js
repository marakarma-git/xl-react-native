import React, {useState} from 'react';
import {View, TouchableOpacity} from 'react-native';
import Text from '../global/text';
import PropTypes from 'prop-types';
import {subscriptionStyle} from '../../style';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '../../constant/color';
import ModalSearchPicker from '../modal/ModalSearchPicker';
const actionData = [
  {
    value: 'abc',
    label: 'abc',
  },
];
const FilterActionLabel = (props) => {
  const {value, onChange, total, filtered, selected} = props || {};
  const [showAction, setShowAction] = useState(false);
  return (
    <>
      <View style={subscriptionStyle.wrapperMenuOption}>
        <TouchableOpacity
          style={subscriptionStyle.menuOption}
          onPress={() => setShowAction(true)}>
          <Text style={subscriptionStyle.textOption}>Actions</Text>
          <View style={subscriptionStyle.menuOptionChevronDown}>
            <MaterialCommunityIcons
              name={'chevron-down'}
              color={colors.gray}
              size={26}
            />
          </View>
        </TouchableOpacity>
        <Text style={subscriptionStyle.textMenuTotal}>
          {`${total ? `Total: ${total}` : ''} ${
            filtered ? `| Filtered: ${filtered}` : ''
          } ${selected ? `| Selected: ${selected}` : ''}`}
        </Text>
      </View>
      {showAction && (
        <ModalSearchPicker
          data={actionData}
          onChange={(e) => {
            onChange(e);
            setShowAction(false);
          }}
          onClose={() => setShowAction(false)}
          removeSearch={true}
          title={'Action'}
          value={value}
        />
      )}
    </>
  );
};
FilterActionLabel.propTypes = {
  value: PropTypes.objectOf({
    value: PropTypes.any,
    label: PropTypes.string,
  }),
  onChange: PropTypes.func,
  total: PropTypes.string || PropTypes.number,
  filtered: PropTypes.string || PropTypes.number,
  selected: PropTypes.string || PropTypes.number,
};
FilterActionLabel.defaultProps = {
  onChange: () => {},
};
export default FilterActionLabel;
