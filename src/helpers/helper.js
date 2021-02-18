class Helper {
  static numberFormat(value, symbol, type = 'number') {
    const result = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, symbol);
    return result;
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

      const k = 1000;
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
}

export default Helper;
