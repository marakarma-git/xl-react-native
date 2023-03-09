import reduxString from '../reduxString';
import {
  mergeSpecificDataFilterIndex,
  removeAllHardCodeTrue,
  setLoadingFilterFalse,
  setLoadingFilterTrue,
} from './dynamic_array_filter_action';
import lod from 'lodash';
import {authFailed} from './auth_action';
import httpRequest from '../../constant/axiosInstance';
const getCustomLabelLoading = () => {
  return {
    type: reduxString.GET_CUSTOM_LABEL_LOADING,
  };
};
const getCustomLabel = () => {
  return async (dispatch, getState) => {
    dispatch(removeAllHardCodeTrue());
    dispatch(getCustomLabelLoading());
    dispatch(setLoadingFilterTrue());
    const {auth_reducer} = getState();
    const {principal} = auth_reducer.data || {};
    const {enterpriseId} = principal || {};
    httpRequest
      .get(`/user/corp/getCustLabelSubscription?enterpriseId=${enterpriseId}`)
      .then(({data}) => {
        if (data.statusCode === 0) {
          const modifyArray = data.result.map(
            ({customLabel, customValue, fieldType, labelNumber, ...rest}) => ({
              ...rest,
              formId: `label-${labelNumber}`,
              api_id: `label${labelNumber}`,
              disabled: false,
              data:
                fieldType === 'Combo Box'
                  ? lod.split(customValue, ',').map((value) => ({
                      value: value,
                      label: value,
                    }))
                  : [],
              typeInput: fieldType === 'Combo Box' ? 'DropDown' : 'TextInput',
              value: fieldType === 'Combo Box' ? {} : '',
              hard_code: false,
              cellType: 'TableCellHeaderAscDesc',
              cellRowType: 'TableCellText',
              config: {
                label: customLabel,
                width: 200,
                isTouchable: true,
              },
              params: `&customLabel${labelNumber}=`,
              shown: false,
              sorted: null,
            }),
          );
          dispatch(mergeSpecificDataFilterIndex(modifyArray));
        } else {
          dispatch(setLoadingFilterFalse());
        }
      })
      .catch((error) => {
        console.log(error);
        // dispatch(authFailed(error.response.data));
      });
  };
};
export {getCustomLabel};
