class Helper {

  static numberFormat(value, symbol, type = 'number') {
    if (typeof value == 'object') return "Invalid Value";

    if (type == 'gbFormat') {
      value = Math.round(+value / 1000000);
      return Number(value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, symbol)) + " GB";
    } else {
      return Number(value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, symbol));
    }

  }

  static formatBytes(bytes) {
    if (!isNaN(bytes)) {
      const decimals = 2
      if (bytes === 0) return '0 B';

      const k = 1000;
      const dm = decimals < 0 ? 0 : decimals;
      const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

      const i = Math.floor(Math.log(bytes) / Math.log(k));

      return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }
    else {
      return '-'
    }
  }

}

export default Helper;