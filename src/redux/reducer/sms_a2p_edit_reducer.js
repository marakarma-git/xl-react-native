import reduxString from '../reduxString';
import lod from 'lodash';

const defaultData = [];
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
      state.dataA2pEdit[getIndex].for_layout_edit_only.value =
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
        const findThis = '';
        const getIndex =
          state.dataA2pEdit.findIndex((f) => f.formId === findThis) || 0;
        state.dataA2pEdit[getIndex].for_layout_edit_only.data =
          action.dataEnterprise;
      }
      if (!lod.isEmpty(action.dataEdit)) {
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
      return state;
    }
    default: {
      return state;
    }
  }
};
export default sms_a2p_edit_reducer;
