import React, {useState} from 'react';
import {View, TouchableOpacity, ActivityIndicator} from 'react-native';
import Text from '../global/text';
import PropTypes from 'prop-types';
import {subscriptionStyle} from '../../style';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '../../constant/color';
import ModalSearchPicker from '../modal/ModalSearchPicker';
import MaterialCommunityIcon from 'react-native-paper/src/components/MaterialCommunityIcon';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {ColumnFilterSearch} from './searchHeader';
import { Alert } from 'react-native';
const actionData = [
  {
    value: 'abc',
    label: 'abc',
  },
];
const FilterActionLabel = (props) => {
  const {
    value,
    onChange,
    total,
    filtered,
    selected,

    typeTwo,
    loading,
    onClickFilter,
    onClickColumn,
  } = props || {};
  const [showAction, setShowAction] = useState(false);

  return (
    <>
      <View
        style={[
          subscriptionStyle.wrapperMenuOption,
          typeTwo && subscriptionStyle.wrapperMenuOptionTypeTwo,
        ]}>
        <View style={!typeTwo && subscriptionStyle.onlyForTypeOne}>
          <TouchableOpacity
            style={subscriptionStyle.menuOption}
            //onPress={() => setShowAction(true)}
            onPress={() => Alert.alert('Coming soon')}
            >
            <Text style={subscriptionStyle.textOption}>Actions</Text>
            <View style={subscriptionStyle.menuOptionChevronDown}>
              <MaterialCommunityIcons
                name={'chevron-down'}
                color={colors.gray}
                size={26}
              />
            </View>
          </TouchableOpacity>
          {(total || filtered || selected) && (
            <Text
              fontType={'bold'}
              style={[
                subscriptionStyle.textMenuTotal,
                {marginTop: typeTwo ? 6 : 0, marginLeft: typeTwo ? 0 : 12},
              ]}>
              {`${total ? `Total: ${total}` : ''} ${
                filtered ? `| Filtered: ${filtered}` : ''
              } ${selected ? `| Selected: ${selected}` : ''}`}
            </Text>
          )}
        </View>
        {typeTwo && (
          <View
            style={{
              flexDirection: 'row',
            }}>
            <ColumnFilterSearch
              noHeight
              onClickFilter={onClickFilter}
              onClickColumn={onClickColumn}
              loading={loading}
            />
          </View>
        )}
      </View>
      {showAction && (
        <ModalSearchPicker
          data={props.actionData || actionData}
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
  actionData: PropTypes.array,
  value: PropTypes.objectOf({
    value: PropTypes.any,
    label: PropTypes.string,
  }),
  onChange: PropTypes.func,
  total: PropTypes.string || PropTypes.number,
  filtered: PropTypes.string || PropTypes.number,
  selected: PropTypes.string || PropTypes.number,

  typeTwo: PropTypes.bool,
  loading: PropTypes.bool,
  onClickFilter: PropTypes.func,
  onClickColumn: PropTypes.func,
};
FilterActionLabel.defaultProps = {
  onChange: () => {},
  onClickFilter: () => {},
  onClickColumn: () => {},
};
export default FilterActionLabel;
