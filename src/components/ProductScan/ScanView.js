import React from 'react';
import { connect } from 'react-redux';
import { View, FlatList, Text, Animated, StyleSheet } from 'react-native';
import { BarCodeScanner, Permissions } from 'expo';
import Touchable from 'react-native-platform-touchable';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { AppText } from '../General/AppText';

class ScanViewInner extends React.Component {
  state = {
    scan: false,
    scanViewFlex: new Animated.Value(1),
  };

  async handleStartScan() {
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
        toValue: 10, // Animate to opacity: 1 (opaque)
        duration: 100, // Make it take a while
      }
    ).start();
  }

  _handleBarCodeRead = ({ type, data }) => {
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  render() {
    const { bins } = this.props;
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
      <View style={{ flex: 1, width: '100%' }}>
        <Animated.View
          style={{
            flex: this.state.scanViewFlex,
            width: '100%',
            backgroundColor: 'black',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {this.state.scan ? (
            <BarCodeScanner
              onBarCodeRead={this._handleBarCodeRead}
              style={StyleSheet.absoluteFill}
            />
          ) : (
            <Touchable onPress={() => this.handleStartScan()}>
              <Ionicons name="ios-qr-scanner" size={60} color="#757575" />
            </Touchable>
          )}
        </Animated.View>
        <View style={{ flex: 2 }}>
          <FlatList
            style={{
              width: '100%',
            }}
            data={flatListData}
            renderItem={({ item }) => item.component}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  bins: state.products.byId[ownProps.productId].bins,
  hasCameraPermission: state.permissions.hasCameraPermission,
});

const mapDispatchToProps = dispatch => ({
  setHasCameraPermission: hasPermission => {
    return new Promise(resolve => {
      dispatch({ type: 'SET_HAS_CAMERA_PERMISSION', hasPermission });
      resolve(hasPermission);
    });
  },
});

export const ScanView = connect(mapStateToProps, mapDispatchToProps)(
  ScanViewInner
);
