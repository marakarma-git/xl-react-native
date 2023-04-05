import Axios from 'axios';
import Helper from '../../helpers/helper';
import reduxString from '../reduxString';
import httpRequest from '../../constant/axiosInstance';

const setDashboardSummary = (data) => ({
  type: reduxString.SET_DASHBOARD_SUMMARY,
  payload: data,
});

const requestDashboardData = () => ({
  type: reduxString.REQUEST_DASHBOARD_DATA,
});

const requestTopTraffic = () => ({
  type: reduxString.REQUEST_TOP_TRAFFIC,
});

const requestTopDevice = () => ({
  type: reduxString.REQUEST_TOP_DEVICE_BRAND,
});

const requestDevicePopulation = () => ({
  type: reduxString.REQUEST_DEVICE_POPULATION,
});

const requestCustomStatistics = () => ({
  type: reduxString.REQUEST_CUSTOM_STATISTICS,
});

const requestFinanceReport = () => ({
  type: reduxString.REQUEST_FINANCE_REPORT,
});

const request12MonthUsage = () => ({
  type: reduxString.REQUEST_12_MONTH_USAGE,
});

const requestMonthUsage = () => ({
  type: reduxString.REQUEST_MONTH_USAGE,
});

const requestAggregatedTraffic = () => ({
  type: reduxString.REQUEST_AGGREGATED_TRAFFIC,
});

const requestSubsAnalytics = () => ({
  type: reduxString.REQUEST_SUBS_ANALYTICS,
});

export const setRequestError = (error) => ({
  type: reduxString.REQUEST_ERROR,
  payload: error,
});

export const getDashboardSummary = () => {
  return async (dispatch) => {
    const customHeaders = {
      headers: {
        activityId: 'DP-2',
      },
    };
    try {
      dispatch(requestDashboardData());
      const {data} = await httpRequest.get(
        `/dcp/dashboard/getSummaryDashboard`,
        customHeaders,
      );
      if (data) {
        if (data.statusCode === 0) {
          const summaryData = [
            {title: 'Total SIM Card', resultId: 'totalsimcard'},
            {title: 'Total Active Session', resultId: 'totalactivesession'},
            {title: 'Total Active SIM Card', resultId: 'totalactivesim'},
            {
              title: 'Total Aggregated Traffic',
              resultId: 'totalaggregatedtraffic',
            },
          ];
          Object.keys(data.result).map((keys) => {
            summaryData.map((sumData, index) => {
              if (keys === sumData.resultId) {
                summaryData[index].value = data.result[keys];
              }
            });
          });

          dispatch(setDashboardSummary(summaryData));
        } else {
          throw new Error(data);
        }
      }
    } catch (error) {
      dispatch(setRequestError(error.response.data));
    }
  };
};

const setWidgetList = (data) => ({
  type: reduxString.SET_WIDGET_LIST,
  payload: data,
});

const setEnterpriseList = (data) => {
  const newDataSet = [];

  data.map((datas, i) => {
    newDataSet.push({
      label: datas.enterpriseName,
      value: datas.enterpriseId,
    });
  });
  return {
    type: "SET_ENTERPRISE_LIST",
    payload: newDataSet,
  };
};

export const getWidgetList = (accessToken) => {
  return async (dispatch) => {
    try {
      dispatch(requestDashboardData());
      const {data} = await httpRequest.get(`/dcp/dashboard/getWidgetList`);

      if (data) {
        if (data.statusCode === 0) {
          dispatch(setWidgetList(data.result.reverse()));
        } else {
          throw new Error(data);
        }
      }
    } catch (error) {
      dispatch(setRequestError(error.response.data));
    }
  };
};

export const getEnterpriseList = (accessToken) => {
  return async (dispatch) => {
    // let config = {
    //   method: 'get',
    //   url: 'http://18.141.189.242/api/user/corp/getActiveEnterprise',
    //   excludeParamsKey: '',
    //   Authorization: 'Bearer ',
    // };
    
    // await Axios.request(config)
    //   .then((response) => {
    //     // var resdata = JSON.stringify(response.data);
    //     var resdata = response.data;
    //     // console.log("RESDATA ==================================>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
    //     console.log(resdata)
    //     if (resdata) {
    //       if (resdata.statusCode === 0) {
    dispatch(
      setEnterpriseList([
          {
            "enterpriseId": "be711a86-ee30-47a3-af6f-c9d76f78a9b0",
            "enterpriseName": " PT Pasifik Cipta Solusi",
            "agreementNumber": "10209",
            "customerNumber": "07000163"
          },
          {
            "enterpriseId": "91500849-5cbd-4a71-ab06-84a05d078f74",
            "enterpriseName": "BTPN Trial",
            "agreementNumber": "10147",
            "customerNumber": "07000070"
          },
          {
            "enterpriseId": "59176a35-a594-4dd4-9e46-9af44db41c14",
            "enterpriseName": "Bogor Tech Trial",
            "agreementNumber": "BGRTech2019",
            "customerNumber": "07000098"
          },
          {
            "enterpriseId": "5e9e5400-c43d-4a9e-9065-b6c5704356bb",
            "enterpriseName": "CR Test Enterprise",
            "agreementNumber": "01",
            "customerNumber": "001"
          },
          {
            "enterpriseId": "3b6d290e-9199-4792-9243-e4d7e65d2605",
            "enterpriseName": "CR Test Enterprise 2",
            "agreementNumber": "02",
            "customerNumber": "002"
          },
          {
            "enterpriseId": "032086fe-da05-4a4b-a25c-5c047efd2731",
            "enterpriseName": "CR Test Enterprise 3",
            "agreementNumber": "string",
            "customerNumber": "003"
          },
          {
            "enterpriseId": "10e0a4f4-b95e-43d0-837e-e9a1c0ab9b98",
            "enterpriseName": "DCP 4.0",
            "agreementNumber": "1",
            "customerNumber": "1234567"
          },
          {
            "enterpriseId": "c3e91ab8-663c-4e27-b78f-b26b4f90d54a",
            "enterpriseName": "Enterprise New Test",
            "agreementNumber": "1111",
            "customerNumber": "071234567"
          },
          {
            "enterpriseId": "f99efcb2-beb9-4c70-87f9-bba0aea38a51",
            "enterpriseName": "Enterprise New Testqqq",
            "agreementNumber": "1111",
            "customerNumber": "0711111234"
          },
          {
            "enterpriseId": "52ca751b-263a-452d-9c7d-cbf770d834f4",
            "enterpriseName": "Enterprise Test",
            "agreementNumber": "321321",
            "customerNumber": "321321"
          },
          {
            "enterpriseId": "5a6f3c74-4314-4211-bc40-2d7a8e76d7d5",
            "enterpriseName": "ISDigital Trial",
            "agreementNumber": "201912230001",
            "customerNumber": "07000105"
          },
          {
            "enterpriseId": "4fb52976-3f24-4f0f-883d-ec838a69da48",
            "enterpriseName": "Indomobil Prima Energi",
            "agreementNumber": "000",
            "customerNumber": "07000138"
          },
          {
            "enterpriseId": "5259932e-3f9b-442d-a38d-01d580fd1d46",
            "enterpriseName": "NOSAIRIS TEKNOLOGI SOLUTIONS",
            "agreementNumber": "7000032",
            "customerNumber": "07000032"
          },
          {
            "enterpriseId": "3d25eb18-8bb3-11ea-a7a0-005056a51573",
            "enterpriseName": "PLN APD Jakarta",
            "agreementNumber": null,
            "customerNumber": "07000113"
          },
          {
            "enterpriseId": "3d25f2a2-8bb3-11ea-a7a0-005056a51573",
            "enterpriseName": "PLN AREA BABEL",
            "agreementNumber": null,
            "customerNumber": "07000069"
          },
          {
            "enterpriseId": "32bda269-255b-419c-a04d-939b0d380b00",
            "enterpriseName": "PLN AREA BALI",
            "agreementNumber": "10119",
            "customerNumber": "07000052"
          },
          {
            "enterpriseId": "440aeb1e-3c34-42d0-a63d-f4380aa4d1b1",
            "enterpriseName": "PLN AREA DISJABAR",
            "agreementNumber": "10121",
            "customerNumber": "07000054"
          },
          {
            "enterpriseId": "0a3176dc-00df-400e-b5a1-f90c1238fa73",
            "enterpriseName": "PLN AREA DISJATENG",
            "agreementNumber": "10122",
            "customerNumber": "07000055"
          },
          {
            "enterpriseId": "3d25f4aa-8bb3-11ea-a7a0-005056a51573",
            "enterpriseName": "PLN AREA DISJAYA",
            "agreementNumber": null,
            "customerNumber": "07000053"
          },
          {
            "enterpriseId": "5dea48ed-8da1-4676-af37-77360e5e89ab",
            "enterpriseName": "PLN AREA Disbanten",
            "agreementNumber": "10172",
            "customerNumber": "07000121"
          },
          {
            "enterpriseId": "3d25e852-8bb3-11ea-a7a0-005056a51573",
            "enterpriseName": "PLN AREA JAWA TIMUR",
            "agreementNumber": null,
            "customerNumber": "07000051"
          },
          {
            "enterpriseId": "cc33c757-1cf2-4e0d-9e1d-f38bd8850209",
            "enterpriseName": "PLN AREA KSKT",
            "agreementNumber": "10127",
            "customerNumber": "07000060"
          },
          {
            "enterpriseId": "873718dc-43be-46f5-a7b7-f6824bdc2efa",
            "enterpriseName": "PLN AREA PAMEKASAN",
            "agreementNumber": "10124",
            "customerNumber": "07000057"
          },
          {
            "enterpriseId": "afccaf3d-99ea-4911-b6c1-421cf7b30cb2",
            "enterpriseName": "PLN AREA SULSELRABAR",
            "agreementNumber": "10128",
            "customerNumber": "07000061"
          },
          {
            "enterpriseId": "28385127-bcd3-4784-8b88-b9eeec7cea24",
            "enterpriseName": "PLN AREA SUMBAR",
            "agreementNumber": "10191",
            "customerNumber": "07000145"
          },
          {
            "enterpriseId": "c5db7c00-7235-4b11-ba35-f6476b0fb7f5",
            "enterpriseName": "PLN AREA SUMUT",
            "agreementNumber": "10123",
            "customerNumber": "07000056"
          },
          {
            "enterpriseId": "c4f7f2f4-af2e-4765-930a-5e3f4a542b66",
            "enterpriseName": "PLN AREA UID LAMPUNG",
            "agreementNumber": "10126",
            "customerNumber": "07000059"
          },
          {
            "enterpriseId": "3d25fa18-8bb3-11ea-a7a0-005056a51573",
            "enterpriseName": "PLN AREA WS2JB",
            "agreementNumber": null,
            "customerNumber": "07000058"
          },
          {
            "enterpriseId": "cd00e28e-6f74-44f7-987b-5c5d88c70307",
            "enterpriseName": "PLN DISJATIM AREA Banyuwangi",
            "agreementNumber": "7000014",
            "customerNumber": "07000014"
          },
          {
            "enterpriseId": "3d25f810-8bb3-11ea-a7a0-005056a51573",
            "enterpriseName": "PLN Regional KSKT",
            "agreementNumber": null,
            "customerNumber": "07000090"
          },
          {
            "enterpriseId": "e657b225-082e-4b7e-941f-087a2e59cbc8",
            "enterpriseName": "PLN UIW KALIMANTAN BARAT",
            "agreementNumber": "10202",
            "customerNumber": "07000156"
          },
          {
            "enterpriseId": "33f3a0d0-6c11-4900-8884-ff1820e05499",
            "enterpriseName": "PLN UIW NTB",
            "agreementNumber": "10196",
            "customerNumber": "07000150"
          },
          {
            "enterpriseId": "3d25e56e-8bb3-11ea-a7a0-005056a51573",
            "enterpriseName": "PLN UP2D BALI",
            "agreementNumber": null,
            "customerNumber": "07000114"
          },
          {
            "enterpriseId": "d1fd1325-ee05-416f-92e6-609823fa1905",
            "enterpriseName": "PLN UP2D JAWA BARAT",
            "agreementNumber": "10161",
            "customerNumber": "07000102"
          },
          {
            "enterpriseId": "8e488768-2127-49b5-a434-78398b5e1d26",
            "enterpriseName": "PLN UP2D JAWA TIMUR",
            "agreementNumber": "10205",
            "customerNumber": "07000159"
          },
          {
            "enterpriseId": "9e42f828-7ef7-49cf-b81e-36f724a485ba",
            "enterpriseName": "PT ATOZI NET ASIA",
            "agreementNumber": "10170",
            "customerNumber": "07000118"
          },
          {
            "enterpriseId": "6217df39-4045-4525-a0b5-8075c4e30881",
            "enterpriseName": "PT Arthatech Selaras",
            "agreementNumber": "10168",
            "customerNumber": "07000116"
          },
          {
            "enterpriseId": "8e2ec303-e601-4208-a078-69ffba04b0c8",
            "enterpriseName": "PT Arthatech Selaras - asbjateng",
            "agreementNumber": "10200",
            "customerNumber": "07000154"
          },
          {
            "enterpriseId": "e2f1ec9c-0ed8-4b5d-9d20-8e0f1adb42ad",
            "enterpriseName": "PT Arthatech Selaras - asbjatim",
            "agreementNumber": "10185",
            "customerNumber": "07000139"
          },
          {
            "enterpriseId": "dc37f764-ee96-47c1-972f-d94ec5958b30",
            "enterpriseName": "PT Arthatech Selaras - asbjb",
            "agreementNumber": "10186",
            "customerNumber": "07000140"
          },
          {
            "enterpriseId": "69cf7615-885c-41f6-8293-bd7db0097bd1",
            "enterpriseName": "PT Arthatech Selaras - asbni46",
            "agreementNumber": "10199",
            "customerNumber": "07000153"
          },
          {
            "enterpriseId": "5ec26251-d595-4be3-970b-c7578c62d403",
            "enterpriseName": "PT Arthatech Selaras - asbsb",
            "agreementNumber": "10197",
            "customerNumber": "07000151"
          },
          {
            "enterpriseId": "d06b2265-09a5-4077-acc6-1bf7920e6ed8",
            "enterpriseName": "PT Arthatech Selaras - asbsm",
            "agreementNumber": "10174",
            "customerNumber": "07000127"
          },
          {
            "enterpriseId": "688fe597-8d2c-4fdc-9838-07f39bc2be4c",
            "enterpriseName": "PT Arthatech Selaras - asdki",
            "agreementNumber": "10203",
            "customerNumber": "07000157"
          },
          {
            "enterpriseId": "a60f00a1-906e-4656-a86b-32a2e24ebd55",
            "enterpriseName": "PT Arthatech Selaras - askalsel",
            "agreementNumber": "10173",
            "customerNumber": "07000122"
          },
          {
            "enterpriseId": "4e7a8239-789e-4a2b-8b5c-e9377bdf9ff2",
            "enterpriseName": "PT Arthatech Selaras - asmantap",
            "agreementNumber": "10169",
            "customerNumber": "07000119"
          },
          {
            "enterpriseId": "ef66f5fc-3588-458e-912b-9a94935addf5",
            "enterpriseName": "PT Arthatech Selaras - asmega",
            "agreementNumber": "10178",
            "customerNumber": "07000131"
          },
          {
            "enterpriseId": "333754ff-049a-4e9e-92e1-8485622e5e18",
            "enterpriseName": "PT Arthatech Selaras - asmegasyariah",
            "agreementNumber": "10171",
            "customerNumber": "07000120"
          },
          {
            "enterpriseId": "7e92daf5-c0df-4519-be05-2ec623e56abe",
            "enterpriseName": "PT Arthatech Selaras - asriaukepri",
            "agreementNumber": "10182",
            "customerNumber": "07000136"
          },
          {
            "enterpriseId": "443fb053-a89d-4061-8ee1-fadc616ba82a",
            "enterpriseName": "PT Arthatech Selaras - assumut",
            "agreementNumber": "10211",
            "customerNumber": "07000165"
          },
          {
            "enterpriseId": "3d25f964-8bb3-11ea-a7a0-005056a51573",
            "enterpriseName": "PT BFI Finance Tbk",
            "agreementNumber": null,
            "customerNumber": "07000036"
          },
          {
            "enterpriseId": "3d25f8ba-8bb3-11ea-a7a0-005056a51573",
            "enterpriseName": "PT Bank DKI",
            "agreementNumber": null,
            "customerNumber": "07000066"
          },
          {
            "enterpriseId": "8ff7ba0f-1ba7-4340-911e-67cc30f4ba7f",
            "enterpriseName": "PT Bersama Kreatif Teknologi",
            "agreementNumber": "10194",
            "customerNumber": "07000148"
          },
          {
            "enterpriseId": "3d25f766-8bb3-11ea-a7a0-005056a51573",
            "enterpriseName": "PT CIKARANG LISTRINDO",
            "agreementNumber": null,
            "customerNumber": "07000035"
          },
          {
            "enterpriseId": "4fa1c325-28d1-4850-862e-c7dd0ef8babe",
            "enterpriseName": "PT CIPTA PRASADA GEMILANG",
            "agreementNumber": "10192",
            "customerNumber": "07000146"
          },
          {
            "enterpriseId": "a1773c47-d36a-46bc-8c6f-b5ef250b32c9",
            "enterpriseName": "PT Cahaya Avera Gemilang",
            "agreementNumber": "10162",
            "customerNumber": "07000104"
          },
          {
            "enterpriseId": "9036e529-c91e-4d5f-a132-6c6d4014f59d",
            "enterpriseName": "PT Cashlez worldwide Indonesia Tbk",
            "agreementNumber": "10195",
            "customerNumber": "07000149"
          },
          {
            "enterpriseId": "7525187c-e784-4666-866e-6c3573b0b2e7",
            "enterpriseName": "PT Dycodex Teknologi Nusantara",
            "agreementNumber": "10164",
            "customerNumber": "07000107"
          },
          {
            "enterpriseId": "9e5d2231-aa4e-49ef-8213-df35d443f579",
            "enterpriseName": "PT Indocyber Global Teknologi",
            "agreementNumber": "10114",
            "customerNumber": "07000043"
          },
          {
            "enterpriseId": "37a42810-0982-43c4-9b80-a8e10cd94b37",
            "enterpriseName": "PT Indosat Tbk",
            "agreementNumber": "10215",
            "customerNumber": "07000170"
          },
          {
            "enterpriseId": "4ffd69cb-0810-4b68-a28a-d5bb83aa3597",
            "enterpriseName": "PT Johm Energi Solusindo",
            "agreementNumber": "10160",
            "customerNumber": "07000101"
          },
          {
            "enterpriseId": "26570380-427b-4e94-8108-810d44898b4a",
            "enterpriseName": "PT Karsa Adiwidya Sukses",
            "agreementNumber": "7000031",
            "customerNumber": "07000031"
          },
          {
            "enterpriseId": "3d25e906-8bb3-11ea-a7a0-005056a51573",
            "enterpriseName": "PT Kirana Solusi Utama",
            "agreementNumber": null,
            "customerNumber": "07000093"
          },
          {
            "enterpriseId": "6ec7b247-2a18-4a53-bc36-78925bbd4582",
            "enterpriseName": "PT Linta Promosi Global (PROMOGO)",
            "agreementNumber": "10113",
            "customerNumber": "07000042"
          },
          {
            "enterpriseId": "01182434-d7c6-493a-aee6-300d333b06f8",
            "enterpriseName": "PT MUARA JUARA KREASI INDONESIA",
            "agreementNumber": "10158",
            "customerNumber": "07000097"
          },
          {
            "enterpriseId": "60420073-c76b-48f2-9033-8dd9804875c8",
            "enterpriseName": "PT Media Telekomunikasi Indonesia",
            "agreementNumber": "10181",
            "customerNumber": "07000135"
          },
          {
            "enterpriseId": "71062a41-a63c-4abd-ac67-ae6c74b84243",
            "enterpriseName": "PT Nielsen Audience Measurement",
            "agreementNumber": "507987017",
            "customerNumber": "07000067"
          },
          {
            "enterpriseId": "3d25e6f4-8bb3-11ea-a7a0-005056a51573",
            "enterpriseName": "PT PLN (PERSERO) UP2D JAWA TENGAH & D.I. YOGYAKARTA",
            "agreementNumber": null,
            "customerNumber": "07000064"
          },
          {
            "enterpriseId": "0941a11c-93ab-43e2-9b7c-66db32c25b25",
            "enterpriseName": "PT PLN (Persero) DISJATIM AREA MALANG",
            "agreementNumber": "7000006",
            "customerNumber": "07000006"
          },
          {
            "enterpriseId": "3b3b1e64-d54a-4c29-b6f1-139056265f49",
            "enterpriseName": "PT Panggung Electric Citrabuana",
            "agreementNumber": "10157",
            "customerNumber": "07000096"
          },
          {
            "enterpriseId": "b0594739-65f3-42c9-b8be-fbc3bde0e2d3",
            "enterpriseName": "PT Qualita Indonesia",
            "agreementNumber": "10190",
            "customerNumber": "07000144"
          },
          {
            "enterpriseId": "b67b74bc-9e4b-4d99-aa9a-dc51e93e021b",
            "enterpriseName": "PT Segitiga Delta Asia",
            "agreementNumber": "10165",
            "customerNumber": "07000115"
          },
          {
            "enterpriseId": "2f62d12c-da5d-4339-8994-7d1d9b5b1f1a",
            "enterpriseName": "PT Serasi Auto Raya",
            "agreementNumber": "509179294",
            "customerNumber": "07000038"
          },
          {
            "enterpriseId": "b27e1fa9-2c1c-4b82-9b0d-af099b47125a",
            "enterpriseName": "PT Sinar Mutiara EPC",
            "agreementNumber": "10201",
            "customerNumber": "07000155"
          },
          {
            "enterpriseId": "d74182ad-5b74-475c-9693-4972a8258517",
            "enterpriseName": "PT Sisnet Mitra Sejahtera",
            "agreementNumber": "10116",
            "customerNumber": "07000049"
          },
          {
            "enterpriseId": "f0af6a3c-d1d3-40a7-9a60-3b1952908b80",
            "enterpriseName": "PT WaveCommunication Indonesia",
            "agreementNumber": "10129",
            "customerNumber": "07000063"
          },
          {
            "enterpriseId": "b2bbf763-401e-4cd5-bc31-89f5189cf71d",
            "enterpriseName": "PT. ALTO HALODIGITAL INTERNATIONAL",
            "agreementNumber": "91387396",
            "customerNumber": "07000065"
          },
          {
            "enterpriseId": "6ddc5da1-9bbd-4d78-a788-835add520c5a",
            "enterpriseName": "PT. AirPay International Indonesia",
            "agreementNumber": "10156",
            "customerNumber": "07000095"
          },
          {
            "enterpriseId": "bb3381e0-5971-4d5c-a511-1c0fc176d45d",
            "enterpriseName": "PT. Bank BNI (Persero)",
            "agreementNumber": "10115",
            "customerNumber": "07000048"
          },
          {
            "enterpriseId": "3d25f144-8bb3-11ea-a7a0-005056a51573",
            "enterpriseName": "PT. Bank BNI (Persero) Balikpapan",
            "agreementNumber": null,
            "customerNumber": "07000073"
          },
          {
            "enterpriseId": "3d25ebd6-8bb3-11ea-a7a0-005056a51573",
            "enterpriseName": "PT. Bank BNI (Persero) Bandung",
            "agreementNumber": null,
            "customerNumber": "07000079"
          },
          {
            "enterpriseId": "3d25ea6e-8bb3-11ea-a7a0-005056a51573",
            "enterpriseName": "PT. Bank BNI (Persero) Denpasar",
            "agreementNumber": null,
            "customerNumber": "07000076"
          },
          {
            "enterpriseId": "3d25ede8-8bb3-11ea-a7a0-005056a51573",
            "enterpriseName": "PT. Bank BNI (Persero) Jakarta BSD",
            "agreementNumber": null,
            "customerNumber": "07000085"
          },
          {
            "enterpriseId": "3d25f09a-8bb3-11ea-a7a0-005056a51573",
            "enterpriseName": "PT. Bank BNI (Persero) Jakarta Kemayoran 1",
            "agreementNumber": null,
            "customerNumber": "07000086"
          },
          {
            "enterpriseId": "3d25e4a6-8bb3-11ea-a7a0-005056a51573",
            "enterpriseName": "PT. Bank BNI (Persero) Jakarta Kota",
            "agreementNumber": null,
            "customerNumber": "07000084"
          },
          {
            "enterpriseId": "3d25e9ba-8bb3-11ea-a7a0-005056a51573",
            "enterpriseName": "PT. Bank BNI (Persero) Jakarta Senayan 1",
            "agreementNumber": null,
            "customerNumber": "07000083"
          },
          {
            "enterpriseId": "4b24a07c-58b3-4b10-b8c2-89298da8e9f8",
            "enterpriseName": "PT. Bank BNI (Persero) Jakarta Test",
            "agreementNumber": "10149",
            "customerNumber": "07000087"
          },
          {
            "enterpriseId": "3d25f400-8bb3-11ea-a7a0-005056a51573",
            "enterpriseName": "PT. Bank BNI (Persero) Makassar",
            "agreementNumber": null,
            "customerNumber": "07000074"
          },
          {
            "enterpriseId": "3d25f608-8bb3-11ea-a7a0-005056a51573",
            "enterpriseName": "PT. Bank BNI (Persero) Malang",
            "agreementNumber": null,
            "customerNumber": "07000077"
          },
          {
            "enterpriseId": "3d25eff0-8bb3-11ea-a7a0-005056a51573",
            "enterpriseName": "PT. Bank BNI (Persero) Manado",
            "agreementNumber": null,
            "customerNumber": "07000071"
          },
          {
            "enterpriseId": "3d25f34c-8bb3-11ea-a7a0-005056a51573",
            "enterpriseName": "PT. Bank BNI (Persero) Medan",
            "agreementNumber": null,
            "customerNumber": "07000072"
          },
          {
            "enterpriseId": "3d25d24a-8bb3-11ea-a7a0-005056a51573",
            "enterpriseName": "PT. Bank BNI (Persero) Padang",
            "agreementNumber": null,
            "customerNumber": "07000080"
          },
          {
            "enterpriseId": "3d25e37a-8bb3-11ea-a7a0-005056a51573",
            "enterpriseName": "PT. Bank BNI (Persero) Palembang",
            "agreementNumber": null,
            "customerNumber": "07000081"
          },
          {
            "enterpriseId": "3d25ed3e-8bb3-11ea-a7a0-005056a51573",
            "enterpriseName": "PT. Bank BNI (Persero) Semarang",
            "agreementNumber": null,
            "customerNumber": "07000082"
          },
          {
            "enterpriseId": "3d25f554-8bb3-11ea-a7a0-005056a51573",
            "enterpriseName": "PT. Bank BNI (Persero) Surabaya",
            "agreementNumber": null,
            "customerNumber": "07000078"
          },
          {
            "enterpriseId": "3d25ef46-8bb3-11ea-a7a0-005056a51573",
            "enterpriseName": "PT. Bank BNI (Persero) Yogyakarta",
            "agreementNumber": null,
            "customerNumber": "07000075"
          },
          {
            "enterpriseId": "a8108751-38e8-4b03-8662-5ab0838be63d",
            "enterpriseName": "PT. Bank CIMB Niaga",
            "agreementNumber": "10153",
            "customerNumber": "07000092"
          },
          {
            "enterpriseId": "6b2d5228-8064-4681-9b7d-c4b11cae0f2c",
            "enterpriseName": "PT. Bank Mandiri (Persero)",
            "agreementNumber": "509179343",
            "customerNumber": "07000039"
          },
          {
            "enterpriseId": "3d25f6b2-8bb3-11ea-a7a0-005056a51573",
            "enterpriseName": "PT. Bank Rakyat Indonesia (Persero)",
            "agreementNumber": null,
            "customerNumber": "07000041"
          },
          {
            "enterpriseId": "f9a0cc86-172a-4bd0-a653-7254a186325d",
            "enterpriseName": "PT. Bank Tabungan Negara (Persero)",
            "agreementNumber": "91436504",
            "customerNumber": "07000046"
          },
          {
            "enterpriseId": "0ce56871-e095-454f-92c4-071b9b2b81bb",
            "enterpriseName": "PT. Cipta Krida Bahari",
            "agreementNumber": "10155",
            "customerNumber": "07000094"
          },
          {
            "enterpriseId": "25af201a-decd-43ec-914c-3e84f08a3075",
            "enterpriseName": "PT. HIPERNET INDODATA",
            "agreementNumber": "10177",
            "customerNumber": "07000130"
          },
          {
            "enterpriseId": "2d2d7774-5827-46b0-9cf5-84c3a5749011",
            "enterpriseName": "PT. INDONESIA COMNETS PLUS",
            "agreementNumber": "07000008",
            "customerNumber": "07000008"
          },
          {
            "enterpriseId": "f7fb76c5-b7fd-4101-bbf3-8f0932ac9cdb",
            "enterpriseName": "PT. Ingenico International Indonesia",
            "agreementNumber": "1",
            "customerNumber": "07000047"
          },
          {
            "enterpriseId": "be60eb92-c0b0-41cb-9255-cf437d8b78b6",
            "enterpriseName": "PT. MITRA ARTHA KREASI",
            "agreementNumber": "7000025",
            "customerNumber": "07000025"
          },
          {
            "enterpriseId": "8949236a-755c-11ea-bc55-0242ac130003",
            "enterpriseName": "PT. MULTI ADIPRAKARSA MANUNGGAL",
            "agreementNumber": "1",
            "customerNumber": "07000015"
          },
          {
            "enterpriseId": "4104772c-5093-4153-935e-841063af02ee",
            "enterpriseName": "PT. Mitra Transaksi Indonesia",
            "agreementNumber": "10175",
            "customerNumber": "07000128"
          },
          {
            "enterpriseId": "08a5ae38-7c5f-4e19-9411-ff35c683481c",
            "enterpriseName": "PT. NTT DATA INDONESIA",
            "agreementNumber": "7000016",
            "customerNumber": "07000016"
          },
          {
            "enterpriseId": "3d25ee92-8bb3-11ea-a7a0-005056a51573",
            "enterpriseName": "PT. PrimaVista",
            "agreementNumber": null,
            "customerNumber": "07000091"
          },
          {
            "enterpriseId": "acd3a9d0-8544-4633-a474-18fa0c176944",
            "enterpriseName": "PT. Qualita Indonesia Verifone",
            "agreementNumber": "10212",
            "customerNumber": "07000166"
          },
          {
            "enterpriseId": "82464140-839d-4c44-8a37-a411a735520d",
            "enterpriseName": "PT. Spots - Gobiz",
            "agreementNumber": "10150",
            "customerNumber": "07000089"
          },
          {
            "enterpriseId": "381ed616-9b48-11eb-a8b3-0242ac130003",
            "enterpriseName": "PT. Tianwang Technology Indonesia",
            "agreementNumber": null,
            "customerNumber": "07000040"
          },
          {
            "enterpriseId": "e70f0135-11af-4005-ad59-57c439f02708",
            "enterpriseName": "PT. VISIONET DATA INTERNASIONAL",
            "agreementNumber": "91188006",
            "customerNumber": "07000045"
          },
          {
            "enterpriseId": "3d25f1f8-8bb3-11ea-a7a0-005056a51573",
            "enterpriseName": "SLMM2M DKI MCA",
            "agreementNumber": null,
            "customerNumber": "07000099"
          },
          {
            "enterpriseId": "98bc01a5-34ba-4b5e-b8a7-cde6d818b13c",
            "enterpriseName": "Test CR",
            "agreementNumber": "Test CR",
            "customerNumber": "Test CR"
          },
          {
            "enterpriseId": "a22ce89a-2ac7-47e5-9869-b6324f1cf5ec",
            "enterpriseName": "Test Default Billing Conf 5",
            "agreementNumber": "1",
            "customerNumber": "005"
          },
          {
            "enterpriseId": "6b45352e-b669-4b2e-b778-cad4dd87ee43",
            "enterpriseName": "Test Default Config4",
            "agreementNumber": "string",
            "customerNumber": "004"
          },
          {
            "enterpriseId": "405b5393-f43b-416b-8c1a-6e58adc95dea",
            "enterpriseName": "Trial Customer",
            "agreementNumber": "20200515",
            "customerNumber": "07000117"
          },
          {
            "enterpriseId": "a06e38ea-d871-4945-8126-44fab717180a",
            "enterpriseName": "XL AXIATA",
            "agreementNumber": "22",
            "customerNumber": "07000001"
          },
          {
            "enterpriseId": "3d25e636-8bb3-11ea-a7a0-005056a51573",
            "enterpriseName": "XL Enterprise IOT",
            "agreementNumber": null,
            "customerNumber": "07000044"
          },
          {
            "enterpriseId": "3b410cfb-3ef3-432a-b94d-38abb17aa836",
            "enterpriseName": "XL Internal Testing",
            "agreementNumber": "10204",
            "customerNumber": "07000158"
          },
          {
            "enterpriseId": "3d25ec8a-8bb3-11ea-a7a0-005056a51573",
            "enterpriseName": "XL M2M Test",
            "agreementNumber": null,
            "customerNumber": "07000002"
          },
          {
            "enterpriseId": "869cdcfe-6ea1-450b-a142-5495d430c299",
            "enterpriseName": "XL onboard enterprise",
            "agreementNumber": "999999",
            "customerNumber": "07000088"
          },
          {
            "enterpriseId": "ffa7989e-f872-4f0a-bfda-4df17658107e",
            "enterpriseName": "pt cinta sejati",
            "agreementNumber": "123456",
            "customerNumber": "123456"
          },
          {
            "enterpriseId": "57b58b32-40c7-4651-ae94-ace2b122101a",
            "enterpriseName": "test enterprise 123",
            "agreementNumber": "111",
            "customerNumber": "0711111111"
          },
          {
            "enterpriseId": "2101b479-3d33-4ad8-9fce-5ea019c2dbeb",
            "enterpriseName": "test enterprise33",
            "agreementNumber": "11111",
            "customerNumber": "071111111"
          },
          {
            "enterpriseId": "2cbc99e3-ecfe-4d47-8b1f-af3617bf19d1",
            "enterpriseName": "testCobaBPHO",
            "agreementNumber": "1222",
            "customerNumber": "11"
          }
        ]
      ));
      //     } else {
      //       throw new Error(data);
      //     }
      //   }
      // })
      // .catch((error) => {
      //   dispatch(setRequestError(error.response.data));
      // });
  };
};

const setCarousel = (data) => ({
  type: reduxString.SET_CAROUSEL,
  payload: data,
});

export const getCarousel = () => {
  return async (dispatch) => {
    const customHeaders = {
      headers: {
        activityId: 'LLP-3',
        isStatic: true,
      },
    };
    dispatch(requestDashboardData());
    try {
      const {data} = await httpRequest.get(
        `/dcp/banner/getListBanner`,
        customHeaders,
      );

      if (data) {
        if (data.statusCode === 0) {
          data.result.map((banner) => {
            banner.bannerImage = `data:image/jpeg;base64,${banner.bannerImage}`;
          });
          dispatch(setCarousel(data.result));
        } else {
          throw new Error(data);
        }
      }
    } catch (error) {
      console.log(error.response.data, 'ERROR');
      dispatch(setRequestError(error.response.data));
    }
  };
};

const setSimStatistics = (data, params) => {
  const newDataSet = [];
  const pieChartColor = ['#2ECFD3', '#124EAB', '#0064FB', '#22385A'];

  data.map((datas, i) => {
    newDataSet.push({
      y: +datas.total,
      percentage: +datas.percentage,
      status: datas.status,
      color: pieChartColor[i],
      total: +datas.total,
    });
  });

  Helper.sortDescending(newDataSet, 'total');

  return {
    type: 'SET_SIM_STATISTICS',
    payload: newDataSet,
    params,
  };
};

const setCustomStatistics = (data, params) => {
  const newDataSet = [];
  const pieChartColor = ['#2ECFD3', '#124EAB', '#0064FB', '#22385A'];

  data.map((datas, i) => {
    newDataSet.push({
      y: +datas.total,
      percentage: +datas.percentage,
      status: datas.businesscat,
      color: pieChartColor[i],
      total: +datas.total,
    });
  });
  Helper.sortDescending(newDataSet, 'total');

  return {
    type: 'SET_CUSTOM_STATISTICS',
    payload: newDataSet,
    params,
  };
};

const setTopTrafficStatistics = (data, params) => {
  const newDataSet = [];

  data.map((datas) => {
    newDataSet.push({
      x: datas.msisdn,
      y: +datas.datausage,
      label: [
        `MSISDN: `,
        `${datas.msisdn}`,
        `Data usage: `,
        `${Helper.formatBytes(+datas.datausage)}`,
      ],
    });
  });

  Helper.sortAscending(newDataSet, 'y');

  return {
    type: 'SET_TOP_TRAFFIC_STATISTICS',
    payload: newDataSet,
    params,
  };
};

const setTopDevice = (data, params) => {
  const newDataSet = [];

  data.map((datas) => {
    newDataSet.push({
      x: datas.brand +" ("+datas.type+")",
      y: datas.totalcount,
      label: [
        `Brand: `,
        `${datas.brand} (${datas.type})`,
        `Total: `,
        `${datas.totalcount}`,
      ],
    });
  });

  Helper.sortAscending(newDataSet, 'y');

  return {
    type: 'SET_TOP_DEVICE_BRAND',
    payload: newDataSet,
    params,
  };
};

const setDevicePopulation = (data, params) => {
  const newDataSet = [];

  const pieChartColor = ['#F1DD47', '#EB5777', '#165096'];
  var getobj = Object.keys(data[0]);
  var data2g3g = data[0][getobj[0]]
  var data4g = data[0][getobj[1]]
  var data5g = data[0][getobj[2]]
  var datatotal = data[0][getobj[3]]

  newDataSet.push({
    y: data2g3g,
    percentage: (parseFloat(data2g3g/datatotal).toFixed(2))*10,
    status: "5g",
    color: pieChartColor[2],
    total: data2g3g,
  },{
    y: data4g,
    percentage: (parseFloat(data4g/datatotal).toFixed(2))*10,
    status: "4g",
    color: pieChartColor[1],
    total: data4g,
  },{
    y: data5g,
    percentage: (parseFloat(data5g/datatotal).toFixed(2))*10,
    status: "2g/3g",
    color: pieChartColor[0],
    total: data5g,
  });

  // Helper.sortAscending(newDataSet, 'y');

  return {
    type: 'SET_DEVICE_POPULATION',
    payload: newDataSet,
    params,
  };
};

const setFinanceReport = (data, params) => {
  const newDataSet = [];
  data.map((datas) => {
    newDataSet.push({
      x: datas.datePeriod,
      y: datas.totalInvoice,
      label: [
        `Period: `,
        `${datas.datePeriod}`,
        `Invoice: `,
        `${datas.totalInvoice}`,
      ],
    });
  });

  // Helper.sortAscending(newDataSet, 'y');

  return {
    type: 'SET_FINANCIAL_REPORT',
    payload: newDataSet,
    params,
  };
};

export const resetSubsAnalytics = () => ({
  type: reduxString.RESET_SUBS_ANALYTIC,
});

export const resetTopTrafficStatistics = () => ({
  type: reduxString.RESET_TOP_TRAFFIC_STATISTICS,
});

const setAggregatedTraffic = (data, params) => {
  const summaryData = [
    {
      title: 'From start of month, Total Volume',
      dataId: 'firstmonthvolume',
      smsId: 'firstmonthsms',
      data: '-',
      sms: '-',
    },
    {
      title: 'Previous 30 days, Total Volume',
      dataId: 'last30dayvolume',
      smsId: 'last30daysms',
      data: '-',
      sms: '-',
    },
    {
      title: 'From start of month, Average per subscription',
      dataId: 'firstmonthavgpersubs',
      smsId: 'firstmonthavgpersubssms',
      data: '-',
      sms: '-',
    },
    {
      title: 'Previous 30 days, Average per subscription',
      dataId: 'last30dayavgpersubs',
      smsId: 'last30dayavgpersubssms',
      data: '-',
      sms: '-',
    },
  ];

  if (data.length > 0) {
    data.map((datas) => {
      Object.keys(datas).map((keys) => {
        summaryData.map((sumData, index) => {
          if (keys === sumData.dataId)
            summaryData[index].data = Helper.formatBytes(+datas[keys]);
          else if (keys === sumData.smsId)
            summaryData[index].sms = Helper.numberFormat(+datas[keys], '.');
        });
      });
    });
  }

  return {
    type: reduxString.SET_AGGREGATED_TRAFFIC,
    payload: summaryData,
    params,
  };
};

const set12MonthUsage = (data, params) => {
  const monthUsage = new Array();

  data.map((datas) => {
    monthUsage.push({x: datas.monthperiod, y: +datas.traffic || 0});
  });

  return {
    type: reduxString.SET_12_MONTH_USAGE,
    payload: monthUsage,
    params,
  };
};

const setMonthUsage = (data, params) => {
  const monthUsage = new Array();
  const cummulative = new Array();

  data.map((datas) => {
    let splitDate = datas.date.split('-');
    let tooltipValue = [
      `${splitDate[2]}.${splitDate[1]}.${splitDate[0]}`,
      `Cumulative Month Values: ${Helper.formatBytes(datas.cumulative || 0)}`,
      `Day Volumes: ${Helper.formatBytes(datas.volume || 0)}`,
    ];
    monthUsage.push({
      y: datas.volume || 0,
      x: datas.date || '',
      tooltipValue,
      symbol: 'round',
      size: 4,
    });
    cummulative.push({
      y: datas.cumulative || 0,
      x: datas.date || '',
      tooltipValue,
      symbol: 'round',
      size: 4,
    });
  });

  return {
    type: reduxString.SET_MONTH_USAGE,
    payload: {
      day: monthUsage,
      cummulative: cummulative,
    },
    params,
  };
};

const setSubsAnalytics = (data, params) => {
  let minSubsValue = 0;
  let minUsageValue = 0;
  const subsData = [...data].map((datas) => {
    if (datas.totalactive !== null && datas.totalactive > 0) {
      if (datas.totalactive <= minSubsValue || minSubsValue === 0) {
        minSubsValue = datas.totalactive;
      }
    }
    return {x: datas.monthperiod, y: datas.totalactive || 0};
  });
  const usageData = [...data].map((datas) => {
    if (datas.traffic !== null && datas.traffic > 0) {
      if (datas.traffic <= minSubsValue || minUsageValue === 0) {
        minUsageValue = datas.traffic;
      }
    }
    return {x: datas.monthperiod, y: datas.traffic || 0};
  });

  return {
    type: reduxString.SET_SUBS_ANALYTICS,
    payload: {
      minValue: {minSubsValue, minUsageValue},
      data: [[...usageData], [...subsData]],
    },
  };
};

export const requestWidgetData = (
  accessToken,
  item,
  filterParams = {},
  type = 'sim',
) => {
  return async (dispatch) => {
    let isHasParams = Object.keys(filterParams).length > 0;
    if (type === 'sim') dispatch(requestDashboardData());
    if (type === 'top') dispatch(requestTopTraffic());
    if (type === 'custom') dispatch(requestCustomStatistics());
    if (type === 'topdevice') dispatch(requestTopDevice());
    if (type === 'devicepopulation') dispatch(requestDevicePopulation());
    let activityId;
    if (type === 'sim') activityId = isHasParams ? 'DP-4' : 'DP-1';
    else if (type === 'top') activityId = isHasParams ? 'DP-5' : 'DP-3';
    else if (type === 'custom') activityId = isHasParams ? 'DP-8' : 'DP-9';
    else if (type === 'topdevice') activityId = isHasParams ? 'DP-10' : 'DP-11';
    else if (type === 'devicepopulation') activityId = isHasParams ? 'DP-12' : 'DP-13';
    const customHeaders = {
      headers: {
        activityId,
        showParams: isHasParams ? true : false,
        excludeParamsKey: '',
        paramKeyDescription:
          'param1:Enterprise Number|param2:Package Name|param3:Period (days)|param4:Count By',
      },
    };
    try {
      const {data} = await httpRequest.post(
        `/dcp/dashboard/v2/getDataSet?datasetId=${item.datasetId}`,
        filterParams,
        customHeaders,
      );
      // console.log(JSON.stringify(data));
      if (data) {
        if (data.statusCode === 0) {
          if (type === 'sim') {
            dispatch(setSimStatistics(data.result.dataset, filterParams));
          } else if (type === 'top') {
            dispatch(
              setTopTrafficStatistics(data.result.dataset, filterParams),
            );
          } else if (type === 'custom') {
            dispatch(setCustomStatistics(data.result.dataset, filterParams));
          } else if (type === 'topdevice') {
            dispatch(setTopDevice(data.result.dataset, filterParams));
          } else if (type === 'devicepopulation') {
            dispatch(setDevicePopulation(data.result.dataset, filterParams));
          }
        } else {
          dispatch(setRequestError(data.statusDescription));
        }
      }
    } catch (error) {
      dispatch(setRequestError(error.response.data));
    }
  };
};

export const requestWidgetDataFinance = (
  accessToken,
  item,
  filterParams = {},
  type,
  username
) => {
  return async (dispatch) => {
    let isHasParams = Object.keys(filterParams).length > 0;
    if (type === 'finance') dispatch(requestFinanceReport());
    let activityId;
    if (type === 'finance') activityId = isHasParams ? 'DP-6' : 'DP-7';
    // const customHeaders = {
    //   headers: {
    //     activityId,
    //     showParams: isHasParams ? true : false,
    //     excludeParamsKey: '',
    //     Authorization: 'Bearer ',
    //     username: 'super.rama',
    //     paramKeyDescription:
    //       'param1:Enterprise Number|param2:Package Name|param3:Period (days)|param4:Count By',
    //   },
    // };

    let config = {
      method: 'get',
      url: 'http://18.141.189.242:18084/financial/getInvoiceSummary?enterpriseId=a06e38ea-d871-4945-8126-44fab717180a',
      headers: { 
        'username': username
      },
      activityId,
      showParams: isHasParams ? true : false,
      excludeParamsKey: '',
      Authorization: 'Bearer ',
      paramKeyDescription:
        'param1:Enterprise Number|param2:Package Name|param3:Period (days)|param4:Count By',
    };
    
    await Axios.request(config)
    .then((response) => {
      // var resdata = JSON.stringify(response.data);
      var resdata = response.data;
      if (resdata) {
        if (resdata.statusCode === 0) {
          dispatch(setFinanceReport(resdata.result, filterParams));
        } else {
          dispatch(setRequestError(resdata.statusDescription));
        }
      }
    })
    .catch((error) => {
      dispatch(setRequestError(error.response.data));
    });
  };
};

export const getAggregatedTraffic = (item, filterParams = {}) => {
  return async (dispatch, getState) => {
    let isHasParams = Object.keys(filterParams).length > 0;
    const customHeaders = {
      headers: {
        activityId: isHasParams ? 'ANP-8' : 'ANP-7',
        showParams: isHasParams ? true : false,
        excludeParamsKey: '',
        paramKeyDescription:
          'param1:Enterprise Number|param2:Package Name|param3:Period (days)|param4:Count By',
      },
    };
    try {
      dispatch(requestAggregatedTraffic());
      const {data} = await httpRequest.post(
        `/dcp/dashboard/v2/getDataSet?datasetId=${item.datasetId}`,
        filterParams,
        customHeaders,
      );
      if (data) {
        if (data.statusCode === 0) {
          dispatch(setAggregatedTraffic(data.result.dataset, filterParams));
        } else {
          dispatch(setAggregatedTraffic([], filterParams));
        }
      }
    } catch (error) {
      dispatch(setRequestError(error.response.data));
    }
  };
};

export const get12MonthUsage = (item, filterParams = {}) => {
  return async (dispatch, getState) => {
    let isHasParams = Object.keys(filterParams).length > 0;
    const customHeaders = {
      headers: {
        activityId: isHasParams ? 'ANP-10' : 'ANP-9',
        showParams: isHasParams ? true : false,
        excludeParamsKey: '',
        paramKeyDescription:
          'param1:Enterprise Number|param2:Package Name|param3:Period (days)|param4:Count By',
      },
    };
    try {
      dispatch(request12MonthUsage());
      const {data} = await httpRequest.post(
        `/dcp/dashboard/v2/getDataSet?datasetId=${item.datasetId}`,
        filterParams,
        customHeaders,
      );

      if (data) {
        if (data.statusCode === 0) {
          dispatch(set12MonthUsage(data.result.dataset, filterParams));
        }
      }
    } catch (error) {
      dispatch(setRequestError(error.response.data));
    }
  };
};

export const getMonthUsage = (item, filterParams = {}) => {
  return async (dispatch, getState) => {
    let isHasParams = Object.keys(filterParams).length > 0;
    const customHeaders = {
      headers: {
        activityId: isHasParams ? 'ANP-12' : 'ANP-11',
        showParams: isHasParams ? true : false,
        excludeParamsKey: '',
        paramKeyDescription: 'param3:Data in Month',
      },
    };
    try {
      dispatch(requestMonthUsage());
      const {data} = await httpRequest.post(
        `/dcp/dashboard/v2/getDataSet?datasetId=${item.datasetId}`,
        filterParams,
        customHeaders,
      );
      if (data) {
        if (data.statusCode === 0) {
          dispatch(setMonthUsage(data.result.dataset, filterParams));
        }
      }
    } catch (error) {
      dispatch(setRequestError(error.response.data));
    }
  };
};

export const getSubsAnalytics = (item, filterParams = {}) => {
  return async (dispatch, getState) => {
    let isHasParams = Object.keys(filterParams).length > 0;
    const customHeaders = {
      headers: {
        activityId: isHasParams ? 'ANP-13' : 'ANP-14',
        showParams: isHasParams ? true : false,
        excludeParamsKey: '',
        paramKeyDescription:
          'param1:Enterprise Number|param2:Package Name|param3:Date',
      },
    };
    try {
      dispatch(requestSubsAnalytics());
      dispatch(resetSubsAnalytics());
      const {data} = await httpRequest.post(
        `/dcp/dashboard/v2/getDataSet?datasetId=${item.datasetId}`,
        filterParams,
        customHeaders,
      );

      if (data) {
        if (data.statusCode === 0) {
          dispatch(setSubsAnalytics(data.result.dataset, filterParams));
        }
      }
    } catch (error) {
      dispatch(setRequestError(error.response.data));
    }
  };
};
