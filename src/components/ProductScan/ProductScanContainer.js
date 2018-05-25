import React from 'react';
import { connect } from 'react-redux';
import {
  FlatList,
  ScrollView,
  Text,
  Dimensions,
  View,
  Animated,
} from 'react-native';
import { ProductRow } from './ProductRow';

const height = Dimensions.get('window').height;
const rowHeight = height / 8;

class ProductScanContainerInner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      top: this.initialTop(),
      expanded: this.props.expanded || 0,
      py: 0,
      viewHeights: {},
      prepareForAnimation: 7,
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

  handleLayout(order, height) {
    this.setState({
      viewHeights: { ...this.state.viewHeights, [order]: height },
    });
  }

  numberProducts() {
    return this.props.allProducts.length;
  }

  buildBeforeView() {
    const { allProducts } = this.props;
    const { top, prepareForAnimation } = this.state;
    const numberProducts = this.numberProducts();
    const order = prepareForAnimation;
    return (
      <Animated.View style={{ zIndex: 10 }}>
        {allProducts
          .slice(0, order - 1)
          .map((product, idx) => (
            <ProductRow
              key={product.name}
              order={idx + 1}
              expanded={this.state.expanded === idx + 1}
              top={top[idx + 1]}
              zIndex={numberProducts - idx}
              onSelectRow={(order, offsetToPage) =>
                this.handleSelectRow(order, offsetToPage)
              }
              onUnselectRow={() => this.handleUnselectRow()}
              onLayout={(order, height) => this.handleLayout(order, height)}
            />
          ))}
      </Animated.View>
    );
  }

  selectedView() {
    const { allProducts } = this.props;
    const { prepareForAnimation, top } = this.state;
    const numberProducts = this.numberProducts();
    return (
      <Animated.View style={{ zIndex: 5 }}>
        <ProductRow
          key={allProducts[prepareForAnimation].name}
          order={prepareForAnimation}
          expanded={this.state.expanded === prepareForAnimation}
          top={top[prepareForAnimation]}
          zIndex={numberProducts - prepareForAnimation}
          onSelectRow={(order, offsetToPage) => {
            debugger;
            this.setState({
              prepareForAnimation: 0,
            });
          }}
          onUnselectRow={() => this.handleUnselectRow()}
          onLayout={(order, height) => this.handleLayout(order, height)}
        />
      </Animated.View>
    );
  }

  buildAfterView() {
    const { allProducts } = this.props;
    const { top, prepareForAnimation } = this.state;
    const numberProducts = this.numberProducts();
    const order = prepareForAnimation;
    return (
      <Animated.View style={{ zIndex: 3 }}>
        {allProducts.slice(order).map((product, idx) => {
          const currentOrder = order + idx + 1;
          return (
            <ProductRow
              key={product.name}
              order={currentOrder}
              expanded={this.state.expanded === currentOrder}
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

  handleSelectRow(order) {
    this.setState({ prepareForAnimation: order });
  }

  handleUnselectRow() {
    const range = [...Array(this.numberProducts()).keys()];
    const { py, expanded } = this.state;
    const order = expanded;
    this.setState(
      {
        expanded: 0,
      },
      () => {
        range.forEach(idx => {
          if (idx + 1 < order) {
            Animated.timing(
              // Animate over time
              this.state.top[idx + 1], // The animated value to drive
              {
                toValue: -height + (idx + 1) * rowHeight, // Animate to opacity: 1 (opaque)
                duration: 300, // Make it take a while
              }
            ).start();
          }
          if (idx + 1 >= order) {
            Animated.timing(
              // Animate over time
              this.state.top[idx + 1], // The animated value to drive
              {
                toValue: -height + (idx + 1) * rowHeight, // Animate to opacity: 1 (opaque)
                duration: 300, // Make it take a while
              }
            ).start();
          }
        }); // Starts the animation
        // this.scrollview.scrollTo({ x: 0, y: (order - 1) * rowHeight });
      }
    );
  }

  expandedOffset() {
    return this.state.expanded !== 0 ? height - rowHeight : 0;
  }

  handleScroll(event) {
    console.log('Scroll', event.nativeEvent.contentOffset.y);
    this.setState({
      currentScroll: event.nativeEvent.contentOffset.y,
    });
  }

  render() {
    const { allProducts, startScroll } = this.props;
    const { top, prepareForAnimation } = this.state;
    const numberProducts = this.numberProducts();

    return prepareForAnimation !== 0 ? (
      <View style={{ height }}>
        <ScrollView
          startScroll={startScroll || 0}
          scrollEnabled={this.state.expanded === 0}
          ref={scrollview => {
            this.scrollview = scrollview;
          }}
        >
          {this.buildBeforeView()}
          {this.selectedView()}
          {this.buildAfterView()}
          <View
            style={{
              height: rowHeight * numberProducts + this.expandedOffset(),
            }}
          />
        </ScrollView>
      </View>
    ) : (
      <View style={{ height }}>
        <ScrollView
          startScroll={startScroll || 0}
          scrollEnabled={this.state.expanded === 0}
          ref={scrollview => {
            this.scrollview = scrollview;
          }}
        >
          {allProducts.map((product, idx) => (
            <ProductRow
              key={product.name}
              order={idx + 1}
              expanded={this.state.expanded === idx + 1}
              top={top[idx + 1]}
              zIndex={numberProducts - idx}
              onSelectRow={(order, offsetToPage) =>
                this.handleSelectRow(order, offsetToPage)
              }
              onUnselectRow={() => this.handleUnselectRow()}
              onLayout={(order, height) => this.handleLayout(order, height)}
            />
          ))}
          <View
            style={{
              height: rowHeight * numberProducts + this.expandedOffset(),
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
