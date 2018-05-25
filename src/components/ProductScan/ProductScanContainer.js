import React from 'react';
import { connect } from 'react-redux';
import { FlatList, ScrollView, Text, Dimensions, View } from 'react-native';
import { ProductRow } from './ProductRow';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
const rowHeight = height / 8;

class ProductScanContainerInner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      top: this.initialTop(),
      startScroll: 0,
      expanded: 0,
      expandedOffset: 0,
      scrollEnabled: true,
    };
  }

  initialState() {}

  initialTop() {
    const range = [...Array(this.numberProducts()).keys()];
    const top = {};
    range.forEach(idx => {
      top[idx] = -height + (idx + 1) * rowHeight;
    });
    return top;
  }

  numberProducts() {
    return this.props.allProducts.length;
  }

  handleSelectRow(order, offsetToPage) {
    const range = [...Array(this.numberProducts()).keys()];
    const top = {};
    range.forEach(idx => {
      if (idx + 1 >= order) {
        top[idx] = -height + (idx + 1) * rowHeight + (height - rowHeight);
      }
    });

    this.scrollview.scrollTo({ x: 0, y: (order - 1) * rowHeight });
    this.setState({
      top: { ...this.initialTop(), ...top },
      expanded: order,
      expandedOffset: height - rowHeight,
      scrollEnabled: false,
    });
  }

  render() {
    const { allProducts } = this.props;
    const { top, startScroll } = this.state;
    const numberProducts = this.numberProducts();

    return (
      <View style={{ height }}>
        <ScrollView
          startScroll={startScroll}
          scrollEnabled={this.state.scrollEnabled}
          ref={scrollview => {
            this.scrollview = scrollview;
          }}
        >
          {allProducts.map((product, idx) => (
            <ProductRow
              key={product.name}
              order={idx + 1}
              expanded={this.state.expanded === idx + 1}
              top={top[idx]}
              zIndex={numberProducts - idx}
              onSelectRow={(order, offsetToPage) =>
                this.handleSelectRow(order, offsetToPage)
              }
            />
          ))}
          <View
            style={{
              height: rowHeight * numberProducts + this.state.expandedOffset,
            }}
          />
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  allProducts: state.products.allIds.map(id => state.products.byId[id]),
});

export default connect(mapStateToProps, null)(ProductScanContainerInner);
