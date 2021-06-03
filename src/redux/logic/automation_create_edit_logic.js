import lod from 'lodash';
import {Alert} from 'react-native';
import {automationSetDataRuleCategoryBulk} from '../action/automation_create_edit_action';

const automation_create_edit_logic = ({
  dataRuleCategory,
  valueEnterprise,
  dispatch,
  result,
}) => {
  let newRuleCategoryData = [];
  let errorContainer = [];
  let countSubmit = 0;
  let countTextField = 0;

  let createData = {
    isDowngrade: false,
    isNotification: false,
    isUpgradeBulk: false,
    isUpgradeIndividual: false,
    notificationEmail: null,
    upgradePackageBulkFrom: null,
    upgradePackageBulkTo: null,
    upgradePackageIndividualFrom: null,
    upgradePackageIndividualTo: null,
    downgradePackageFrom: null,
    downgradePackageTo: null,
  };
  const {autoId} = result || {};
  const {value: enterpriseId, customerNumber} = valueEnterprise || {};
  createData.enterpriseId = enterpriseId;
  if (!lod.isEmpty(result)) {
    createData.autoId = autoId;
    createData.customerNumber = customerNumber;
  }

  dataRuleCategory.map((value) => {
    const {
      card_disabled,
      card_is_checked,
      value: valueOne,
      sub_value,
      card_type,
      params_disabled_api,
      params_value_api,
      params_value_api_to,
    } = value || {};
    if (!card_disabled && card_is_checked) {
      countSubmit++;
      const createObject = {
        ...value,
        value_error_text: lod.isEmpty(valueOne) ? 'This field required' : '',
        sub_value_error_text:
          card_type === 'CardFromTo' && lod.isEmpty(sub_value)
            ? 'This field required'
            : undefined,
      };
      newRuleCategoryData.push(createObject);
      if (lod.isEmpty(valueOne)) {
        countTextField++;
      }
      if (lod.isEmpty(sub_value) && card_type === 'CardFromTo') {
        countTextField++;
      }

      createData[`${params_disabled_api}`] = !card_disabled;
      createData[`${params_value_api}`] =
        card_type === 'CardEmail' ? valueOne : valueOne.value;
      if (card_type === 'CardFromTo') {
        createData[`${params_value_api_to}`] = sub_value.value;
      }
    } else {
      newRuleCategoryData.push(value);
    }
  });

  if (lod.isEmpty(valueEnterprise)) {
    errorContainer.push('Target Enterprise still empty');
  }
  if (countSubmit === 0) {
    errorContainer.push('Please choose minimal one rule of category');
  }
  if (countTextField > 0) {
    errorContainer.push('Please check your input field');
  }

  if (!lod.isEmpty(errorContainer)) {
    Alert.alert('Please check the field', JSON.stringify(errorContainer));
    dispatch(
      automationSetDataRuleCategoryBulk({
        dataRuleCategory: newRuleCategoryData,
      }),
    );
  } else {
    return createData;
  }
};
export {automation_create_edit_logic};
