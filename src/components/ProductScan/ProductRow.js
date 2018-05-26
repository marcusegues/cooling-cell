import React from 'react';
import { connect } from 'react-redux';
import {
  Dimensions,
  View,
  Text,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Button,
  Animated,
  StyleSheet,
} from 'react-native';
import { BarCodeScanner, Permissions } from 'expo';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

import { ScanView } from './ScanView';
import { ProductRowFooter } from './ProductRowFooter';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const rowHeight = height / 8;

class ProductRowInner extends React.Component {
  handlePress() {
    this.viewComponent.measure((fx, fy, width, height, px, py) => {
      this.props.onSelectRow(this.props.order, py);
    });
  }

  _handleBarCodeRead = ({ type, data }) => {
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  render() {
    const {
      top,
      expanded,
      zIndex,
      borderTopColor = 'white',
      borderBottomColor = 'black',
      product,
      productId,
    } = this.props;
    const { name, bins } = product;
    return (
      <View
        ref={view => {
          this.viewComponent = view;
        }}
        style={{
          position: 'absolute',
          top,
          height,
          width,
          flex: 1,
          zIndex,
          alignItems: 'center',
          justifyContent: 'flex-end',
          backgroundColor: 'white',
          borderWidth: 3,
          borderTopColor,
          borderBottomColor,
        }}
      >
        {expanded ? <ScanView productId={productId} /> : null}
        <ProductRowFooter
          expanded={expanded}
          handlePress={() => this.handlePress()}
          onUnselectRow={() => this.props.onUnselectRow()}
          name={name}
        />
      </View>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  product: state.products.byId[ownProps.productId],
});

export const ProductRow = connect(mapStateToProps, null)(ProductRowInner);
