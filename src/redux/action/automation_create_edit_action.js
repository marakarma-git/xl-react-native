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

const automationResetFormContainerValue = () => {
  return {
    type: reduxString.AUTOMATION_RESET_FORM_CONTAINER_VALUE,
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
export {
  automationContainerSwitch,
  automationAdaptiveOnChange,
  automationResetFormContainerValue,
  automationValidationForm,
  automationCreateSummary,
};
