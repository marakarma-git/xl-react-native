import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import Table from '../../components/table/Table';
import {HeaderContainer, OverlayBackground} from '../../components';
import {useDispatch, useSelector} from 'react-redux';
import getBannerList, {
  bannerManagementSetDataBannerGenerated,
} from '../../redux/action/banner_management_get_banner_action';
import SearchHeader from '../../components/subscription/searchHeader';
import Loading from '../../components/loading';
import {subscriptionStyle} from '../../style';
import ModalMenuPicker from '../../components/modal/ModalMenuPicker';
import {dataMatcherArray2D} from '../../redux/action/get_sim_inventory_action';
import bannerManagementUpdateBundleArray from '../../redux/action/banner_management_array_header_action';

const BannerManagementPage = () => {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const {imageBase64} = useSelector((state) => state.enterprise_reducer);
  const {dataBannerHeader} = useSelector(
    (state) => state.banner_management_array_header_reducer,
  );
  const {loading, data_banner, data_banner_generated} = useSelector(
    (state) => state.banner_management_get_banner_reducer,
  );
  useEffect(() => {
    dispatch(getBannerList());
  }, [dispatch]);
  return (
    <HeaderContainer
      headerTitle={'Banner Management'}
      style={{flex: 1}}
      companyLogo={imageBase64}>
      <View style={subscriptionStyle.containerBackground}>
        <Table
          isDragNSort
          hideStickySide
          isScrollView={true}
          stickHeaderIndices={[1]}
          headerOtherLayout={() => {
            return (
              <>
                <OverlayBackground />
                <SearchHeader
                  value={''}
                  showMenu={showMenu}
                  onClickColumn={() => setShowMenu((state) => !state)}
                  navigateTo={'SubscriptionPackageFilter'}
                  placeholder={
                    'Search with role name, organization or description'
                  }
                />
              </>
            );
          }}
          dataHeader={dataBannerHeader}
          dataTable={data_banner_generated}
        />
        {loading && <Loading />}
      </View>
      {showMenu && (
        <ModalMenuPicker
          title={'Column'}
          data={dataBannerHeader}
          onApply={(e) => {
            dispatch(bannerManagementUpdateBundleArray({data: e}));
            const reGenerated = dataMatcherArray2D(data_banner, e);
            dispatch(
              bannerManagementSetDataBannerGenerated({
                dataBannerGenerated: reGenerated,
              }),
            );
            setShowMenu((state) => !state);
          }}
          onClose={() => setShowMenu((state) => !state)}
        />
      )}
    </HeaderContainer>
  );
};
export default BannerManagementPage;
