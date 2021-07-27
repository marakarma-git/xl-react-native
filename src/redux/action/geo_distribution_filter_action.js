import reduxString from '../reduxString';
import {callActiveEnterprise} from './user_administration_array_header_action';
import axios from 'axios';
import {base_url} from '../../constant/connection';

const geoDistributionDynamicOnchangeDropDown = ({formId, dropDown}) => {
  return {
    type: reduxString.GEO_DISTRIBUTION_DYNAMIC_ONCHANGE_DROP_DOWN,
    formId,
    dropDown,
  };
};
const geoDistributionDynamicSuccess = ({formId, data}) => {
  return {
    type: reduxString.GEO_DISTRIBUTION_DYNAMIC_SUCCESS,
    formId,
    data,
  };
};
const geoDistributionDynamicFailed = ({formId, errorText}) => {
  return {
    type: reduxString.GEO_DISTRIBUTION_DYNAMIC_FAILED,
    formId,
    errorText,
  };
};
const geoDistributionDynamicLoading = ({formId}) => {
  return {
    type: reduxString.GEO_DISTRIBUTION_DYNAMIC_LOADING,
    formId,
  };
};
const geoDistributionDynamicResetSelectedValue = ({formId}) => {
  return {
    type: reduxString.GEO_DISTRIBUTION_DYNAMIC_RESET_SELECTED_VALUE,
    formId,
  };
};
const geoDistributionResetAllValue = () => {
  return {
    type: reduxString.GEO_DISTRIBUTION_RESET_ALL_VALUE,
  };
};
const geoDistributionGenerateParams = () => {
  return {
    type: reduxString.GEO_DISTRIBUTION_GENERATE_PARAMS,
  };
};
const geoDistributionLoading = () => {
  return {
    type: reduxString.GEO_DISTRIBUTION_LOADING,
  };
};
const geoDistributionFailed = ({errorText}) => {
  return {
    type: reduxString.GEO_DISTRIBUTION_FAILED,
    errorText,
  };
};
const getDistributionSuccess = ({geoMaker, geoMakerApi}) => {
  // geoMaker is for data than was changed to specific requirement for MAP marker
  // geoMakerApi is for raw array data from the api
  return {
    type: reduxString.GEO_DISTRIBUTION_SUCCESS,
    geoMaker,
    geoMakerApi,
  };
};
const geoDistributionSetDataGeoMaker = ({geoMaker}) => {
  //This function used for set dynamic array data when zoom out, zoom in map level delta
  return {
    type: reduxString.GEO_DISTRIBUTION_SET_DATA_GEO_MAKER,
    geoMaker,
  };
};

const getEnterpriseGeo = () => {
  return async (dispatch, getState) => {
    dispatch(
      geoDistributionDynamicLoading({
        formId: '',
      }),
    );
    const {access_token} = (await getState().auth_reducer.data) || {};
    callActiveEnterprise({access_token})
      .then(({data}) => {
        const {result, statusCode} = data || {};
        if (statusCode === 0) {
          const changeArray = result.map(
            ({enterpriseId: thisEnterprise, enterpriseName}) => ({
              value: enterpriseName,
              label: enterpriseName,
            }),
          );
          dispatch(
            geoDistributionDynamicSuccess({
              formId: '',
              data: changeArray,
            }),
          );
        } else {
          dispatch(
            geoDistributionDynamicFailed({
              formId: '',
              errorText: '',
            }),
          );
        }
      })
      .catch((error) => {
        dispatch(
          geoDistributionDynamicFailed({
            formId: '',
            errorText: '',
            ...error.response.data,
          }),
        );
      });
  };
};
const getGeoProvince = () => {
  return async (dispatch, getState) => {
    dispatch(geoDistributionLoading());
    const {access_token} = (await getState().auth_reducer.data) || {};
    const {generatedParams} =
      (await getState().sim_productivity_filter_reducer) || {};
    axios
      .get(
        `${base_url}/dcp/sim/getTotalSimByLocation?zoomLevel=4${
          generatedParams ? generatedParams : ''
        }`
          .split(' ')
          .join('+'),
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
            geoDistributionFailed({
              errorText: '',
            }),
          );
        }
      })
      .catch((error) => {
        dispatch(
          geoDistributionFailed({
            errorText: '',
            ...error.response.data,
          }),
        );
      });
  };
};

export default getGeoProvince;
export {
  getEnterpriseGeo,
  geoDistributionDynamicOnchangeDropDown,
  geoDistributionDynamicResetSelectedValue,
  geoDistributionResetAllValue,
  geoDistributionGenerateParams,
};
