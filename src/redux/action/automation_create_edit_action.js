import reduxString from '../reduxString';
import lod from 'lodash';
import httpRequest from '../../constant/axiosInstance';
import {forRulesValueParams} from '../reducer/automation_create_edit_reducer';

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
const automationCreateReduxLoadingFalse = () => {
  return {
    type: reduxString.AUTOMATION_CREATE_REDUX_LOADING_FALSE,
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
          const {isRequired, overrideTitleInput, forceSendValue, emailType} =
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

            if (
              emailType === true &&
              !/\S+@\S+\.\S+/.test(valueIsObject || forceSendValue)
            ) {
              containerErrorString.push(
                `Field Email ${overrideTitleInput || titleInput} Format False `,
              );
              counterFalse = counterFalse + 1;
            }
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
const createForRuleValueParams = (dataParams = {}, result = {}) => {
  let containerForRules = {};
  if (!lod.isEmpty(dataParams) && !lod.isEmpty(result)) {
    forRulesValueParams.map((item) => {
      const {typeParams, paramsDefault, paramsDefaultValue, paramsData} =
        item || {};
      if (typeParams === 'DualValue') {
        result[`${paramsData}`]?.map(({packageId, packageDesc}) => {
          if (packageId === dataParams[`${paramsDefault}From`]) {
            containerForRules = {
              ...containerForRules,
              [`${paramsDefault}From`]: {
                value: packageId,
                label: packageDesc,
              },
            };
          }
          if (packageId === dataParams[`${paramsDefault}To`]) {
            containerForRules = {
              ...containerForRules,
              [`${paramsDefault}To`]: {
                value: packageId,
                label: packageDesc,
              },
            };
          }
        });
      }
      if (typeParams === 'SingleValue') {
        containerForRules = {
          ...containerForRules,
          [`${paramsDefault}`]: dataParams[`${paramsDefault}`]
            ? dataParams[`${paramsDefault}`]
            : paramsDefaultValue,
        };
      }
    });
  }
  return containerForRules;
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
          const getRules = createForRuleValueParams(dataParams?.result, result);
          dispatch(
            automationEnterpriseSuccess({
              ...result,
              ...dataParams,
              forRulesValue: getRules,
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
  automationCreateReduxLoadingFalse,
  automationCreateReduxLoading,
};

// NOTES AUTOMATION
//
// CREATE:
//   Step 1:
// Enterprise
// customerNumber (will be used as getPackage on several rules below)
// enterpriseId
// enterpriseName
//
// Step 2:
// rulesName: ’string’,
// category: businessAutomation / fraudPrevention
//
// Step 3:
// ====== Category: Business Automation =======
//   category: businessAutomation
//
// 1. Bulk Shared Auto Upgrade  - isUpgradeBulk
// --From - upgradePackageBulkFrom
// --To - upgradePackageBulkTo
//
// 2. Auto Downgrade Package - isDowngrade
// --From - downgradePackageFrom
// --To - downgradePackageTo
//
// 3. Individual Shared Package Auto Upgrade - isUpgradeIndividual
// --From - upgradePackageIndividualFrom
// --To - upgradePackageIndividualTo
// --Threshold - thresholdUpgradeIndividual
//
// ====== Category: FRAUD PREVENTION =======
//   category: fraudPrevention
//
// 4. Bulk Shared Limit Notification - isBulkNotification
// --Email Add - notificationBulkEmail
// -- Threshold - thresholdBulkNotification
//
// 5. Individual Shared Limit - isIndividualNotification
// --Email Add - notificationIndividualEmail
// --Threshold - thresholdIndividualNotification
//
// === GET DEFINED RULES PACKAGE LIST AND ELIGIBLE RULES ===
// after enterprise selected and get customerNumber from it,
//   call this to get package list and eligible rules: automation/getAutomationEnterprise?customerNumber=enterpriseNumbernya
//
//   Bulk Shared Auto Upgrade:
//   bulkUpgrade -toggle
// packageBulkUpgradeList - from & to
//
// auto Downgrade Upgrade:
//   ga ada toggle logic (jadi bisa dienable disabled bebas)
// packageDowngradeList - from & to
//
// Individual Shared Package Auto Upgrade:
//   individualUpgrade -toggle
// packageIndividualUpgradeList - from & to
//
// Bulk Shared Limit Notification:
//   bulkNotification - toggle
//
// Individual Shared Limit:
//   individualNotification - toggle
//
//
// ~~~~~~~~~~~~~~~~~~
//
//   Edit:
// 1. call api to get details: /dcp/automation/getAutomationDetail?automationId=autoIdnya
//   mapping attibute response same as create, which are:
//
//   Step 1:
// Enterprise
// enterpriseId - option will find the selected value based on enterpriseId
//
// Step 2:
// rulesName: ’string’,
// category: businessAutomation / fraudPrevention
//
// Step 3:
// ====== Category: Business Automation =======
//   category: businessAutomation
//
// 1. Bulk Shared Auto Upgrade  - isUpgradeBulk
// --From - upgradePackageBulkFrom
// --To - upgradePackageBulkTo
//
// 2. Auto Downgrade Package - isDowngrade
// --From - downgradePackageFrom
// --To - downgradePackageTo
//
// 3. Individual Shared Package Auto Upgrade - isUpgradeIndividual
// --From - upgradePackageIndividualFrom
// --To - upgradePackageIndividualTo
// --Threshold - thresholdUpgradeIndividual
//
// POST AN UPDATE TO API
// params same as create, but add additional params:
//   “autoId”
// autoId = autoId value from api: dcp/automation/getListAutomation
//
// endpoint to update: /api/dcp/automation/updateAutomation
//
// ~~~~~~~~~~~~~~~~~~
//
//   View:
// call api to get details: /dcp/automation/getAutomationDetail?automationId=autoIdnya
