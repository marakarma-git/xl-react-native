import {DRAWER_MENU_PRIVILEDGE} from '../constant/priviledge';
import dayjs from 'dayjs';
import lod from 'lodash';

class Helper {
  static numberFormat(value, symbol, type = 'number') {
    const result = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, symbol);
    return result;
  }

  static makeCapital(value) {
    let capitalWord = '';
    for (let i = 0; i < value.length; i++) {
      if (i === 0) {
        capitalWord += value[i].toUpperCase();
      } else {
        capitalWord += value[i];
      }
    }

    return capitalWord;
  }

  static formatBytes(bytes) {
    if (!isNaN(bytes)) {
      const decimals = 2;
      if (bytes === 0) {
        return '0 B';
      }

      if (bytes < 1) {
        return bytes + 'KB';
      }

      const k = 1024;
      const dm = decimals < 0 ? 0 : decimals;
      const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

      const i = Math.floor(Math.log(bytes) / Math.log(k));

      return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    } else {
      return '-';
    }
  }

  static convertToByte(value, type) {
    const dataType = [
      {
        type: 'KB',
        value: 1000,
      },
      {
        type: 'MB',
        value: 1000000,
      },
      {
        type: 'GB',
        value: 1000000000,
      },
      {
        type: 'TB',
        value: 1000000000000,
      },
      {
        type: 'KiB',
        value: 1024,
      },
      {
        type: 'MiB',
        value: 1048576,
      },
      {
        type: 'GiB',
        value: 1073741824,
      },
      {
        type: 'TiB',
        value: 1099511627776,
      },
    ];
    const convertVal = dataType.find((d) => d.type === type);
    return convertVal.value * value;
  }

  static sortAscending(data, key) {
    if (typeof data === 'object') {
      for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data.length - 1; j++) {
          if (data[j][key] > data[j + 1][key]) {
            let temp = data[j];
            data[j] = data[j + 1];
            data[j + 1] = temp;
          }
        }
      }

      return data;
    } else {
      return data;
    }
  }

  static findAndReturnPriviledge = (
    menuName,
    actionName,
    userPriviledge,
    priviledgeData,
  ) => {
    let isHasPriviledge = false;
    let menuData = priviledgeData.filter(
      (priviledge) => priviledge.menuName == menuName,
    );
    let menuDetail = menuData.find((menu) => menu.actionName == actionName);

    for (let i = 0; i < userPriviledge.length; i++) {
      if (menuDetail) {
        if (menuDetail.privId == userPriviledge[i]) {
          isHasPriviledge = true;
          break;
        }
      }
    }

    return isHasPriviledge;
  };

  static findAndReturnActivityLogData = (
    menuName,
    actionName,
    userPriviledge,
    priviledgeData,
  ) => {
    let returnData = new Array();
    let menuData = priviledgeData.filter(
      (priviledge) => priviledge.menuName == menuName,
    );
    let menuDetail = menuData.find((menu) => menu.actionName == actionName);

    for (let i = 0; i < userPriviledge.length; i++) {
      if (menuDetail) {
        if (menuDetail.privId == userPriviledge[i]) {
          returnData.push(menuDetail);
          break;
        }
      }
    }
    return returnData;
  };

  static findAndReturnActivityLogDataStaticPriv = (
    menuName,
    actionName,
    priviledgeData,
  ) => {
    let menuData = priviledgeData.filter(
      (priviledge) =>
        priviledge.menuName == menuName && priviledge.actionName == actionName,
    );

    return menuData;
  };

  static drawerData(userPriviledge = [], type = 'drawer') {
    const drawerMenuPriv = [...DRAWER_MENU_PRIVILEDGE];
    const drawerMenu = new Array();

    drawerMenuPriv.map((drawer) => {
      let isAdded = true;
      let priviledgeData = new Array();

      if (drawer.type == 'drawer') {
        if (drawer.priviledgeIds.length > 0) {
          priviledgeData = Helper.checkPriviledgeCount(
            userPriviledge,
            drawer.priviledgeIds,
          );
          if (priviledgeData.length == 0) {
            isAdded = false;
          }
        }
      }

      if (isAdded) {
        if (drawer.subMenu) {
          Helper.checkAddedSubMenu(drawer, priviledgeData);
          if (type != 'drawer') {
            drawer.subMenu.map((subMenu) => {
              drawerMenu.push(subMenu);
            });
          }
        }
        if (type == 'drawer') {
          if (drawer.type == 'drawer') {
            drawerMenu.push(drawer);
          }
        } else {
          drawerMenu.push(drawer);
        }
      }
    });

    return drawerMenu;
  }

  static checkPriviledgeCount(userPriviledge = [], drawerPriviledge) {
    let priviledgeData = new Array();
    let isHasPriviledge = false;

    drawerPriviledge.map((drawPriv) => {
      isHasPriviledge = userPriviledge.some(
        (privId) => privId == drawPriv.privId,
      );
      if (isHasPriviledge) {
        priviledgeData.push(drawPriv);
      }
    });

    return priviledgeData;
  }

  static checkAddedSubMenu(menuData, priviledgeData) {
    menuData.subMenu.map((menu, index) => {
      let isSubMenuAdded = priviledgeData.some(
        (priviledge) => priviledge.menuName == menu.name,
      );
      menu.isVisible = isSubMenuAdded;
    });
  }

  static sortDescending(data, key) {
    if (typeof data === 'object') {
      for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data.length - 1; j++) {
          if (data[j][key] < data[j + 1][key]) {
            let temp = data[j];
            data[j] = data[j + 1];
            data[j + 1] = temp;
          }
        }
      }

      return data;
    } else {
      return data;
    }
  }

  static objectToString(object) {
    const arrayFormat = [];

    for (let key in object) {
      arrayFormat.push(`${key}: ${object[key]}`);
    }

    return arrayFormat.join();
  }

  static mergeToSpecificIndex = (first_array, second_array, index = 0) =>
    first_array.splice(index, 0, ...second_array) && first_array;

  static numberWithCommas(x) {
    if (x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
  }

  static numberWithDot(x) {
    if (x || x == 0) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    }
  }

  static numberFromBE(labelValue) {
    if (labelValue) {
      return labelValue
        .toString()
        .replace('.', ',')
        .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    }
  }

  static dynamicResetForm = (data) => {
    const {typeInput, formId, ...value} = data || {};
    switch (typeInput) {
      case 'DropDown':
        return {
          ...value,
          formId: formId,
          typeInput: typeInput,
          value: {},
        };
      case 'DropDownType2':
        return {
          ...value,
          formId: formId,
          value: '',
          typeInput: typeInput,
          selectedValue: {},
        };
      case 'TextInput':
        return {
          ...value,
          formId: formId,
          typeInput: typeInput,
          value: '',
        };
      case 'DateTimePicker':
        return {
          ...value,
          isSelected: false,
          formId: formId,
          typeInput: typeInput,
          value: dayjs().toDate(),
        };
      default:
        return {
          formId,
          ...value,
        };
    }
  };

  static resetAllForm(data = []) {
    return data.map(({formId, typeInput, defaultDisabled, ...rest}) => {
      switch (typeInput) {
        case 'DropDown':
          return {
            ...rest,
            formId: formId,
            disabled: defaultDisabled,
            typeInput: typeInput,
            value: {},
          };
        case 'DropDownType2':
          return {
            ...rest,
            formId: formId,
            value: '',
            typeInput: typeInput,
            selectedValue: {},
          };
        case 'TextInput':
          return {
            ...rest,
            formId: formId,
            typeInput: typeInput,
            value: '',
          };
        case 'DateTimePicker':
          return {
            ...rest,
            isSelected: false,
            formId: formId,
            typeInput: typeInput,
            value: dayjs().toDate(),
          };
        case 'ForParamsOnlyDropDown':
          return {
            formId: formId,
            typeInput: typeInput,
            value: {},
            ...rest,
          };
        default:
          return {
            formId,
            ...rest,
          };
      }
    });
  }

  static makeMultiDimensionalArrayTo2DArray(
    data,
    newData = [],
    currentLevel = 0,
  ) {
    console.log('Re Format');
    data.map((value, index) => {
      value.level = currentLevel;
      value.visibility = true;
      value.childrenCnt = value.children.length;
      value.collapse = true;
      Object.keys(value).map((objValue, index) => {
        if (typeof value[objValue] === 'object' && value[objValue] != null) {
          currentLevel++;
          value.icon = value[objValue].length > 0 && 'caret-down';
          value.treeCheck = false;
          value.isDisabled = true;

          newData.push(value);
          if (value[objValue].length > 0) {
            return Helper.makeMultiDimensionalArrayTo2DArray(
              value[objValue],
              newData,
              currentLevel,
            );
          }
        }
      });
      currentLevel--;
    });

    newData.map((data, index) => {
      data.index = index;
    });

    return newData;
  }

  static manipulateIsDisabledArray(dataArray) {
    dataArray.map((data, index) => {
      data.isDisabled = false;
      data.treeCheck = false;
    });

    return dataArray;
  }

  static treeViewToggle(gridData, cellId) {
    const newData = new Array();

    let isRoot = false;
    gridData.map((data) => {
      if (data.enterpriseId == cellId) {
        if (data.enterpriseParentId === null) {
          isRoot = true;
        }
      }

      if (isRoot) {
        if (data.enterpriseId !== cellId) {
          data.visibility = !data.collapse;
          data.collapse = !data.collapse;
        }
      } else {
        if (data.enterpriseParentId === cellId) {
          data.visibility = !data.visibility;
        }
      }

      if (data.icon) {
        data.icon = data.icon == 'caret-down' ? 'caret-up' : 'caret-down';
      }

      newData.push(data);
    });

    return newData;
  }

  static resetDataCheckboxToggle(gridData) {
    const newData = new Array();

    gridData.map((data) => {
      data.treeCheck = false;

      newData.push(data);
    });

    return newData;
  }

  static checkboxToggle(gridData, cellId, selectedRadio = 1) {
    const newData = new Array();
    let isRoot = false;
    let parentCheck = false;

    gridData.map((data) => {
      if (data.enterpriseId == cellId) {
        if (data.enterpriseParentId === null) {
          isRoot = true;
        }
        parentCheck = !data.treeCheck;
        data.treeCheck = !data.treeCheck;
      }

      if (isRoot) {
        if (data.enterpriseId !== cellId) {
          if (selectedRadio === 1) {
            data.isDisabled = !data.isDisabled;
          }
          data.treeCheck = parentCheck;
        }
      } else {
        if (data.enterpriseParentId === cellId) {
          if (selectedRadio === 1) {
            data.isDisabled = !data.isDisabled;
          }
          data.treeCheck = parentCheck;
        }
      }

      newData.push(data);
    });

    return newData;
  }

  static checkSelectedData(newData) {
    const selectedData = new Array();

    newData.map((data, index) => {
      if (data.treeCheck) {
        selectedData.push(data);
      }
    });

    return selectedData;
  }

  static formValidation(
    formKey,
    formTitle,
    validationRules,
    formData,
    errorValidation,
  ) {
    const splitValidation = String(validationRules).split('|');

    splitValidation.map((type) => {
      switch (type) {
        case 'required':
          errorValidation[formKey] = Helper.validationIsRequired(
            formKey,
            formTitle,
            formData,
          );
          break;
        case 'isEmail':
          errorValidation[formKey] = Helper.validateEmail(formKey, formData);
          break;

        default:
          errorValidation[formKey] = Helper.validationIsRequired(
            formKey,
            formTitle,
            formData,
          );
      }
    });

    // console.log(errorValidation)

    return errorValidation[formKey];
  }

  static validationIsRequired(formKey, formTitle, formData) {
    let errorMsg = '';
    if (formData[formKey].length <= 0) {
      errorMsg = `${formTitle} is required`;
    }

    return errorMsg;
  }

  static validateEmail(formKey, formData) {
    let errorMsg = '';
    let re = /\S+@\S+\.\S+/;

    if (re.test(formData[formKey]) == false) {
      errorMsg = 'Email is not valid!';
    }

    return errorMsg;
  }

  static semVerCheck = (upcomingVersion, currentVersion) => {
    // this function returns true when there is a major update
    // Data Sample
    // const versionA = '14.8.3';
    // const versionB = '15.1.1';
    const [majorA, minorA, patchA] = String(upcomingVersion)
      .split('.')
      .map((v) => Number.parseInt(v));
    const [majorB, minorB, patchB] = String(currentVersion)
      .split('.')
      .map((v) => Number.parseInt(v));
    return majorA > majorB;
    // can be modified as below
    // if (majorA !== majorB) {
    //   return majorA > majorB;
    // }
    // if (minorA !== minorB) {
    //   return minorA > minorB;
    // }
    // return patchA > patchB;
  };

  static merge2ArrayObject = async ({arrayFrom, arrayTo}) => {
    const copyArray = lod.cloneDeep(arrayTo);
    await arrayFrom.map((item) => {
      const {formIdTo, value, data, disabled} = item || {};
      const findIndex = arrayTo.findIndex((f) => f.formId === formIdTo);
      copyArray[findIndex].value = value;
      copyArray[findIndex].data = data || [];
      copyArray[findIndex].disabled = disabled;
    });
    return {
      newArray: copyArray,
    };
  };

  static mergeMultiDataProvince = (data, isProvince) => {
    if (data) {
      let mergedData = data.reduce((a, c) => {
        let x = a.find((e) => e.province === c.province);
        if (!isProvince) {
          x = a.find((e) => e.city + e.province === c.city + c.province);
        }
        if (!x) {
          a.push(Object.assign({}, c));
        } else {
          x.total += c.total;
        }
        return a;
      }, []);
      return mergedData;
    }
  };

  static findRedundantObject = (data = [], findBy, staticInfoObject) => {
    let container = [];
    data.map((item) => {
      const isAvailable =
        container.find((f) => f[`${findBy}`] === item[`${findBy}`]) ||
        'not_found';
      if (isAvailable === 'not_found') {
        container.push({
          ...item,
          ...staticInfoObject,
          count_object_found: 1,
        });
      } else {
        const findIndex = container.findIndex(
          (f) => f[`${findBy}`] === item[`${findBy}`],
        );
        container[findIndex].count_object_found =
          container[findIndex].count_object_found + 1;
        container[findIndex].total = container[findIndex].total + item.total;
      }
    });
    return container;
  };

  static arrayGroupBy = (data = [], groupBy, target, staticInfoObject) => {
    let container = [];
    data.map((value) => {
      if (value[`${groupBy}`] === target) {
        container.push({
          ...value,
          ...staticInfoObject,
        });
      } else {
        container.push({
          ...value,
          ...staticInfoObject,
        });
      }
    });
    return container;
  };
}

export default Helper;

export const Regex = {
  multipleEmailSeparateComma: /^(\s?[^\s,]+@[^\s,]+\.[^\s,]+\s?,)*(\s?[^\s,]+@[^\s,]+\.[^\s,]+)$/g,
};
