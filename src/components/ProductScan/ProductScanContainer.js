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
      prepareForAnimation: 0,
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
    const { top, prepareForAnimation, topBefore } = this.state;
    const numberProducts = this.numberProducts();
    const order = prepareForAnimation;
    if (prepareForAnimation === 0) {
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
              order={idx + 1}
              expanded={this.state.prepareForAnimation === idx + 1}
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
    const { prepareForAnimation, top, topAfter } = this.state;
    const numberProducts = this.numberProducts();
    if (prepareForAnimation === 0) {
      return null;
    }
    return (
      <Animated.View style={{ zIndex: 5, top: topAfter }}>
        <ProductRow
          key={allProducts[prepareForAnimation - 1].name}
          name={allProducts[prepareForAnimation - 1].name}
          order={prepareForAnimation}
          expanded={this.state.prepareForAnimation === prepareForAnimation}
          top={top[prepareForAnimation]}
          zIndex={5 * (numberProducts - prepareForAnimation)}
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
    const { top, prepareForAnimation, topAfter } = this.state;
    const numberProducts = this.numberProducts();
    const order = prepareForAnimation;
    console.log('After products', allProducts.slice(order));
    return (
      <Animated.View style={{ zIndex: 3, top: topAfter }}>
        {allProducts.slice(order).map((product, idx) => {
          const currentOrder = order + idx + 1;
          return (
            <ProductRow
              key={product.name}
              name={product.name}
              order={currentOrder}
              expanded={this.state.prepareForAnimation === currentOrder}
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
    const { prepareForAnimation } = this.state;
    this.setState({ prepareForAnimation: order }, () => {
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
      this.setState({ prepareForAnimation: 0 });
    });
  }

  expandedOffset() {
    return this.state.expanded !== 0 ? height - rowHeight : 0;
  }

  render() {
    const { allProducts, startScroll } = this.props;
    const { top, prepareForAnimation } = this.state;
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
