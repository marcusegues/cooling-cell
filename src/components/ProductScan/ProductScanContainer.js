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
          .map((product, idx) => (
            <ProductRow
              key={product.name}
              name={product.name}
              bins={product.bins}
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
          key={allProducts[prepareForExpand - 1].name}
          name={allProducts[prepareForExpand - 1].name}
          bins={allProducts[prepareForExpand - 1].bins}
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
        {allProducts.slice(order).map((product, idx) => {
          const currentOrder = order + idx + 1;
          return (
            <ProductRow
              key={product.name}
              name={product.name}
              bins={product.bins}
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
      Animated.timing(
        // Animate over time
        this.state.topBefore, // The animated value to drive
        {
          toValue: -(height - rowHeight + py), // Animate to opacity: 1 (opaque)
          duration: 1000, // Make it take a while
        }
      ).start();
      Animated.timing(
        // Animate over time
        this.state.topAfter, // The animated value to drive
        {
          toValue: -py, // Animate to opacity: 1 (opaque)
          duration: 1000, // Make it take a while
        }
      ).start();
    });
  }

  handleUnselectRow() {
    return new Promise(resolve => {
      let beforeAnimationDone = false;
      let afterAnimationDone = false;
      Animated.timing(
        // Animate over time
        this.state.topBefore, // The animated value to drive
        {
          toValue: 0, // Animate to opacity: 1 (opaque)
          duration: 1000, // Make it take a while
        }
      ).start(() => {
        beforeAnimationDone = true;
        if (beforeAnimationDone && afterAnimationDone) {
          resolve();
        }
      });
      Animated.timing(
        // Animate over time
        this.state.topAfter, // The animated value to drive
        {
          toValue: 0, // Animate to opacity: 1 (opaque)
          duration: 1000, // Make it take a while
        }
      ).start(() => {
        afterAnimationDone = true;
        if (beforeAnimationDone && afterAnimationDone) {
          resolve();
        }
      });
    }).then(() => {
      console.log(this.state);
      // this.setState({ prepareForExpand: 0 });
    });
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
          scrollEnabled={true}
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
  allProducts: state.products.allIds.map(id => state.products.byId[id]),
});

export default connect(mapStateToProps, null)(ProductScanContainerInner);
