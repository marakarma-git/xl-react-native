import reduxString from '../reduxString';
import lod from 'lodash';

const defaultData = [
  {
    formId: 'sms-enterprise-name-hard-code',
    api_id: 'enterpriseName',
    for_layout_edit_only: {
      type_input_edit: 'DropDown',
      edit_label: 'Enterprise Name',
      edit_value: {
        label: '',
        value: '',
      },
      edit_data_array: [],
      disabled: true,
    },
  },
  {
    formId: 'sender-address-hard-code',
    api_id: 'senderAddress',
    for_layout_edit_only: {
      type_input_edit: 'TextInput',
      edit_label: 'Sender Address \n(A Number)',
      edit_value: '',
    },
  },
  {
    formId: 'user-name-hard-code',
    api_id: 'username',
    for_layout_edit_only: {
      type_input_edit: 'TextInput',
      edit_label: 'Username',
      edit_value: '',
    },
  },
  {
    formId: 'password-id-hard-code',
    for_layout_edit_only: {
      type_input_edit: 'TextInput',
      edit_label: 'Password',
      edit_value: '',
      secure_text_entry: true,
    },
  },
  {
    formId: 'registration-id-hard-code',
    api_id: 'registrationId',
    for_layout_edit_only: {
      type_input_edit: 'TextInput',
      edit_label: 'Registration ID',
      edit_value: '',
    },
  },
];
const initialState = {
  dataA2pEdit: defaultData,
  dataA2pSnapShot: {},
  errorText: '',
  loading: false,
};
const sms_a2p_edit_reducer = (state = initialState, action) => {
  switch (action.type) {
    case reduxString.SMS_A2P_EDIT_TEXT_INPUT: {
      const getIndex =
        state.dataA2pEdit.findIndex((f) => f.formId === action.formId) || 0;
      state.dataA2pEdit[getIndex].for_layout_edit_only.edit_value =
        action.valueInput;
      return {
        ...state,
        dataA2pEdit: state.dataA2pEdit,
      };
    }
    case reduxString.SMS_A2P_EDIT_LOADING: {
      return {
        ...state,
        errorText: '',
        loading: true,
      };
    }
    case reduxString.SMS_A2P_EDIT_SUCCESS: {
      if (!lod.isEmpty(action.dataEnterprise)) {
        const findThis = 'sms-enterprise-name-hard-code';
        const getIndex =
          state.dataA2pEdit.findIndex((f) => f.formId === findThis) || 0;
        state.dataA2pEdit[getIndex].for_layout_edit_only.edit_data_array =
          action.dataEnterprise;
        state.dataA2pEdit[getIndex].for_layout_edit_only.disabled = false;
      }
      if (!lod.isEmpty(action.dataEdit)) {
        const {dataApi, dataArrayNavigate} = action.dataA2pEdit;

        state.dataA2pEdit = action.dataEdit;
      }
      return {
        ...state,
        errorText: '',
        loading: false,
        dataA2pEdit: state.dataA2pEdit,
      };
    }
    case reduxString.SMS_A2P_EDIT_FAILED: {
      return {
        ...state,
        errorText: action.errorText,
        loading: false,
      };
    }
    case reduxString.SMS_A2P_EDIT_RESET: {
      return {
        ...state,
        dataA2pEdit: [...defaultData],
        dataA2pSnapShot: {},
      };
    }
    default: {
      return state;
    }
  }
};
export default sms_a2p_edit_reducer;
