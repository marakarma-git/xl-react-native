import reduxString from '../reduxString';
import {dataMatcherArray2D} from './get_sim_inventory_action';
import httpRequest from '../../constant/axiosInstance';

const bannerManagementGetBannerLoading = () => {
  return {
    type: reduxString.BANNER_MANAGEMENT_GET_BANNER_LOADING,
  };
};
const bannerManagementGetBannerSuccess = ({
  dataBanner,
  dataBannerGenerated,
}) => {
  return {
    type: reduxString.BANNER_MANAGEMENT_GET_BANNER_SUCCESS,
    dataBanner,
    dataBannerGenerated,
  };
};
const bannerManagementGetBannerFailed = ({errorText}) => {
  return {
    type: reduxString.BANNER_MANAGEMENT_GET_BANNER_FAILED,
    errorText,
  };
};
const bannerManagementSetDataBannerGenerated = ({dataBannerGenerated}) => {
  return {
    type: reduxString.BANNER_MANAGEMENT_SET_DATA_BANNER_GENERATED,
    dataBannerGenerated,
  };
};
const getBannerList = () => {
  return async (dispatch, getState) => {
    dispatch(bannerManagementGetBannerLoading());
    const {dataBannerHeader} =
      (await getState().banner_management_array_header_reducer) || {};
    httpRequest
      .get('/dcp/banner/getListBanner')
      .then(({data}) => {
        const {result, statusCode} = data || {};
        if (statusCode === 0) {
          const generatedDataTable = dataMatcherArray2D(
            result,
            dataBannerHeader,
          );
          dispatch(
            bannerManagementGetBannerSuccess({
              dataBanner: result,
              dataBannerGenerated: generatedDataTable,
            }),
          );
        } else {
          dispatch(
            bannerManagementGetBannerFailed({
              errorText: 'Failed, to get banner list',
            }),
          );
        }
      })
      .catch((error) => {
        dispatch(
          bannerManagementGetBannerFailed({
            errorText: 'Failed, to get banner list',
            ...error.response.data,
          }),
        );
      });
  };
};
export default getBannerList;
export {bannerManagementSetDataBannerGenerated};
