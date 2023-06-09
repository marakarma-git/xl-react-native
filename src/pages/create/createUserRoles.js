import React, {useState, useEffect, useCallback} from 'react';
import PropTypes from 'prop-types';

import {View} from 'react-native';
import {GridComponent} from '../../components';
import {useDispatch, useSelector} from 'react-redux';
import {getActiveRoles, resetRolesData} from '../../redux/action/roles_action';

const gridOptionsArray = [
  {
    bgColor: '#F4F3F4',
    headerColor: '#707070',
    width: '10%',
    cellAlign: 'center',
    headerAlign: 'center',
    label: 'Roles',
    field: 'roleId',
    cellType: 'checkbox',
    headerType: 'checkbox',
    isCheck: false,
  },
  {
    bgColor: '#F4F3F4',
    headerColor: '#707070',
    width: '45%',
    cellAlign: 'center',
    headerAlign: 'center',
    label: 'Roles',
    field: 'roleName',
    cellType: 'text',
    headerType: 'text',
  },
  {
    bgColor: '#F4F3F4',
    headerColor: '#707070',
    width: '45%',
    cellAlign: 'center',
    headerAlign: 'center',
    label: 'Organization',
    field: 'enterpriseName',
    cellType: 'text',
    headerType: 'text',
  },
];

const CreateUserRoles = (props) => {
  const dispatch = useDispatch();
  const {data_active_roles, loading} = useSelector(
    (state) => state.roles_reducer,
  );

  const [gridData, setGridData] = useState([]);
  const [gridOptions, setGridOptions] = useState(gridOptionsArray);
  const [isDataReset, setIsDataReset] = useState(false);

  const selectCheckBox = (roleId = null, action = 'general') => {
    if (gridData.length > 0) {
      const newData = new Array();
      const newOptions = new Array();

      let isHeaderCheck = false;

      if (roleId === null) {
        gridOptions.map((option) => {
          if (option.headerType === 'checkbox') {
            isHeaderCheck = !option.isCheck;
            option.isCheck = !option.isCheck;
          }

          newOptions.push(option);
        });

        setGridOptions((prevState) => (prevState = newOptions));
      }

      gridData.map((data) => {
        if (roleId === null) {
          data.isCheck = isHeaderCheck;
        } else {
          if (data.roleId === roleId) {
            if (action === 'general') {
              data.isCheck = !data.isCheck;
            } else {
              data.isCheck = true;
            }
          }
        }

        newData.push(data);
      });

      const selectedData = new Array();

      newData.map((data) => {
        if (data.isCheck) {
          selectedData.push(data);
        }
      });

      props.setSelectedRoles(selectedData);
      setGridData((prevState) => (prevState = newData));
    }
  };

  const checkSelectedRoles = (data, dataRoleId) => {
    const newData = new Array();

    data.map((data) => {
      dataRoleId.map((roleId) => {
        if (data.roleId === roleId) {
          data.isCheck = true;
        }
      });

      newData.push(data);
    });

    const selectedData = new Array();

    newData.map((data) => {
      if (data.isCheck) {
        selectedData.push(data);
      }
    });

    props.setSelectedRoles(selectedData);
    setGridData((prevState) => (prevState = newData));
  };

  const checkHistory = useCallback(() => {
    if (gridData.length > 0) {
      props.selectedRoles.map((roles) => {
        selectCheckBox(roles.roleId, 're-render');
      });
    }
  }, [gridData]);

  useEffect(() => {
    if (props.selectedRoles.length > 0) {
      props.setIsComplete(true);
    } else {
      props.setIsComplete(false);
    }
  }, [props.selectedRoles]);

  useEffect(() => {
    if (isDataReset) {
      if (data_active_roles?.length > 0) {
        if (props.isUpdate) {
          checkSelectedRoles(data_active_roles, props.dataRoleId);
        } else {
          setGridData(data_active_roles);
        }

        checkHistory();
      }
    }
  }, [data_active_roles, isDataReset]);

  useEffect(() => {
    dispatch(getActiveRoles(props.enterpriseId));
  }, [props.enterpriseId]);

  useEffect(() => {
    dispatch(resetRolesData());
    setIsDataReset(true);
  }, [props.formPosition]);

  return (
    <View onStartShouldSetResponderCapture={props.detectOffset}>
      <GridComponent
        loading={loading}
        gridData={gridData}
        gridOptions={gridOptions}
        keyExtractor="roleId"
        colHeight={30}
        tableMaxHeight={200}
        onPressHeaderCheckBox={selectCheckBox}
        onPressCheckBox={selectCheckBox}
        customTableStyle={{
          width: '95%',
          marginHorizontal: '2.5%',
          borderWidth: 1,
          borderColor: '#A8A8A8',
          marginBottom: 10,
        }}
      />
    </View>
  );
};

CreateUserRoles.propTypes = {
  formPosition: PropTypes.number,
  isUpdate: PropTypes.bool,
  dataRoleId: PropTypes.array,
  selectedRoles: PropTypes.array,
  setIsComplete: PropTypes.func,
  enterpriseId: PropTypes.string,
  setSelectedRoles: PropTypes.func,
  detectOffset: () => {},
};

CreateUserRoles.defaultProps = {
  formPosition: 0,
  isUpdate: false,
  dataRoleId: [],
  selectedRoles: [],
  enterpriseId: '',
  setIsComplete: () => {},
  setSelectedRoles: () => {},
  detectOffset: () => {},
};

export default CreateUserRoles;
