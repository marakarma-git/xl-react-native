import reduxString from '../reduxString';
import axios from 'axios';
import {base_url} from '../../constant/connection';

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
const smsA2pEditSuccess = () => {
  return {
    type: reduxString.SMS_A2P_EDIT_SUCCESS,
  };
};
const smsA2pEditFailed = ({errorText}) => {
  return {
    type: reduxString.SMS_A2P_EDIT_FAILED,
    errorText,
  };
};
const smsA2pEditReset = () => {
  return {
    type: reduxString.SMS_A2P_EDIT_RESET,
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
        `${base_url}/api/dcp/a2pConfiguration/getA2PConfigurationDetail?configId=${configId}`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        },
      )
      .then(({data}) => {
        const {result, statusCode} = data || {};
        if (statusCode === 0) {
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
export {deleteSmsA2p, createSmsA2p, smsA2pEditTextInput, smsA2pEditReset};
