import React from 'react';
import { connect } from 'react-redux';
import { Dimensions, View } from 'react-native';
import { ScanView } from './ScanView';
import { ProductRowFooter } from './ProductRowFooter';
import {
  getBinTotalForProduct,
  getBinTotalScannedForProduct,
} from '../../selectors';

const { height } = Dimensions.get('window');
const { width } = Dimensions.get('window');

class ProductRowInner extends React.Component {
  handlePress() {
    this.viewComponent.measure((fx, fy, w, h, px, py) => {
      this.props.onSelectRow(this.props.order, py);
    });
  }

  render() {
    const {
      top,
      expanded,
      zIndex,
      product,
      productId,
      total,
      totalScanned,
    } = this.props;
    const { name } = product;
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
          borderWidth: 0.5,
          borderBottomColor: '#F5F5F5',
        }}
      >
        {expanded ? <ScanView productId={productId} /> : null}
        <ProductRowFooter
          expanded={expanded}
          handlePress={() => this.handlePress()}
          onUnselectRow={() => this.props.onUnselectRow()}
          name={name}
          total={total}
          totalScanned={totalScanned}
        />
      </View>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  product: state.products.byId[ownProps.productId],
  total: getBinTotalForProduct(state, ownProps.productId),
  totalScanned: getBinTotalScannedForProduct(state, ownProps.productId),
});

export const ProductRow = connect(mapStateToProps, null)(ProductRowInner);
