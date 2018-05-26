import React from 'react';
import { connect } from 'react-redux';
import { View, FlatList, Text } from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

class ScanViewInner extends React.Component {
  render() {
    const { bins } = this.props;
    console.log(bins);
    const flatListData = Object.keys(bins).map(binId => ({
      key: binId,
      component: (
        <View style={{ height: 20, width: '100%' }}>
          <Text>{binId}</Text>Text>
        </View>
      ),
    }));
    return (
      <View style={{ flex: 1, width: '100%' }}>
        <View
          style={{
            flex: 1,
            width: '100%',
            backgroundColor: 'black',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Ionicons name="ios-qr-scanner" size={60} color="#757575" />
        </View>
        <FlatList
          style={{
            width: '100%',
          }}
          data={flatListData}
          renderItem={({ item }) => item.component}
        />
      </View>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  bins: state.products.byId[ownProps.productId].bins,
});

export const ScanView = connect(mapStateToProps, null)(ScanViewInner);
