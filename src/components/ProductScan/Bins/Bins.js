import React from 'react';
import { connect } from 'react-redux';
import { View, FlatList, Text } from 'react-native';
import { AppText } from '../../General/Text/AppText';
import { BinsRow } from './BinsRow';
import { RadioButton } from '../../General/RadioButton/RadioButton';
import { grey100 } from '../../../styles/colors';
import { DisplayProgress } from '../../DisplayProgress/DisplayProgress';
import { BinsRowFooter } from './BinsRowFooter';
import {
  getBinTotalByProductAndBin,
  getBinTotalScannedByProductAndBin,
  getScannedIdsForProductAndBin,
} from '../../../selectors';
import { BinScanComplete } from '../../General/BinScanComplete';
import { ExpandRow } from '../../General/ExpandRow';

class BinsInner extends React.Component {
  state = {
    expanded: null,
  };

  handleExpand(binId) {
    if (binId === this.state.expanded) {
      this.setState({ expanded: null });
      return;
    }
    this.setState({ expanded: binId });
  }

  render() {
    const {
      bins,
      scan,
      selectedBinId,
      onSelectBin,
      onExpand,
      total,
      totalScanned,
      scannedData,
    } = this.props;

    const flatListData = Object.keys(bins).map(binId => ({
      key: binId,
      component: () => {
        const expandCurrentRow = this.state.expanded === binId;
        const scannedLength = totalScanned(binId);
        const scannedDataArray = scannedData(binId);
        return (
          <BinsRow
            disabled={totalScanned(binId) === total(binId)}
            onPress={() => onSelectBin(binId)}
          >
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {totalScanned(binId) === total(binId) ? (
                  <BinScanComplete />
                ) : (
                  <RadioButton selected={binId === selectedBinId} />
                )}
                <AppText>{`Bin ${binId}`}</AppText>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <AppText>{`${totalScanned(binId)}/${total(binId)}`}</AppText>
                <ExpandRow
                  disabled={scannedLength === 0}
                  expanded={expandCurrentRow}
                  onPress={() => this.handleExpand(binId)}
                />
              </View>
            </View>
            {expandCurrentRow ? (
              <View style={{ width: '100%' }}>
                {scannedDataArray.map((barCode, idx) => (
                  <View
                    key={`${barCode.data}${idx}`}
                    style={{ flexDirection: 'row' }}
                  >
                    <Text>{barCode.data}</Text>
                  </View>
                ))}
              </View>
            ) : null}
          </BinsRow>
        );
      },
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
              renderItem={({ item }) => item.component()}
              ItemSeparatorComponent={() => (
                <View style={{ borderWidth: 0.5, borderColor: grey100 }} />
              )}
            />
          </View>
        )}
      </View>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  total: binId => getBinTotalByProductAndBin(state, ownProps.productId, binId),
  totalScanned: binId =>
    getBinTotalScannedByProductAndBin(state, ownProps.productId, binId),
  scannedData: binId =>
    getScannedIdsForProductAndBin(state, ownProps.productId, binId),
});

export const Bins = connect(mapStateToProps, null)(BinsInner);
