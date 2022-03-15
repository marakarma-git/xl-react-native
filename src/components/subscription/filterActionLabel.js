import React, {useState} from 'react';
import {View, TouchableOpacity} from 'react-native';
import Text from '../global/text';
import PropTypes from 'prop-types';
import {subscriptionStyle} from '../../style';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '../../constant/color';
import ModalSearchPicker from '../modal/ModalSearchPicker';
import {ColumnFilterSearch} from './searchHeader';
import {border_radius} from '../../constant/config';
const actionData = [
  {
    value: 0,
    label: 'New Configuration',
    navigationTo: '',
    isDisabled: false,
  },
];
const LocalText = (props) => {
  const {typeTwo, total, filtered, selected, style, forceMarginZero} =
    props || {};
  return (
    <Text
      fontType={'bold'}
      style={[
        subscriptionStyle.textMenuTotal,
        {
          marginTop: typeTwo ? 6 : 0,
          marginLeft: typeTwo || forceMarginZero ? 0 : 12,
        },
        style,
      ]}>
      {`${total ? `Total: ${total}` : ''} ${
        filtered ? `| Filtered: ${filtered}` : ''
      } ${selected ? `| Selected: ${selected}` : ''}`}
    </Text>
  );
};
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

    forceRemoveActions,
    removeFilterIcon,
  } = props || {};
  const [showAction, setShowAction] = useState(false);

  return (
    <>
      <View
        style={[
          subscriptionStyle.wrapperMenuOption,
          typeTwo && subscriptionStyle.wrapperMenuOptionTypeTwo,
        ]}>
        <View
          style={
            !typeTwo
              ? subscriptionStyle.onlyForTypeOne
              : {
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                }
          }>
          {forceRemoveActions !== true && (
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
          )}
          {(total || filtered || selected) && (
            <LocalText
              typeTwo={typeTwo}
              total={total}
              filtered={filtered}
              selected={selected}
            />
          )}
        </View>
        {typeTwo && (
          <View
            style={{
              flexDirection: 'row',
            }}>
            <ColumnFilterSearch
              hideFilter={removeFilterIcon}
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

  forceRemoveActions: PropTypes.bool,
};
FilterActionLabel.defaultProps = {
  onChange: () => {},
  onClickFilter: () => {},
  onClickColumn: () => {},
};

const FilterActionRightCreate = (props) => {
  const {total, filtered, selected, onChange, removeCreateButton} = props || {};
  return (
    <View style={[subscriptionStyle.wrapperMenuOption]}>
      {total || filtered || selected ? (
        <LocalText
          filtered={filtered}
          total={total}
          selected={selected}
          forceMarginZero={true}
        />
      ) : (
        <View style={{flex: 1}} />
      )}
      {!removeCreateButton && (
        <TouchableOpacity
          style={subscriptionStyle.rightButtonStyle}
          onPress={(e) => onChange(e)}>
          <Text style={{color: 'white'}} fontType={'bold'}>
            New Configuration
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
FilterActionRightCreate.propTypes = {
  onChange: PropTypes.func,
  total: PropTypes.string || PropTypes.number,
  filtered: PropTypes.string || PropTypes.number,
  selected: PropTypes.string || PropTypes.number,
  removeCreateButton: PropTypes.bool,
};
FilterActionRightCreate.defaultProps = {
  onChange: () => {},
};

export default FilterActionLabel;
export {FilterActionRightCreate};
