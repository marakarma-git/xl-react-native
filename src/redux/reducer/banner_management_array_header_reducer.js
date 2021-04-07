import reduxString from '../reduxString';

const dataBannerHeader = [
  {
    formId: 'banner-no-hard-code',
    api_id: 'bannerNo',
    cellType: 'TableCellHeader',
    cellRowType: 'TableCellText',
    config: {
      label: 'Banner No',
      doNotShowOnFilter: true,
    },
    shown: true,
  },
  {
    formId: 'image-name-hard-code',
    api_id: 'imageName',
    cellType: 'TableCellHeader',
    cellRowType: 'TableCellText',
    config: {
      label: 'Image Name',
      doNotShowOnFilter: true,
    },
    shown: true,
  },
  {
    formId: 'file-name-hard-code',
    api_id: 'fileName',
    cellType: 'TableCellHeader',
    cellRowType: 'TableCellText',
    config: {
      label: 'File Name',
      doNotShowOnFilter: true,
    },
    shown: true,
  },
  {
    formId: 'banner-image-hard-code',
    api_id: 'fileName',
    cellType: 'TableCellHeader',
    cellRowType: 'TableCellText',
    config: {
      label: 'Banner Image',
      doNotShowOnFilter: true,
    },
    shown: true,
  },
  {
    formId: 'upload-date-hard-code',
    api_id: 'createdTime',
    cellType: 'TableCellHeader',
    cellRowType: 'TableCellText',
    config: {
      label: 'Upload Date',
      doNotShowOnFilter: true,
      superType: 'DATE',
    },
    shown: true,
  },
];
const initialState = {
  dataBannerHeader: dataBannerHeader,
};
const banner_management_array_header_reducer = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case reduxString.BANNER_MANAGEMENT_UPDATE_BUNDLE_ARRAY: {
      return {
        ...state,
        dataBannerHeader: action.data,
      };
    }
    default: {
      return state;
    }
  }
};
export default banner_management_array_header_reducer;
