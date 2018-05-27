import React from 'react';
import { View, FlatList } from 'react-native';
import { AppText } from '../../General/AppText';
import { BinsRow } from './BinsRow';
import { Square } from './Square';

export const Bins = ({ bins }) => {
  const flatListData = Object.keys(bins).map(binId => ({
    key: binId,
    component: (
      <BinsRow>
        <View style={{ flexDirection: 'row' }}>
          <Square />
          <AppText>{binId}</AppText>
        </View>
        <AppText>{`${bins[binId].scanned}/${bins[binId].total}`}</AppText>
      </BinsRow>
    ),
  }));
  return (
    <View style={{ flex: 1 }}>
      <BinsRow>
        <AppText>{'Select bin'}</AppText>
      </BinsRow>
      <FlatList
        style={{
          width: '100%',
        }}
        data={flatListData}
        renderItem={({ item }) => item.component}
        ItemSeparatorComponent={() => (
          <View style={{ borderWidth: 0.5, borderColor: '#F5F5F5' }} />
        )}
      />
    </View>
  );
};
