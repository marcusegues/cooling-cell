import React from 'react';
import { View, FlatList } from 'react-native';
import { AppText } from '../../General/Text/AppText';
import { BinsRow } from './BinsRow';
import { Square } from './Square';
import { RadioButton } from '../../General/RadioButton/RadioButton';
import { grey100 } from '../../../styles/colors';
import { DisplayProgress } from '../../DisplayProgress/DisplayProgress';
import { BinsRowFooter } from './BinsRowFooter';

export const Bins = ({ bins, scan, selectedBinId, onSelectBin, onExpand }) => {
  const getTotal = binId => bins[binId].total;
  const getTotalScanned = binId => bins[binId].scanned;
  const flatListData = Object.keys(bins).map(binId => ({
    key: binId,
    component: (
      <BinsRow onPress={() => onSelectBin(binId)}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <RadioButton selected={binId === selectedBinId} />
          <AppText>{`Bin ${binId}`}</AppText>
        </View>
        <AppText>{`${getTotalScanned(binId)}/${getTotal(binId)}`}</AppText>
      </BinsRow>
    ),
  }));
  return (
    <View style={{ flex: 1 }}>
      {scan ? (
        <BinsRowFooter onPress={onExpand}>
          <AppText>{`Scanning for bin ${selectedBinId}`}</AppText>
          <DisplayProgress
            total={getTotal(selectedBinId)}
            totalScanned={getTotalScanned(selectedBinId)}
          />
        </BinsRowFooter>
      ) : (
        <View>
          <FlatList
            style={{
              width: '100%',
            }}
            data={flatListData}
            renderItem={({ item }) => item.component}
            ItemSeparatorComponent={() => (
              <View style={{ borderWidth: 0.5, borderColor: grey100 }} />
            )}
          />
        </View>
      )}
    </View>
  );
};
