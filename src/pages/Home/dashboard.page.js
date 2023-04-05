import React, {useEffect, useState} from 'react';
import Helper from '../../helpers/helper';
import {useDispatch, useSelector} from 'react-redux';
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  View,
	Modal,
  TouchableOpacity,
} from 'react-native';
import Text from '../../components/global/text';
import {Card, Headline} from 'react-native-paper';
import {
  HeaderContainer,
  OverlayBackground,
  WidgetStore,
} from '../../components/index';
import DropDownPicker from 'react-native-dropdown-picker';
import {
  getDashboardSummary,
  getWidgetList,
  getEnterpriseList,
  resetTopTrafficStatistics,
} from '../../redux/action/dashboard_action';
import Orientation from '../../helpers/orientation';

import style from '../../style/home.style';
import {colors} from '../../constant/color';
import FontAwesome from 'react-native-vector-icons/FontAwesome'; 
const DashboardPage = ({navigation}) => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth_reducer.data);
  const widgetList = useSelector((state) => state.dashboard_reducer.widgetList);
  const {imageBase64} = useSelector((state) => state.enterprise_reducer);
  const summaryDashboardData = useSelector(
    (state) => state.dashboard_reducer.summaryData,
  );
  const loading = useSelector((state) => state.dashboard_reducer.loading);
  const [filteringData, setFilteringData] = useState("") 
  const [modalVisible, setModalVisible] = useState(false) 
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {
      "value": "be711a86-ee30-47a3-af6f-c9d76f78a9b0",
      "label": " PT Pasifik Cipta Solusi",
      "agreementNumber": "10209",
      "customerNumber": "07000163"
    },
    {
      "value": "91500849-5cbd-4a71-ab06-84a05d078f74",
      "label": "BTPN Trial",
      "agreementNumber": "10147",
      "customerNumber": "07000070"
    },
    {
      "value": "59176a35-a594-4dd4-9e46-9af44db41c14",
      "label": "Bogor Tech Trial",
      "agreementNumber": "BGRTech2019",
      "customerNumber": "07000098"
    },
    {
      "value": "5e9e5400-c43d-4a9e-9065-b6c5704356bb",
      "label": "CR Test Enterprise",
      "agreementNumber": "01",
      "customerNumber": "001"
    },
    {
      "value": "3b6d290e-9199-4792-9243-e4d7e65d2605",
      "label": "CR Test Enterprise 2",
      "agreementNumber": "02",
      "customerNumber": "002"
    },
    {
      "value": "032086fe-da05-4a4b-a25c-5c047efd2731",
      "label": "CR Test Enterprise 3",
      "agreementNumber": "string",
      "customerNumber": "003"
    },
    {
      "value": "10e0a4f4-b95e-43d0-837e-e9a1c0ab9b98",
      "label": "DCP 4.0",
      "agreementNumber": "1",
      "customerNumber": "1234567"
    },
    {
      "value": "c3e91ab8-663c-4e27-b78f-b26b4f90d54a",
      "label": "Enterprise New Test",
      "agreementNumber": "1111",
      "customerNumber": "071234567"
    },
    {
      "value": "f99efcb2-beb9-4c70-87f9-bba0aea38a51",
      "label": "Enterprise New Testqqq",
      "agreementNumber": "1111",
      "customerNumber": "0711111234"
    },
    {
      "value": "52ca751b-263a-452d-9c7d-cbf770d834f4",
      "label": "Enterprise Test",
      "agreementNumber": "321321",
      "customerNumber": "321321"
    },
    {
      "value": "5a6f3c74-4314-4211-bc40-2d7a8e76d7d5",
      "label": "ISDigital Trial",
      "agreementNumber": "201912230001",
      "customerNumber": "07000105"
    },
    {
      "value": "4fb52976-3f24-4f0f-883d-ec838a69da48",
      "label": "Indomobil Prima Energi",
      "agreementNumber": "000",
      "customerNumber": "07000138"
    },
    {
      "value": "5259932e-3f9b-442d-a38d-01d580fd1d46",
      "label": "NOSAIRIS TEKNOLOGI SOLUTIONS",
      "agreementNumber": "7000032",
      "customerNumber": "07000032"
    },
    {
      "value": "3d25eb18-8bb3-11ea-a7a0-005056a51573",
      "label": "PLN APD Jakarta",
      "agreementNumber": null,
      "customerNumber": "07000113"
    },
    {
      "value": "3d25f2a2-8bb3-11ea-a7a0-005056a51573",
      "label": "PLN AREA BABEL",
      "agreementNumber": null,
      "customerNumber": "07000069"
    },
    {
      "value": "32bda269-255b-419c-a04d-939b0d380b00",
      "label": "PLN AREA BALI",
      "agreementNumber": "10119",
      "customerNumber": "07000052"
    },
    {
      "value": "440aeb1e-3c34-42d0-a63d-f4380aa4d1b1",
      "label": "PLN AREA DISJABAR",
      "agreementNumber": "10121",
      "customerNumber": "07000054"
    },
    {
      "value": "0a3176dc-00df-400e-b5a1-f90c1238fa73",
      "label": "PLN AREA DISJATENG",
      "agreementNumber": "10122",
      "customerNumber": "07000055"
    },
    {
      "value": "3d25f4aa-8bb3-11ea-a7a0-005056a51573",
      "label": "PLN AREA DISJAYA",
      "agreementNumber": null,
      "customerNumber": "07000053"
    },
    {
      "value": "5dea48ed-8da1-4676-af37-77360e5e89ab",
      "label": "PLN AREA Disbanten",
      "agreementNumber": "10172",
      "customerNumber": "07000121"
    },
    {
      "value": "3d25e852-8bb3-11ea-a7a0-005056a51573",
      "label": "PLN AREA JAWA TIMUR",
      "agreementNumber": null,
      "customerNumber": "07000051"
    },
    {
      "value": "cc33c757-1cf2-4e0d-9e1d-f38bd8850209",
      "label": "PLN AREA KSKT",
      "agreementNumber": "10127",
      "customerNumber": "07000060"
    },
    {
      "value": "873718dc-43be-46f5-a7b7-f6824bdc2efa",
      "label": "PLN AREA PAMEKASAN",
      "agreementNumber": "10124",
      "customerNumber": "07000057"
    },
    {
      "value": "afccaf3d-99ea-4911-b6c1-421cf7b30cb2",
      "label": "PLN AREA SULSELRABAR",
      "agreementNumber": "10128",
      "customerNumber": "07000061"
    },
    {
      "value": "28385127-bcd3-4784-8b88-b9eeec7cea24",
      "label": "PLN AREA SUMBAR",
      "agreementNumber": "10191",
      "customerNumber": "07000145"
    },
    {
      "value": "c5db7c00-7235-4b11-ba35-f6476b0fb7f5",
      "label": "PLN AREA SUMUT",
      "agreementNumber": "10123",
      "customerNumber": "07000056"
    },
    {
      "value": "c4f7f2f4-af2e-4765-930a-5e3f4a542b66",
      "label": "PLN AREA UID LAMPUNG",
      "agreementNumber": "10126",
      "customerNumber": "07000059"
    },
    {
      "value": "3d25fa18-8bb3-11ea-a7a0-005056a51573",
      "label": "PLN AREA WS2JB",
      "agreementNumber": null,
      "customerNumber": "07000058"
    },
    {
      "value": "cd00e28e-6f74-44f7-987b-5c5d88c70307",
      "label": "PLN DISJATIM AREA Banyuwangi",
      "agreementNumber": "7000014",
      "customerNumber": "07000014"
    },
    {
      "value": "3d25f810-8bb3-11ea-a7a0-005056a51573",
      "label": "PLN Regional KSKT",
      "agreementNumber": null,
      "customerNumber": "07000090"
    },
    {
      "value": "e657b225-082e-4b7e-941f-087a2e59cbc8",
      "label": "PLN UIW KALIMANTAN BARAT",
      "agreementNumber": "10202",
      "customerNumber": "07000156"
    },
    {
      "value": "33f3a0d0-6c11-4900-8884-ff1820e05499",
      "label": "PLN UIW NTB",
      "agreementNumber": "10196",
      "customerNumber": "07000150"
    },
    {
      "value": "3d25e56e-8bb3-11ea-a7a0-005056a51573",
      "label": "PLN UP2D BALI",
      "agreementNumber": null,
      "customerNumber": "07000114"
    },
    {
      "value": "d1fd1325-ee05-416f-92e6-609823fa1905",
      "label": "PLN UP2D JAWA BARAT",
      "agreementNumber": "10161",
      "customerNumber": "07000102"
    },
    {
      "value": "8e488768-2127-49b5-a434-78398b5e1d26",
      "label": "PLN UP2D JAWA TIMUR",
      "agreementNumber": "10205",
      "customerNumber": "07000159"
    },
    {
      "value": "9e42f828-7ef7-49cf-b81e-36f724a485ba",
      "label": "PT ATOZI NET ASIA",
      "agreementNumber": "10170",
      "customerNumber": "07000118"
    },
    {
      "value": "6217df39-4045-4525-a0b5-8075c4e30881",
      "label": "PT Arthatech Selaras",
      "agreementNumber": "10168",
      "customerNumber": "07000116"
    },
    {
      "value": "8e2ec303-e601-4208-a078-69ffba04b0c8",
      "label": "PT Arthatech Selaras - asbjateng",
      "agreementNumber": "10200",
      "customerNumber": "07000154"
    },
    {
      "value": "e2f1ec9c-0ed8-4b5d-9d20-8e0f1adb42ad",
      "label": "PT Arthatech Selaras - asbjatim",
      "agreementNumber": "10185",
      "customerNumber": "07000139"
    },
    {
      "value": "dc37f764-ee96-47c1-972f-d94ec5958b30",
      "label": "PT Arthatech Selaras - asbjb",
      "agreementNumber": "10186",
      "customerNumber": "07000140"
    },
    {
      "value": "69cf7615-885c-41f6-8293-bd7db0097bd1",
      "label": "PT Arthatech Selaras - asbni46",
      "agreementNumber": "10199",
      "customerNumber": "07000153"
    },
    {
      "value": "5ec26251-d595-4be3-970b-c7578c62d403",
      "label": "PT Arthatech Selaras - asbsb",
      "agreementNumber": "10197",
      "customerNumber": "07000151"
    },
    {
      "value": "d06b2265-09a5-4077-acc6-1bf7920e6ed8",
      "label": "PT Arthatech Selaras - asbsm",
      "agreementNumber": "10174",
      "customerNumber": "07000127"
    },
    {
      "value": "688fe597-8d2c-4fdc-9838-07f39bc2be4c",
      "label": "PT Arthatech Selaras - asdki",
      "agreementNumber": "10203",
      "customerNumber": "07000157"
    },
    {
      "value": "a60f00a1-906e-4656-a86b-32a2e24ebd55",
      "label": "PT Arthatech Selaras - askalsel",
      "agreementNumber": "10173",
      "customerNumber": "07000122"
    },
    {
      "value": "4e7a8239-789e-4a2b-8b5c-e9377bdf9ff2",
      "label": "PT Arthatech Selaras - asmantap",
      "agreementNumber": "10169",
      "customerNumber": "07000119"
    },
    {
      "value": "ef66f5fc-3588-458e-912b-9a94935addf5",
      "label": "PT Arthatech Selaras - asmega",
      "agreementNumber": "10178",
      "customerNumber": "07000131"
    },
    {
      "value": "333754ff-049a-4e9e-92e1-8485622e5e18",
      "label": "PT Arthatech Selaras - asmegasyariah",
      "agreementNumber": "10171",
      "customerNumber": "07000120"
    },
    {
      "value": "7e92daf5-c0df-4519-be05-2ec623e56abe",
      "label": "PT Arthatech Selaras - asriaukepri",
      "agreementNumber": "10182",
      "customerNumber": "07000136"
    },
    {
      "value": "443fb053-a89d-4061-8ee1-fadc616ba82a",
      "label": "PT Arthatech Selaras - assumut",
      "agreementNumber": "10211",
      "customerNumber": "07000165"
    },
    {
      "value": "3d25f964-8bb3-11ea-a7a0-005056a51573",
      "label": "PT BFI Finance Tbk",
      "agreementNumber": null,
      "customerNumber": "07000036"
    },
    {
      "value": "3d25f8ba-8bb3-11ea-a7a0-005056a51573",
      "label": "PT Bank DKI",
      "agreementNumber": null,
      "customerNumber": "07000066"
    },
    {
      "value": "8ff7ba0f-1ba7-4340-911e-67cc30f4ba7f",
      "label": "PT Bersama Kreatif Teknologi",
      "agreementNumber": "10194",
      "customerNumber": "07000148"
    },
    {
      "value": "3d25f766-8bb3-11ea-a7a0-005056a51573",
      "label": "PT CIKARANG LISTRINDO",
      "agreementNumber": null,
      "customerNumber": "07000035"
    },
    {
      "value": "4fa1c325-28d1-4850-862e-c7dd0ef8babe",
      "label": "PT CIPTA PRASADA GEMILANG",
      "agreementNumber": "10192",
      "customerNumber": "07000146"
    },
    {
      "value": "a1773c47-d36a-46bc-8c6f-b5ef250b32c9",
      "label": "PT Cahaya Avera Gemilang",
      "agreementNumber": "10162",
      "customerNumber": "07000104"
    },
    {
      "value": "9036e529-c91e-4d5f-a132-6c6d4014f59d",
      "label": "PT Cashlez worldwide Indonesia Tbk",
      "agreementNumber": "10195",
      "customerNumber": "07000149"
    },
    {
      "value": "7525187c-e784-4666-866e-6c3573b0b2e7",
      "label": "PT Dycodex Teknologi Nusantara",
      "agreementNumber": "10164",
      "customerNumber": "07000107"
    },
    {
      "value": "9e5d2231-aa4e-49ef-8213-df35d443f579",
      "label": "PT Indocyber Global Teknologi",
      "agreementNumber": "10114",
      "customerNumber": "07000043"
    },
    {
      "value": "37a42810-0982-43c4-9b80-a8e10cd94b37",
      "label": "PT Indosat Tbk",
      "agreementNumber": "10215",
      "customerNumber": "07000170"
    },
    {
      "value": "4ffd69cb-0810-4b68-a28a-d5bb83aa3597",
      "label": "PT Johm Energi Solusindo",
      "agreementNumber": "10160",
      "customerNumber": "07000101"
    },
    {
      "value": "26570380-427b-4e94-8108-810d44898b4a",
      "label": "PT Karsa Adiwidya Sukses",
      "agreementNumber": "7000031",
      "customerNumber": "07000031"
    },
    {
      "value": "3d25e906-8bb3-11ea-a7a0-005056a51573",
      "label": "PT Kirana Solusi Utama",
      "agreementNumber": null,
      "customerNumber": "07000093"
    },
    {
      "value": "6ec7b247-2a18-4a53-bc36-78925bbd4582",
      "label": "PT Linta Promosi Global (PROMOGO)",
      "agreementNumber": "10113",
      "customerNumber": "07000042"
    },
    {
      "value": "01182434-d7c6-493a-aee6-300d333b06f8",
      "label": "PT MUARA JUARA KREASI INDONESIA",
      "agreementNumber": "10158",
      "customerNumber": "07000097"
    },
    {
      "value": "60420073-c76b-48f2-9033-8dd9804875c8",
      "label": "PT Media Telekomunikasi Indonesia",
      "agreementNumber": "10181",
      "customerNumber": "07000135"
    },
    {
      "value": "71062a41-a63c-4abd-ac67-ae6c74b84243",
      "label": "PT Nielsen Audience Measurement",
      "agreementNumber": "507987017",
      "customerNumber": "07000067"
    },
    {
      "value": "3d25e6f4-8bb3-11ea-a7a0-005056a51573",
      "label": "PT PLN (PERSERO) UP2D JAWA TENGAH & D.I. YOGYAKARTA",
      "agreementNumber": null,
      "customerNumber": "07000064"
    },
    {
      "value": "0941a11c-93ab-43e2-9b7c-66db32c25b25",
      "label": "PT PLN (Persero) DISJATIM AREA MALANG",
      "agreementNumber": "7000006",
      "customerNumber": "07000006"
    },
    {
      "value": "3b3b1e64-d54a-4c29-b6f1-139056265f49",
      "label": "PT Panggung Electric Citrabuana",
      "agreementNumber": "10157",
      "customerNumber": "07000096"
    },
    {
      "value": "b0594739-65f3-42c9-b8be-fbc3bde0e2d3",
      "label": "PT Qualita Indonesia",
      "agreementNumber": "10190",
      "customerNumber": "07000144"
    },
    {
      "value": "b67b74bc-9e4b-4d99-aa9a-dc51e93e021b",
      "label": "PT Segitiga Delta Asia",
      "agreementNumber": "10165",
      "customerNumber": "07000115"
    },
    {
      "value": "2f62d12c-da5d-4339-8994-7d1d9b5b1f1a",
      "label": "PT Serasi Auto Raya",
      "agreementNumber": "509179294",
      "customerNumber": "07000038"
    },
    {
      "value": "b27e1fa9-2c1c-4b82-9b0d-af099b47125a",
      "label": "PT Sinar Mutiara EPC",
      "agreementNumber": "10201",
      "customerNumber": "07000155"
    },
    {
      "value": "d74182ad-5b74-475c-9693-4972a8258517",
      "label": "PT Sisnet Mitra Sejahtera",
      "agreementNumber": "10116",
      "customerNumber": "07000049"
    },
    {
      "value": "f0af6a3c-d1d3-40a7-9a60-3b1952908b80",
      "label": "PT WaveCommunication Indonesia",
      "agreementNumber": "10129",
      "customerNumber": "07000063"
    },
    {
      "value": "b2bbf763-401e-4cd5-bc31-89f5189cf71d",
      "label": "PT. ALTO HALODIGITAL INTERNATIONAL",
      "agreementNumber": "91387396",
      "customerNumber": "07000065"
    },
    {
      "value": "6ddc5da1-9bbd-4d78-a788-835add520c5a",
      "label": "PT. AirPay International Indonesia",
      "agreementNumber": "10156",
      "customerNumber": "07000095"
    },
    {
      "value": "bb3381e0-5971-4d5c-a511-1c0fc176d45d",
      "label": "PT. Bank BNI (Persero)",
      "agreementNumber": "10115",
      "customerNumber": "07000048"
    },
    {
      "value": "3d25f144-8bb3-11ea-a7a0-005056a51573",
      "label": "PT. Bank BNI (Persero) Balikpapan",
      "agreementNumber": null,
      "customerNumber": "07000073"
    },
    {
      "value": "3d25ebd6-8bb3-11ea-a7a0-005056a51573",
      "label": "PT. Bank BNI (Persero) Bandung",
      "agreementNumber": null,
      "customerNumber": "07000079"
    },
    {
      "value": "3d25ea6e-8bb3-11ea-a7a0-005056a51573",
      "label": "PT. Bank BNI (Persero) Denpasar",
      "agreementNumber": null,
      "customerNumber": "07000076"
    },
    {
      "value": "3d25ede8-8bb3-11ea-a7a0-005056a51573",
      "label": "PT. Bank BNI (Persero) Jakarta BSD",
      "agreementNumber": null,
      "customerNumber": "07000085"
    },
    {
      "value": "3d25f09a-8bb3-11ea-a7a0-005056a51573",
      "label": "PT. Bank BNI (Persero) Jakarta Kemayoran 1",
      "agreementNumber": null,
      "customerNumber": "07000086"
    },
    {
      "value": "3d25e4a6-8bb3-11ea-a7a0-005056a51573",
      "label": "PT. Bank BNI (Persero) Jakarta Kota",
      "agreementNumber": null,
      "customerNumber": "07000084"
    },
    {
      "value": "3d25e9ba-8bb3-11ea-a7a0-005056a51573",
      "label": "PT. Bank BNI (Persero) Jakarta Senayan 1",
      "agreementNumber": null,
      "customerNumber": "07000083"
    },
    {
      "value": "4b24a07c-58b3-4b10-b8c2-89298da8e9f8",
      "label": "PT. Bank BNI (Persero) Jakarta Test",
      "agreementNumber": "10149",
      "customerNumber": "07000087"
    },
    {
      "value": "3d25f400-8bb3-11ea-a7a0-005056a51573",
      "label": "PT. Bank BNI (Persero) Makassar",
      "agreementNumber": null,
      "customerNumber": "07000074"
    },
    {
      "value": "3d25f608-8bb3-11ea-a7a0-005056a51573",
      "label": "PT. Bank BNI (Persero) Malang",
      "agreementNumber": null,
      "customerNumber": "07000077"
    },
    {
      "value": "3d25eff0-8bb3-11ea-a7a0-005056a51573",
      "label": "PT. Bank BNI (Persero) Manado",
      "agreementNumber": null,
      "customerNumber": "07000071"
    },
    {
      "value": "3d25f34c-8bb3-11ea-a7a0-005056a51573",
      "label": "PT. Bank BNI (Persero) Medan",
      "agreementNumber": null,
      "customerNumber": "07000072"
    },
    {
      "value": "3d25d24a-8bb3-11ea-a7a0-005056a51573",
      "label": "PT. Bank BNI (Persero) Padang",
      "agreementNumber": null,
      "customerNumber": "07000080"
    },
    {
      "value": "3d25e37a-8bb3-11ea-a7a0-005056a51573",
      "label": "PT. Bank BNI (Persero) Palembang",
      "agreementNumber": null,
      "customerNumber": "07000081"
    },
    {
      "value": "3d25ed3e-8bb3-11ea-a7a0-005056a51573",
      "label": "PT. Bank BNI (Persero) Semarang",
      "agreementNumber": null,
      "customerNumber": "07000082"
    },
    {
      "value": "3d25f554-8bb3-11ea-a7a0-005056a51573",
      "label": "PT. Bank BNI (Persero) Surabaya",
      "agreementNumber": null,
      "customerNumber": "07000078"
    },
    {
      "value": "3d25ef46-8bb3-11ea-a7a0-005056a51573",
      "label": "PT. Bank BNI (Persero) Yogyakarta",
      "agreementNumber": null,
      "customerNumber": "07000075"
    },
    {
      "value": "a8108751-38e8-4b03-8662-5ab0838be63d",
      "label": "PT. Bank CIMB Niaga",
      "agreementNumber": "10153",
      "customerNumber": "07000092"
    },
    {
      "value": "6b2d5228-8064-4681-9b7d-c4b11cae0f2c",
      "label": "PT. Bank Mandiri (Persero)",
      "agreementNumber": "509179343",
      "customerNumber": "07000039"
    },
    {
      "value": "3d25f6b2-8bb3-11ea-a7a0-005056a51573",
      "label": "PT. Bank Rakyat Indonesia (Persero)",
      "agreementNumber": null,
      "customerNumber": "07000041"
    },
    {
      "value": "f9a0cc86-172a-4bd0-a653-7254a186325d",
      "label": "PT. Bank Tabungan Negara (Persero)",
      "agreementNumber": "91436504",
      "customerNumber": "07000046"
    },
    {
      "value": "0ce56871-e095-454f-92c4-071b9b2b81bb",
      "label": "PT. Cipta Krida Bahari",
      "agreementNumber": "10155",
      "customerNumber": "07000094"
    },
    {
      "value": "25af201a-decd-43ec-914c-3e84f08a3075",
      "label": "PT. HIPERNET INDODATA",
      "agreementNumber": "10177",
      "customerNumber": "07000130"
    },
    {
      "value": "2d2d7774-5827-46b0-9cf5-84c3a5749011",
      "label": "PT. INDONESIA COMNETS PLUS",
      "agreementNumber": "07000008",
      "customerNumber": "07000008"
    },
    {
      "value": "f7fb76c5-b7fd-4101-bbf3-8f0932ac9cdb",
      "label": "PT. Ingenico International Indonesia",
      "agreementNumber": "1",
      "customerNumber": "07000047"
    },
    {
      "value": "be60eb92-c0b0-41cb-9255-cf437d8b78b6",
      "label": "PT. MITRA ARTHA KREASI",
      "agreementNumber": "7000025",
      "customerNumber": "07000025"
    },
    {
      "value": "8949236a-755c-11ea-bc55-0242ac130003",
      "label": "PT. MULTI ADIPRAKARSA MANUNGGAL",
      "agreementNumber": "1",
      "customerNumber": "07000015"
    },
    {
      "value": "4104772c-5093-4153-935e-841063af02ee",
      "label": "PT. Mitra Transaksi Indonesia",
      "agreementNumber": "10175",
      "customerNumber": "07000128"
    },
    {
      "value": "08a5ae38-7c5f-4e19-9411-ff35c683481c",
      "label": "PT. NTT DATA INDONESIA",
      "agreementNumber": "7000016",
      "customerNumber": "07000016"
    },
    {
      "value": "3d25ee92-8bb3-11ea-a7a0-005056a51573",
      "label": "PT. PrimaVista",
      "agreementNumber": null,
      "customerNumber": "07000091"
    },
    {
      "value": "acd3a9d0-8544-4633-a474-18fa0c176944",
      "label": "PT. Qualita Indonesia Verifone",
      "agreementNumber": "10212",
      "customerNumber": "07000166"
    },
    {
      "value": "82464140-839d-4c44-8a37-a411a735520d",
      "label": "PT. Spots - Gobiz",
      "agreementNumber": "10150",
      "customerNumber": "07000089"
    },
    {
      "value": "381ed616-9b48-11eb-a8b3-0242ac130003",
      "label": "PT. Tianwang Technology Indonesia",
      "agreementNumber": null,
      "customerNumber": "07000040"
    },
    {
      "value": "e70f0135-11af-4005-ad59-57c439f02708",
      "label": "PT. VISIONET DATA INTERNASIONAL",
      "agreementNumber": "91188006",
      "customerNumber": "07000045"
    },
    {
      "value": "3d25f1f8-8bb3-11ea-a7a0-005056a51573",
      "label": "SLMM2M DKI MCA",
      "agreementNumber": null,
      "customerNumber": "07000099"
    },
    {
      "value": "98bc01a5-34ba-4b5e-b8a7-cde6d818b13c",
      "label": "Test CR",
      "agreementNumber": "Test CR",
      "customerNumber": "Test CR"
    },
    {
      "value": "a22ce89a-2ac7-47e5-9869-b6324f1cf5ec",
      "label": "Test Default Billing Conf 5",
      "agreementNumber": "1",
      "customerNumber": "005"
    },
    {
      "value": "6b45352e-b669-4b2e-b778-cad4dd87ee43",
      "label": "Test Default Config4",
      "agreementNumber": "string",
      "customerNumber": "004"
    },
    {
      "value": "405b5393-f43b-416b-8c1a-6e58adc95dea",
      "label": "Trial Customer",
      "agreementNumber": "20200515",
      "customerNumber": "07000117"
    },
    {
      "value": "a06e38ea-d871-4945-8126-44fab717180a",
      "label": "XL AXIATA",
      "agreementNumber": "22",
      "customerNumber": "07000001"
    },
    {
      "value": "3d25e636-8bb3-11ea-a7a0-005056a51573",
      "label": "XL Enterprise IOT",
      "agreementNumber": null,
      "customerNumber": "07000044"
    },
    {
      "value": "3b410cfb-3ef3-432a-b94d-38abb17aa836",
      "label": "XL Internal Testing",
      "agreementNumber": "10204",
      "customerNumber": "07000158"
    },
    {
      "value": "3d25ec8a-8bb3-11ea-a7a0-005056a51573",
      "label": "XL M2M Test",
      "agreementNumber": null,
      "customerNumber": "07000002"
    },
    {
      "value": "869cdcfe-6ea1-450b-a142-5495d430c299",
      "label": "XL onboard enterprise",
      "agreementNumber": "999999",
      "customerNumber": "07000088"
    },
    {
      "value": "ffa7989e-f872-4f0a-bfda-4df17658107e",
      "label": "pt cinta sejati",
      "agreementNumber": "123456",
      "customerNumber": "123456"
    },
    {
      "value": "57b58b32-40c7-4651-ae94-ace2b122101a",
      "label": "test enterprise 123",
      "agreementNumber": "111",
      "customerNumber": "0711111111"
    },
    {
      "value": "2101b479-3d33-4ad8-9fce-5ea019c2dbeb",
      "label": "test enterprise33",
      "agreementNumber": "11111",
      "customerNumber": "071111111"
    },
    {
      "value": "2cbc99e3-ecfe-4d47-8b1f-af3617bf19d1",
      "label": "testCobaBPHO",
      "agreementNumber": "1222",
      "customerNumber": "11"
    }
  ]);
  const renderItem = ({item, index}) => {
    return (
      <View
        style={[
          style.itemSeparatorCard,
          {
            borderLeftWidth: index % 2 === 0 ? 0 : 0.2,
            borderBottomWidth: index === 0 || index === 1 ? 0.2 : 0,
          },
        ]}>
        <Text
          numberOfLines={1}
          adjustsFontSizeToFit
          style={{
            fontSize: Orientation.getWidth() * 0.033,
            marginVertical: '5%',
          }}>
          {item.title}
        </Text>
        <Headline style={{fontWeight: 'bold', color: '#1139BF'}}>
          {item.resultId === 'totalaggregatedtraffic'
            ? Helper.formatBytes(item.value)
            : Helper.numberFormat(item.value, '.')}
        </Headline>
      </View>
    );
  };

  useEffect(() => {
    return navigation.addListener('focus', () => {
      dispatch(getDashboardSummary());
      dispatch(getWidgetList());
      dispatch(resetTopTrafficStatistics());
    });
  }, [dispatch, navigation]);

  // useEffect(() => {
  //   // dispatch(getEnterpriseList());
  //   console.log("=>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
  //   console.log(getEnterpriseList())
  //   console.log("=>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
  //   // setItems(getEnterpriseList())
  // }, [items])

  return (
    <><View>
      <HeaderContainer
        navigation={navigation}
        headerTitle={'Dashboard'}
        companyLogo={imageBase64} />
      <ScrollView
        style={{ marginBottom: 130 }}
        showsVerticalScrollIndicator={false}>
        <View style={{ height: '100%', alignItems: 'center' }}>
          <OverlayBackground />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'stretch',
              justifyContent: 'space-between',
              marginTop: 20,
              width: "100%",
              paddingHorizontal: 15
            }}>
            {filteringData ?
              <View
                style={{
                  backgroundColor: '#B3D335',
                  borderRadius: 10,
                  padding: 3,
                }}>
                <Text style={{ color: '#fff' }}>
                  {filteringData ? filteringData : ''}
                </Text>
              </View>
              :
              <View></View>
            }
            <TouchableOpacity onPress={() => { setModalVisible(!modalVisible); } }
              style={{
                flexDirection: 'row',
              }}>
              <FontAwesome name="filter" size={24} color="#fff" />
              <Text style={{ fontSize: 16, marginLeft: 10, color: "#fff" }}>Filter</Text>
            </TouchableOpacity>
          </View>
          <View style={[style.cardWrapper]}>
            <Card style={[style.cardSection, { marginTop: '3%' }]}>
              <Card.Content style={style.cardContentWrapper}>
                {loading ? (
                  <ActivityIndicator color={colors.main_color} size="large" />
                ) : (
                  <FlatList
                    data={summaryDashboardData}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.title}
                    numColumns={2}
                    columnWrapperStyle={style.cardContentRow} />
                )}
              </Card.Content>
            </Card>
            <View>{widgetList && <WidgetStore widgetList={widgetList} />}</View>
          </View>
        </View>
      </ScrollView>
    </View><Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      >
        <View
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "#00000030",
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
          activeOpacity={(0, 1)}>
          <View style={{flex: 1,
              justifyContent: "flex-end",
              alignItems: "center",
              marginTop: 22}}>
            <View style={{margin: 20,
                marginBottom:"75%",
                justifyContent: "center",
                backgroundColor: '#fff',
                borderRadius: 5,
                paddingHorizontal: 20,
                paddingVertical: 24,
                shadowColor: "#000",
                shadowOffset: 0,
                shadowOpacity: 0.25,
                shadowRadius: 4,
                alignItems:"flex-start",
                elevation: 5}}>
              <Text
                type="semiBold"
                textAlign="center"
                style={{
                  fontSize: 15,
                  marginBottom: 15,
                  textAlign: "left"
                }}>
                Enterprise
              </Text>
              <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                searchable={true}
                style={{zIndex:100, position:"relative", flexDirection:"row"}}
              />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 20,
                }}>
                <TouchableOpacity
                  onPress={() => setModalVisible(!modalVisible)}
                  style={{
                    backgroundColor: '#BACAD3',
                    borderRadius: 5,
                    textAlign: 'center',
                    width: "45%",
                    height: 50,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: "5%",
                    shadowColor: '#999',
                  }}>
                  <Text
                    textAlign="center"
                    style={{
                      fontFamily: 'RobotoMedium',
                      fontSize: 14,
                      color: '#fff',
                    }}>
                    Cancel
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    backgroundColor: '#165096',
                    borderRadius: 5,
                    textAlign: 'center',
                    width: "45%",
                    height: 50,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginLeft: "5%",
                    shadowColor: '#999'
                  }}>
                  <Text
                    textAlign="center"
                    style={{
                      fontSize: 14,
                      color: '#fff',
                    }}>
                    Apply Changes
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal></>
  );
};

export default DashboardPage;
