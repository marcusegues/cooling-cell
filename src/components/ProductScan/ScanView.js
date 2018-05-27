import React from 'react';
import { connect } from 'react-redux';
import { View, FlatList, Text, Animated, StyleSheet } from 'react-native';
import { BarCodeScanner, Permissions } from 'expo';
import Touchable from 'react-native-platform-touchable';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { Bins } from './Bins/Bins';
import throttle from 'lodash/throttle';
import {
  getBinTotalByProductAndBin,
  getBinTotalScannedByProductAndBin,
} from '../../selectors';
import { saveScanData } from '../../actions/barCodes';
import { Scanner } from './Scanner';

class ScanViewInner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scan: false,
      scanViewFlex: new Animated.Value(0.5),
      selectedBinId: null,
    };
    this.throttledHandleBarCodeRead = throttle(this.handleBarCodeRead, 4000);
  }

  componentDidUpdate() {
    const { total, totalScanned } = this.props;
    const { selectedBinId } = this.state;
    // If all products have been scanned for a bin, end the scan
    if (
      selectedBinId &&
      totalScanned(selectedBinId) === total(selectedBinId) &&
      this.state.scan === true
    ) {
      this.endScan();
      this.setState({ selectedBinId: 0 });
    }
  }

  async handleStartScan() {
    if (this.state.selectedBinId === null) {
      return;
    }
    const { hasCameraPermission } = this.props;
    if (!hasCameraPermission) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      this.props
        .setHasCameraPermission(status === 'granted')
        .then(hasPermission => {
          if (hasPermission) {
            this.startScan();
          }
        });
    } else {
      this.startScan();
    }
  }

  startScan() {
    this.setState({ scan: true });
    Animated.timing(
      // Animate over time
      this.state.scanViewFlex, // The animated value to drive
      {
        toValue: 8,
        duration: 100, // Make it take a while
      }
    ).start();
  }

  endScan() {
    this.setState({ scan: false });
    Animated.timing(
      // Animate over time
      this.state.scanViewFlex, // The animated value to drive
      {
        toValue: 0.5,
        duration: 100, // Make it take a while
      }
    ).start();
  }

  handleSelectBin(selectedBinId) {
    if (selectedBinId === this.state.selectedBinId) {
      this.setState({ selectedBinId: null });
    } else {
      this.setState({ selectedBinId });
    }
  }

  handleBarCodeRead = ({ data, type }) => {
    const sound = Expo.Asset.fromModule(
      require('../../../assets/sounds/beep.mp3')
    );
    Expo.Audio.Sound.create(sound, { shouldPlay: true });
    const { productId } = this.props;
    const { selectedBinId } = this.state;
    console.log('barcode read');
    this.props.saveScan(productId, selectedBinId, { data, type });
  };

  render() {
    const { bins, productId } = this.props;
    const { scan, selectedBinId, scanViewFlex } = this.state;
    return (
      <View style={{ flex: 1, width: '100%' }}>
        <Scanner
          scanViewFlex={scanViewFlex}
          scan={scan}
          onBarCodeRead={this.throttledHandleBarCodeRead}
          onStartScan={() => this.handleStartScan()}
          selectedBinId={selectedBinId}
        />
        <Bins
          productId={productId}
          scan={scan}
          bins={bins}
          selectedBinId={selectedBinId}
          onSelectBin={selectedBinId => this.handleSelectBin(selectedBinId)}
          onExpand={() => this.endScan()}
        />
      </View>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  bins: state.products.byId[ownProps.productId].bins,
  hasCameraPermission: state.permissions.hasCameraPermission,
  total: binId => getBinTotalByProductAndBin(state, ownProps.productId, binId),
  totalScanned: binId =>
    getBinTotalScannedByProductAndBin(state, ownProps.productId, binId),
});

const mapDispatchToProps = dispatch => ({
  setHasCameraPermission: hasPermission => {
    return new Promise(resolve => {
      dispatch({ type: 'SET_HAS_CAMERA_PERMISSION', hasPermission });
      resolve(hasPermission);
    });
  },
  saveScan: (productId, binId, scanData) =>
    dispatch(saveScanData(productId, binId, scanData)),
});

export const ScanView = connect(mapStateToProps, mapDispatchToProps)(
  ScanViewInner
);
