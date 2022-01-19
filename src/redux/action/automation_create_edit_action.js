import reduxString from '../reduxString';
import lod from 'lodash';

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

const automationValidationForm = ({dataForm, dataContainerValue}) => {
  const {dataContainer} = dataForm || {};
  let containerParams = {};
  let containerInput = [];
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
        containerParams[`${paramsContainerDefault}`] = true;
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
      }
    }
  });
  return {
    containerParams,
    containerInput,
    containerErrorString,
    counterFalse,
  };
};

export {
  automationContainerSwitch,
  automationAdaptiveOnChange,
  automationValidationForm,
};
