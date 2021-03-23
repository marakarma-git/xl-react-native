import React from 'react';
import {View} from 'react-native';
import {HeaderContainer, OverlayBackground} from '../../components';
import {useSelector} from 'react-redux';
import {subscriptionStyle} from '../../style';
import TableFooter from '../../components/subscription/tableFooter';
import Table from '../../components/table/Table';
import SearchHeader from '../../components/subscription/searchHeader';
import AppliedFilter from '../../components/subscription/appliedFilter';
import FilterActionLabel from '../../components/subscription/filterActionLabel';

const UserAdministrationPage = () => {
  const {imageBase64} = useSelector((state) => state.enterprise_reducer);
  return (
    <HeaderContainer
      headerTitle={'User Administration'}
      style={{flex: 1}}
      companyLogo={imageBase64}>
      <View style={subscriptionStyle.containerBackground}>
        <Table
          isScrollView={true}
          stickHeaderIndices={[1]}
          headerOtherLayout={() => {
            return (
              <>
                <OverlayBackground />
                <SearchHeader
                  value={''}
                  onSubmitEditing={(e) => {}}
                  navigateTo={'UserAdministrationFilterPage'}
                  placeholder={'Search with user ID, name or organization'}
                />
                <AppliedFilter data={[]} onDelete={(e) => {}} />
                <FilterActionLabel filtered={1} total={100} />
              </>
            );
          }}
        />
        <TableFooter totalPage={100} currentPage={20} perPageValue={1} />
      </View>
    </HeaderContainer>
  );
};

export default UserAdministrationPage;
