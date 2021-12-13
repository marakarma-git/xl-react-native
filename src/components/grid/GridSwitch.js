import React from 'react';
import PropTypes from 'prop-types';
import {Switch} from 'react-native-switch';
import {colors} from '../../constant/color';

const GridSwitchComponent = (props) => {
  const {value, onSwitch, activeText, inActiveText, isDisabled, dataId} = props;
  return (
    <Switch
      value={value}
      onValueChange={(val) => onSwitch(dataId, val)}
      disabled={isDisabled}
      activeText={activeText}
      inActiveText={inActiveText}
      circleSize={20}
      barHeight={30}
      circleBorderWidth={0}
      backgroundActive={colors.tab_edit}
      backgroundInactive={colors.gray}
      circleActiveColor={'white'}
      circleInActiveColor={'white'}
      changeValueImmediately={true}
      switchBorderRadius={5}
      switchWidthMultiplier={4}
    />
  );
};

GridSwitchComponent.propTypes = {
  dataId: PropTypes.string,
  value: PropTypes.bool,
  onSwitch: PropTypes.func,
  activeText: PropTypes.string,
  inActiveText: PropTypes.string,
  isDisabled: PropTypes.bool,
};
GridSwitchComponent.defaultProps = {
  dataId: '',
  value: false,
  onSwitch: PropTypes.func,
  activeText: 'On',
  inActiveText: 'Off',
  isDisabled: false,
};

export default GridSwitchComponent;
