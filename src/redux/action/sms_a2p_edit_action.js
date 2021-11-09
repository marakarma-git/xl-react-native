import reduxString from '../reduxString';
import axios from 'axios';
import {base_url} from '../../constant/connection';
import {callActiveEnterprise} from './user_administration_array_header_action';
import lod from 'lodash';
const dataDefaultTableA2pEdit = [
  {
    formId: 'sms-enterprise-name-hard-code',
    subItem: {
      api_id: 'enterpriseName',
      api_force: 'enterpriseId',
      formId: 'sms-enterprise-name-hard-code',
      validationRules: {
        notEmpty: true,
      },
      validationError: '',
    },
    for_layout_edit_only: {
      type_input_edit: 'DropDown',
      edit_label: 'Enterprise Name',
      edit_value: {
        label: '',
        value: '',
      },
      edit_data_array: [],
      errorText: '',
    },
  },
  {
    formId: 'sender-address-hard-code',
    subItem: {
      api_id: 'senderAddress',
      formId: 'sender-address-hard-code',
      validationRules: {
        notEmpty: true,
      },
      validationError: '',
    },
    for_layout_edit_only: {
      type_input_edit: 'TextInput',
      edit_label: 'Sender Address \n(A Number)',
      edit_value: '',
    },
  },
  {
    formId: 'user-name-hard-code',
    subItem: {
      api_id: 'username',
      formId: 'user-name-hard-code',
      validationRules: {
        notEmpty: true,
      },
      validationError: '',
    },
    for_layout_edit_only: {
      type_input_edit: 'TextInput',
      edit_label: 'Username',
      edit_value: '',
      errorText: '',
    },
  },
  {
    formId: 'password-id-hard-code',
    subItem: {
      api_id: 'password',
      formId: 'password-id-hard-code',
      validationRules: {
        notEmpty: true,
      },
      validationError: '',
    },
    for_layout_edit_only: {
      type_input_edit: 'TextInput',
      edit_label: 'Password',
      edit_value: '',
      secure_text_entry: true,
      errorText: '',
    },
  },
  {
    formId: 'registration-id-hard-code',
    subItem: {
      api_id: 'registrationId',
      formId: 'registration-id-hard-code',
      validationRules: {
        notEmpty: true,
      },
      validationError: '',
    },
    api_id: 'registrationId',
    for_layout_edit_only: {
      type_input_edit: 'TextInput',
      edit_label: 'Registration ID',
      edit_value: '',
      errorText: '',
    },
  },
];
const smsA2pEditTextInput = ({valueInput, formId}) => {
  return {
    type: reduxString.SMS_A2P_EDIT_TEXT_INPUT,
    valueInput,
    formId,
  };
};
const smsA2pEditLoading = () => {
  return {
    type: reduxString.SMS_A2P_EDIT_LOADING,
  };
};
const smsA2pEditRemoveLoading = () => {
  return {
    type: reduxString.SMS_A2P_EDIT_REMOVE_LOADING,
  };
};
const smsA2pEditSuccess = (value) => {
  return {
    type: reduxString.SMS_A2P_EDIT_SUCCESS,
    ...value,
  };
};
const smsA2pEditFailed = ({errorText}) => {
  return {
    type: reduxString.SMS_A2P_EDIT_FAILED,
    errorText,
  };
};
const smsA2pEditDynamicFormFailed = ({dataEditArray}) => {
  return {
    type: reduxString.SMS_A2P_EDIT_DYNAMIC_FORM_FAILED,
    dataEditArray,
  };
};
const smsA2pEditReset = () => {
  return {
    type: reduxString.SMS_A2P_EDIT_RESET,
  };
};
const getA2pEnterprise = () => {
  return async (dispatch, getState) => {
    dispatch(smsA2pEditLoading());
    const {access_token} = (await getState().auth_reducer.data) || {};
    callActiveEnterprise({access_token})
      .then(({data}) => {
        const {result, statusCode} = data || {};
        if (statusCode === 0) {
          const changeArray = result.map(
            ({customerNumber, enterpriseName, ...rest}) => ({
              value: customerNumber,
              label: enterpriseName,
              ...rest,
            }),
          );
          const findIndex = 'sms-enterprise-name-hard-code';
          let cloneData = lod.cloneDeep(dataDefaultTableA2pEdit);
          const getIndex = dataDefaultTableA2pEdit.findIndex(
            (f) => f.formId === findIndex,
          );
          cloneData[
            getIndex
          ].for_layout_edit_only.edit_data_array = changeArray;
          dispatch(
            smsA2pEditSuccess({
              dataEditCreate: cloneData,
            }),
          );
        } else {
          dispatch(
            smsA2pEditFailed({
              errorText: 'Error',
            }),
          );
        }
      })
      .catch((error) => {
        dispatch(
          smsA2pEditFailed({
            errorText: 'Error',
            ...error.response.data,
          }),
        );
      });
  };
};
const getA2pEditDetail = (localVariable) => {
  return async (dispatch, getState) => {
    dispatch(smsA2pEditLoading());
    const {access_token} = (await getState().auth_reducer.data) || {};
    const {data_sms_generated} =
      (await getState().sms_a2p_get_all_sms_reducer) || {};
    const {indexSelected, configId} = localVariable || {};
    axios
      .get(
        `${base_url}/dcp/a2pConfiguration/getA2PConfigurationDetail?configId=${configId}`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        },
      )
      .then(({data}) => {
        const {result, statusCode} = data || {};
        if (statusCode === 0) {
          const {password} = result || '';
          const {dataCell} = data_sms_generated[indexSelected];
          let cloneCell = lod.cloneDeep(
            data_sms_generated[indexSelected].dataCell,
          );
          const findIndex = 'password-id-hard-code';
          const getIndex = dataCell.findIndex(
            (f) => f.subItem.formId === findIndex,
          );
          cloneCell[getIndex].for_layout_edit_only.edit_value = password;
          dispatch(
            smsA2pEditSuccess({
              dataEdit: {
                dataApi: result,
                dataArrayNavigate: {
                  ...data_sms_generated[indexSelected],
                  dataCell: cloneCell,
                },
              },
            }),
          );
        } else {
          dispatch(
            smsA2pEditFailed({
              errorText: 'Failed, to get a2p detail',
            }),
          );
        }
      })
      .catch((error) => {
        dispatch(
          smsA2pEditFailed({
            errorText: 'Failed, to get a2p detail',
            ...error.response.data,
          }),
        );
      });
  };
};
const deleteSmsA2p = () => {};
const createSmsA2p = () => {};
export default getA2pEditDetail;
export {
  getA2pEnterprise,
  deleteSmsA2p,
  createSmsA2p,
  smsA2pEditTextInput,
  smsA2pEditReset,
  smsA2pEditDynamicFormFailed,
  smsA2pEditRemoveLoading,
};
