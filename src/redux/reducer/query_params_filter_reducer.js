import reduxString from '../reduxString';
import generateLink from '../../helpers/generateLink';

const initialState = {
  is_now_generated: false,
  filterParams: '',
};
const query_params_filter = (state = initialState, action) => {
  switch (action.type) {
    case reduxString.GENERATE_QUERY_PARAMS_FILTER_RUN:
      return {
        ...state,
        is_now_generated: true,
      };
    case reduxString.GENERATE_QUERY_PARAMS_FILTER:
      const generatedLink = generateLink(action.data);
      return {
        is_now_generated: false,
        filterParams: generatedLink,
      };
    case reduxString.RESET_QUERY_PARAMS_FILTER:
      return state;
    default:
      return state;
  }
};
export default query_params_filter;
