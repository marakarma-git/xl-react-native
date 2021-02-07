const dataTableHeaderDummy = [
  {
    headerCellType: 'TableCellHeaderOptionCheckBox',
    config: {
      label: 'IMSI',
      width: 200,
      isTouchable: true,
    },
    dataOption: [
      {
        value: 'Select all',
        label: 'select_all',
      },
      {
        value: 'Select all local',
        label: 'select_all_local',
      },
      {
        value: 'Deselect all',
        label: 'deselect_all',
      },
      {
        value: 'Deselect all local',
        label: 'deselect_all_local',
      },
    ],
    shown: true,
  },
  {
    headerCellType: 'TableCellHeaderAscDesc',
    config: {
      label: 'State Lock',
      isTouchable: true,
    },
    shown: true,
  },
  {
    headerCellType: 'TableCellHeaderAscDesc',
    config: {
      label: 'Detected IMEI',
      width: 200,
      isTouchable: true,
    },
    shown: true,
  },
  {
    headerCellType: 'TableCellHeader',
    config: {
      label: 'Peta',
      isTouchable: true,
    },
    shown: true,
  },
];
const dataTableDummy = [
  [
    {
      cellType: 'TableCellCheckBox',
      config: {
        label: 'Table Check Box',
        width: 200,
      },
      otherInformation: {
        other_id: '12321321321321',
        other_name: 'hello world',
      },
    },
    {
      cellType: 'TableCellStatus',
      config: {
        label: 'Table Status',
        ballColor: 'yellow',
      },
      otherInformation: {
        other_id: 'table_status_123',
        other_name: 'table_status',
      },
    },
    {
      cellType: 'TableCellText',
      config: {
        label: 'n321d9k129dk21',

        width: 200,
      },
    },
    {
      cellType: 'TableCellViewMap',
      otherInformation: {
        other_id: 'dummy_123',
        other_name: 'its just dummy button',
      },
    },
  ],
];
