import React from 'react';
import PropTypes from 'prop-types';
import TableCellHeaderOptionCheckBox from './tableCellHeaderOptionCheckBox';
import TableCellHeaderAscDesc from './tableCellHeaderAscDesc';
import TableCellHeader from './tableCellHeader';
import TableCellCheckBox from './tableCellCheckBox';
import TableCellStatus from './tableCellStatus';
import TableCellText from './tableCellText';
import TableCellViewMap from './tableCellViewMap';
import TableCellHeaderCheckBox from './tableCellHeaderCheckBox';
import TableCellCheckBoxTreeView from './tableCellCheckBoxTreeView';

const TableCell = (props) => {
  const {type} = props || {};
  switch (type) {
    case 'TableCellHeaderOptionCheckBox':
      return <TableCellHeaderOptionCheckBox {...props} />;
    case 'TableCellHeaderCheckBox':
      return <TableCellHeaderCheckBox {...props} />;
    case 'TableCellHeaderAscDesc':
      return <TableCellHeaderAscDesc {...props} />;
    case 'TableCellHeader':
      return <TableCellHeader {...props} />;
    case 'TableCellCheckBox':
      return <TableCellCheckBox {...props} />;
    case 'TableCellStatus':
      return <TableCellStatus {...props} />;
    case 'TableCellText':
      return <TableCellText {...props} />;
    case 'TableCellViewMap':
      return <TableCellViewMap {...props} />;
    case 'TableCellCheckBoxTreeView':
      return <TableCellCheckBoxTreeView {...props} />;
    default:
      return <React.Fragment />;
  }
};
TableCell.propTypes = {
  type: PropTypes.oneOf([
    'TableCellHeaderOptionCheckBox',
    'TableCellHeaderCheckBox',
    'TableCellHeaderAscDesc',
    'TableCellHeader',
    'TableCellCheckBox',
    'TableCellStatus',
    'TableCellText',
    'TableCellViewMap',
    'TableCellCheckBoxTreeView',
  ]).isRequired,
  config: {
    label: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
    fontColor: PropTypes.string,
    backgroundColor: PropTypes.string,
    fontSize: PropTypes.number,
    isTouchable: PropTypes.bool,
    superType: PropTypes.oneOf(['DATE', 'BYTE']),
    flexStart: PropTypes.bool,
    visibility: PropTypes.bool,
    icon: PropTypes.string,
    showIcon: PropTypes.bool,
    isTreeView: PropTypes.bool,
    treeLevel: PropTypes.number,
    treeCheck: PropTypes.bool,
  },
  onPress: PropTypes.func,
  onPressArrow: PropTypes.func,
  onChangeCheck: PropTypes.func,
  dataOption: PropTypes.arrayOf([
    PropTypes.objectOf({
      value: PropTypes.string,
      label: PropTypes.string,
    }),
  ]),
  value: PropTypes.oneOf([
    PropTypes.string,
    PropTypes.bool,
    PropTypes.oneOf(['ASC', 'DESC', null]),
    PropTypes.objectOf({
      isChecked: PropTypes.bool,
      selectedOptionValue: PropTypes.objectOf({
        value: PropTypes.string,
        label: PropTypes.string,
      }),
      sort_by: PropTypes.oneOf(['ASC', 'DESC', null]),
    }),
  ]),
  otherInformation: PropTypes.any,
};
TableCell.defaultProps = {
  onPress: () => {},
  onChangeCheck: () => {},
};
export default TableCell;
