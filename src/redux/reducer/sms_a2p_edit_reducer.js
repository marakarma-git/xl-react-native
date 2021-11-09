import reduxString from '../reduxString';
import lod from 'lodash';
import Helper from '../../helpers/helper';

const initialState = {
  dataA2pEdit: [],
  dataA2pSnapShot: {},
  errorText: '',
  loading: false,
};
const sms_a2p_edit_reducer = (state = initialState, action) => {
  switch (action.type) {
    case reduxString.SMS_A2P_EDIT_TEXT_INPUT: {
      const getIndex = state.dataA2pEdit.findIndex(
        (f) => f.subItem.formId === action.formId,
      );
      state.dataA2pEdit[getIndex].for_layout_edit_only.edit_value =
        action.valueInput;
      const {data: getSmsData} = Helper.editFormValidator(state.dataA2pEdit);
      return {
        ...state,
        dataA2pEdit: getSmsData,
      };
    }
    case reduxString.SMS_A2P_EDIT_LOADING: {
      return {
        ...state,
        errorText: '',
        loading: true,
      };
    }
    case reduxString.SMS_A2P_EDIT_REMOVE_LOADING: {
      return {
        ...state,
        errorText: '',
        loading: false,
      };
    }
    case reduxString.SMS_A2P_EDIT_SUCCESS: {
      if (!lod.isEmpty(action.dataEditCreate)) {
        return {
          ...state,
          dataA2pEdit: action.dataEditCreate,
          loading: false,
          errorText: '',
        };
      }
      if (!lod.isEmpty(action.dataEdit)) {
        const {dataApi, dataArrayNavigate} = action.dataEdit || {};
        const {dataCell} = dataArrayNavigate || [];
        return {
          ...state,
          errorText: '',
          loading: false,
          dataA2pEdit: dataCell,
          dataA2pSnapShot: dataApi,
        };
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
    case reduxString.SMS_A2P_EDIT_DYNAMIC_FORM_FAILED: {
      return {
        ...state,
        dataA2pEdit: action.dataEditArray,
      };
    }
    case reduxString.SMS_A2P_EDIT_RESET: {
      return {
        ...state,
        dataA2pEdit: [],
        dataA2pSnapShot: {},
        errorText: '',
        loading: false,
      };
    }
    default: {
      return state;
    }
  }
};
export default sms_a2p_edit_reducer;
