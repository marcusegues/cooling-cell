import React from 'react';
import { connect } from 'react-redux';
import { View, FlatList } from 'react-native';
import { AppText } from '../../General/Text/AppText';
import { BinsRow } from './BinsRow';
import { RadioButton } from '../../General/RadioButton/RadioButton';
import { grey100 } from '../../../styles/colors';
import { DisplayProgress } from '../../DisplayProgress/DisplayProgress';
import { BinsRowFooter } from './BinsRowFooter';
import {
  getBinTotalByProductAndBin,
  getBinTotalScannedByProductAndBin,
} from '../../../selectors';
import { BinScanComplete } from './BinScanComplete';

export const BinsInner = ({
  bins,
  scan,
  selectedBinId,
  onSelectBin,
  onExpand,
  total,
  totalScanned,
}) => {
  const flatListData = Object.keys(bins).map(binId => ({
    key: binId,
    component: (
      <BinsRow
        disabled={totalScanned(binId) === total(binId)}
        onPress={() => onSelectBin(binId)}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {totalScanned(binId) === total(binId) ? (
            <BinScanComplete />
          ) : (
            <RadioButton selected={binId === selectedBinId} />
          )}
          <AppText>{`Bin ${binId}`}</AppText>
        </View>
        <AppText>{`${totalScanned(binId)}/${total(binId)}`}</AppText>
      </BinsRow>
    ),
  }));
  return (
    <View style={{ flex: 1 }}>
      {scan ? (
        <BinsRowFooter onPress={onExpand}>
          <AppText>{`Scanning for bin ${selectedBinId}`}</AppText>
          <DisplayProgress
            total={total(selectedBinId)}
            totalScanned={totalScanned(selectedBinId)}
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

const mapStateToProps = (state, ownProps) => ({
  total: binId => getBinTotalByProductAndBin(state, ownProps.productId, binId),
  totalScanned: binId =>
    getBinTotalScannedByProductAndBin(state, ownProps.productId, binId),
});

export const Bins = connect(mapStateToProps, null)(BinsInner);
