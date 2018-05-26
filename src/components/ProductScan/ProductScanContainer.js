import React from 'react';
import { connect } from 'react-redux';
import {
  FlatList,
  ScrollView,
  Text,
  Dimensions,
  View,
  Animated,
  Button,
} from 'react-native';
import { ProductRow } from './ProductRow';

const height = Dimensions.get('window').height;
const rowHeight = height / 8;

class ProductScanContainerInner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      top: this.initialTop(),
      py: 0,
      prepareForExpand: 0,
      expandFinished: false,
      topBefore: new Animated.Value(0),
      topAfter: new Animated.Value(0),
    };
  }

  initialTop() {
    const range = [...Array(this.numberProducts()).keys()];
    const top = {};
    range.forEach(idx => {
      top[idx + 1] = -height + (idx + 1) * rowHeight;
    });
    return top;
  }

  numberProducts() {
    return this.props.allProducts.length;
  }

  buildBeforeView() {
    const { allProducts } = this.props;
    const { top, prepareForExpand, topBefore } = this.state;
    const numberProducts = this.numberProducts();
    const order = prepareForExpand;
    if (prepareForExpand === 0) {
      return null;
    }
    console.log('Before products', allProducts.slice(0, order - 1));
    return (
      <Animated.View style={{ zIndex: 10, top: topBefore }}>
        {allProducts
          .slice(0, order - 1)
          .map((productId, idx) => (
            <ProductRow
              key={productId}
              productId={productId}
              order={idx + 1}
              expanded={this.state.prepareForExpand === idx + 1}
              top={top[idx + 1]}
              zIndex={numberProducts - idx}
              onSelectRow={(order, offsetToPage) =>
                this.handleSelectRow(order, offsetToPage)
              }
              onUnselectRow={() => this.handleUnselectRow()}
            />
          ))}
      </Animated.View>
    );
  }

  selectedView() {
    const { allProducts } = this.props;
    const { prepareForExpand, top, topAfter } = this.state;
    const numberProducts = this.numberProducts();
    if (prepareForExpand === 0) {
      return null;
    }
    return (
      <Animated.View style={{ zIndex: 5, top: topAfter }}>
        <ProductRow
          key={allProducts[prepareForExpand - 1]}
          productId={allProducts[prepareForExpand - 1]}
          order={prepareForExpand}
          expanded={this.state.prepareForExpand === prepareForExpand}
          top={top[prepareForExpand]}
          zIndex={5 * (numberProducts - prepareForExpand)}
          onSelectRow={(order, offsetToPage) => {
            this.handleSelectRow(order, offsetToPage);
          }}
          onUnselectRow={() => this.handleUnselectRow()}
          onLayout={(order, height) => this.handleLayout(order, height)}
        />
      </Animated.View>
    );
  }

  buildAfterView() {
    const { allProducts } = this.props;
    const { top, prepareForExpand, topAfter } = this.state;
    const numberProducts = this.numberProducts();
    const order = prepareForExpand;
    console.log('After products', allProducts.slice(order));
    return (
      <Animated.View style={{ zIndex: 3, top: topAfter }}>
        {allProducts.slice(order).map((productId, idx) => {
          const currentOrder = order + idx + 1;
          return (
            <ProductRow
              key={productId}
              productId={productId}
              order={currentOrder}
              expanded={this.state.prepareForExpand === currentOrder}
              top={top[currentOrder]}
              zIndex={numberProducts - currentOrder}
              onSelectRow={(order, offsetToPage) =>
                this.handleSelectRow(order, offsetToPage)
              }
              onUnselectRow={() => this.handleUnselectRow()}
              onLayout={(order, height) => this.handleLayout(order, height)}
            />
          );
        })}
      </Animated.View>
    );
  }

  handleSelectRow(order, py) {
    const { prepareForExpand } = this.state;
    this.setState({ prepareForExpand: order }, () => {
      Animated.parallel([
        Animated.timing(
          // Animate over time
          this.state.topBefore, // The animated value to drive
          {
            toValue: -(height - rowHeight + py), // Animate to opacity: 1 (opaque)
            duration: 150, // Make it take a while
          }
        ),
        Animated.timing(
          // Animate over time
          this.state.topAfter, // The animated value to drive
          {
            toValue: -py,
            duration: 150, // Make it take a while
          }
        ),
      ]).start();
    });
  }

  handleUnselectRow() {
    Animated.parallel([
      Animated.timing(
        // Animate over time
        this.state.topBefore, // The animated value to drive
        {
          toValue: 0,
          duration: 150, // Make it take a while
        }
      ),
      Animated.timing(
        // Animate over time
        this.state.topAfter, // The animated value to drive
        {
          toValue: 0,
          duration: 150, // Make it take a while
        }
      ),
    ]).start(() => this.setState({ prepareForExpand: 0 }));
  }

  expandedOffset() {
    return this.state.expanded !== 0 ? height - rowHeight : 0;
  }

  render() {
    const { allProducts, startScroll } = this.props;
    const { top, prepareForExpand } = this.state;
    const numberProducts = this.numberProducts();

    return (
      <View style={{ height }}>
        <ScrollView
          startScroll={startScroll || 0}
          scrollEnabled={this.state.prepareForExpand === 0}
          ref={scrollview => {
            this.scrollview = scrollview;
          }}
        >
          {this.buildBeforeView()}
          {this.selectedView()}
          {this.buildAfterView()}

          <View
            style={{
              height: rowHeight * numberProducts,
            }}
          />
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  allProducts: state.products.allIds,
});

export default connect(mapStateToProps, null)(ProductScanContainerInner);
