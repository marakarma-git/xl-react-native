import reduxString from '../reduxString';
const generateQueryParamsFilterRun = () => {
  return {
    action: reduxString.GENERATE_QUERY_PARAMS_FILTER_RUN,
  };
};
const generateQueryParamsFilter = (dataToGenerate = []) => {
  return {
    action: reduxString.GENERATE_QUERY_PARAMS_FILTER,
    data: dataToGenerate,
  };
};
const resetQueryParamsFilter = () => {
  return {
    action: reduxString.RESET_QUERY_PARAMS_FILTER,
  };
};
export {
  generateQueryParamsFilterRun,
  generateQueryParamsFilter,
  resetQueryParamsFilter,
};
