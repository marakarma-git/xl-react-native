import reduxString from '../reduxString';
import lod from 'lodash';
import httpRequest from '../../constant/axiosInstance';

const automationContainerSwitch = ({paramsToWhere}) => {
  return {
    type: reduxString.AUTOMATION_CONTAINER_SWITCH,
    paramsToWhere,
  };
};

const automationAdaptiveOnChange = ({paramsToWhere, realData}) => {
  return {
    type: reduxString.AUTOMATION_ADAPTIVE_ONCHANGE,
    paramsToWhere,
    realData,
  };
};

const automationResetFormContainerValue = () => {
  return {
    type: reduxString.AUTOMATION_RESET_FORM_CONTAINER_VALUE,
  };
};
const automationCreateReduxLoading = () => {
  return {
    type: reduxString.AUTOMATION_CREATE_REDUX_LOADING,
  };
};
const automationCreateReduxError = ({errorText}) => {
  return {
    type: reduxString.AUTOMATION_CREATE_REDUX_ERROR,
    errorText,
  };
};
const automationEnterpriseSuccess = (result) => {
  return {
    type: reduxString.AUTOMATION_ENTERPRISE_SUCCESS,
    result,
  };
};
const automationActiveEnterpriseSuccess = (enterpriseData) => {
  return {
    type: reduxString.AUTOMATION_ACTIVE_ENTERPRISE_SUCCESS,
    enterpriseData,
  };
};
const automationValidationForm = ({dataForm, dataContainerValue}) => {
  const {dataContainer} = dataForm || {};
  let containerParams = {};
  let containerOfContainer = [];
  let containerErrorString = [];
  let counterFalse = 0;

  dataContainer.map((item) => {
    const {containerType, paramsContainerDefault, dataInput, groupByContainer} =
      item || {};
    if (
      dataContainerValue[`${paramsContainerDefault}Disabled`] !== true &&
      dataContainerValue[`${paramsContainerDefault}Hide`] !== true
    ) {
      if (
        containerType === 'WrapperOne' ||
        (containerType === 'WrapperTwo' &&
          dataContainerValue[`${paramsContainerDefault}`] === true &&
          dataContainerValue?.category?.value === groupByContainer)
      ) {
        if (containerType === 'WrapperTwo') {
          containerParams[`${paramsContainerDefault}`] = true;
        }
        let copyContainer = lod.cloneDeep(item);
        let containerInput = [];
        dataInput.map((subItem) => {
          const {validationConfig, paramsDefault, titleInput} = subItem || {};
          const {isRequired, overrideTitleInput, forceSendValue} =
            validationConfig || false;
          if (
            (isRequired &&
              dataContainerValue[`${paramsDefault}Disabled`] !== true &&
              dataContainerValue[`${paramsDefault}Hide`] !== true) ||
            !lod.isEmpty(forceSendValue)
          ) {
            const valueIsObject = lod.isObject(
              dataContainerValue[`${paramsDefault}`],
            )
              ? dataContainerValue[`${paramsDefault}`]?.value
              : dataContainerValue[`${paramsDefault}`];
            containerInput.push(subItem);

            if (forceSendValue) {
              containerParams[`${paramsDefault}`] =
                valueIsObject || forceSendValue;
              return;
            }
            if (!lod.isEmpty(valueIsObject)) {
              containerParams[`${paramsDefault}`] = valueIsObject;
              return;
            }
            containerErrorString.push(
              `Field ${overrideTitleInput || titleInput} is Required`,
            );
            counterFalse = counterFalse + 1;
          }
        });
        const createObject = {
          ...copyContainer,
          dataInput: containerInput,
        };
        containerOfContainer.push(createObject);
      }
    }
  });
  return {
    containerParams,
    containerOfContainer,
    containerErrorString,
    counterFalse,
  };
};
const automationCreateSummary = ({getAllData, dataContainerValue}) => {
  let arraySummary = [];
  let getAllParams = {};
  getAllData.map((item) => {
    const {containerOfContainer, containerParams} = automationValidationForm({
      dataForm: item,
      dataContainerValue,
    });
    getAllParams = {
      ...getAllParams,
      ...containerParams,
    };
    arraySummary = [...arraySummary, ...containerOfContainer];
  });
  return {
    arraySummary,
    getAllParams,
  };
};

const callAutomationEnterprise = (localValue) => {
  return (dispatch) => {
    dispatch(automationCreateReduxLoading());
    const {customerNumber, isReset, dataParams} = localValue || {};
    httpRequest
      .get(
        `/dcp/automation/getAutomationEnterprise?customerNumber=${customerNumber}`,
      )
      .then(({data}) => {
        const {result, statusCode} = data || {};
        const {
          packageBulkUpgradeList,
          packageDowngradeList,
          packageIndividualUpgradeList,
        } = result || {};
        if (statusCode === 0) {
          dispatch(
            automationEnterpriseSuccess({
              ...result,
              ...dataParams,
              isReset,
              packageBulkUpgradeList: packageBulkUpgradeList.map(
                ({packageId, packageDesc}) => ({
                  value: packageId,
                  label: packageDesc,
                }),
              ),
              packageDowngradeList: packageDowngradeList.map(
                ({packageId, packageDesc}) => ({
                  value: packageId,
                  label: packageDesc,
                }),
              ),
              packageIndividualUpgradeList: packageIndividualUpgradeList.map(
                ({packageId, packageDesc}) => ({
                  value: packageId,
                  label: packageDesc,
                }),
              ),
            }),
          );
        } else {
          dispatch(
            automationCreateReduxError({errorText: 'something go wrong'}),
          );
        }
      })
      .catch((e) => {
        dispatch(automationCreateReduxError({errorText: 'something go wrong'}));
      });
  };
};
const callAutomationActiveEnterprise = () => {
  return (dispatch) => {
    dispatch(automationCreateReduxLoading());
    httpRequest
      .get('/user/corp/getActiveEnterprise')
      .then(({data}) => {
        const {result, statusCode} = data || {};
        if (statusCode === 0) {
          const reMap = result.map(
            ({enterpriseId, enterpriseName, ...rest}) => ({
              value: enterpriseId,
              label: enterpriseName,
              ...rest,
            }),
          );
          dispatch(automationActiveEnterpriseSuccess(reMap));
        } else {
          dispatch(
            automationCreateReduxError({errorText: 'something go wrong'}),
          );
        }
      })
      .catch((e) => {
        dispatch(automationCreateReduxError({errorText: 'something go wrong'}));
      });
  };
};
export {
  automationContainerSwitch,
  automationAdaptiveOnChange,
  automationResetFormContainerValue,
  automationValidationForm,
  automationCreateSummary,
  callAutomationEnterprise,
  callAutomationActiveEnterprise,
};
