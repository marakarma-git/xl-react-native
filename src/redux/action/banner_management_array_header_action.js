import reduxString from '../reduxString';

const bannerManagementUpdateBundleArray = ({data}) => {
  return {
    type: reduxString.BANNER_MANAGEMENT_UPDATE_BUNDLE_ARRAY,
    data,
  };
};
export default bannerManagementUpdateBundleArray;
