import React from 'react';
import { connect } from 'react-redux';
import { View, Animated } from 'react-native';
import throttle from 'lodash/throttle';
import { Permissions } from 'expo';
import { Bins } from './Bins/Bins';

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
    /* eslint-disable no-undef */
    const sound = Expo.Asset.fromModule(
      /* eslint-disable global-require */
      require('../../../assets/sounds/beep.mp3')
    );
    /* eslint-disable no-undef */
    Expo.Audio.Sound.create(sound, { shouldPlay: true });

    const { productId } = this.props;
    const { selectedBinId } = this.state;
    const allScanned = this.props.saveScan(productId, selectedBinId, {
      data,
      type,
    });
    if (allScanned) {
      this.endScan();
      this.setState({ selectedBinId: 0 });
    }
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
          onSelectBin={selectedId => this.handleSelectBin(selectedId)}
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
  setHasCameraPermission: hasPermission =>
    new Promise(resolve => {
      dispatch({ type: 'SET_HAS_CAMERA_PERMISSION', hasPermission });
      resolve(hasPermission);
    }),
  saveScan: (productId, binId, scanData) =>
    dispatch(saveScanData(productId, binId, scanData)),
});

export const ScanView = connect(mapStateToProps, mapDispatchToProps)(
  ScanViewInner
);
