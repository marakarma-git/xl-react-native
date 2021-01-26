import reduxString from '../reduxString';
import {
  mergeDataFilter,
  removeAllHardCodeTrue,
  setLoadingFilterFalse,
  setLoadingFilterTrue,
} from './dynamic_array_filter_action';
import axios from 'axios';
import lod from 'lodash';
import randomId from '../../helpers/randomId';
import {base_url} from '../../constant/connection';
import {authLogout} from './auth_action';

const getCustomLabelLoading = () => {
  return {
    type: reduxString.GET_CUSTOM_LABEL_LOADING,
  };
};
const getCustomLabel = (navigation) => {
  return async (dispatch, getState) => {
    dispatch(removeAllHardCodeTrue());
    dispatch(getCustomLabelLoading());
    dispatch(setLoadingFilterTrue());
    const {auth_reducer} = getState();
    const {access_token, principal} = auth_reducer.data || {};
    const {enterpriseId} = principal || {};
    axios
      .get(
        `${base_url}/user/corp/getCustLabelSubscription?enterpriseId=${enterpriseId}`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        },
      )
      .then(({data}) => {
        if (data.error === 'invalid_token') {
          dispatch(authLogout(navigation));
        }
        if (data.statusCode === 0) {
          const modifyArray = data.result.map(
            ({customLabel, customValue, fieldType, labelNumber, ...rest}) => ({
              formId: randomId(),
              disabled: false,
              label: customLabel,
              data:
                fieldType === 'Combo Box'
                  ? lod.split(customValue, ',').map((value) => ({
                      value: value,
                      label: value,
                    }))
                  : [],
              type: fieldType === 'Combo Box' ? 'DropDown' : 'TextInput',
              value: fieldType === 'Combo Box' ? {} : '',
              hard_code: false,
              params: `customLabel${labelNumber}`,
              ...rest,
            }),
          );
          dispatch(mergeDataFilter(modifyArray));
        } else {
          dispatch(setLoadingFilterFalse());
        }
      })
      .catch(() => dispatch(setLoadingFilterFalse()));
  };
};
export {getCustomLabel};
