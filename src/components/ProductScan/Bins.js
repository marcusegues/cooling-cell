import React from 'react';
import { View, FlatList } from 'react-native';
import { AppText } from '../General/AppText';

export const Bins = ({ bins }) => {
  const flatListData = Object.keys(bins).map(binId => ({
    key: binId,
    component: (
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <AppText>{binId}</AppText>
        <AppText>{`${bins[binId].scanned}/${bins[binId].total}`}</AppText>
      </View>
    ),
  }));
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        style={{
          width: '100%',
        }}
        data={flatListData}
        renderItem={({ item }) => item.component}
      />
    </View>
  );
};
