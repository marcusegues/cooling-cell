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
      currentScroll: 0,
      scrollBeforeExpand: 0,
      unselectedEvent: false,
      py: 0,
      viewHeights: {},
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.unselectedEvent) {
      setTimeout(
        () =>
          this.scrollview.scrollTo({ x: 0, y: this.state.scrollBeforeExpand }),
        100
      );
      this.setState({
        unselectedEvent: false,
      });
    }
  }

  initialTop() {
    const range = [...Array(this.numberProducts()).keys()];
    const top = {};
    range.forEach(idx => {
      top[idx] = new Animated.Value(-height + (idx + 1) * rowHeight);
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

  handleSelectRow(order, py) {
    const { viewHeights } = this.state;
    const range = [...Array(this.numberProducts()).keys()];
    this.setState(
      {
        expanded: order,
        scrollBeforeExpand: this.state.currentScroll,
        py,
      },
      () => {
        range.forEach(idx => {
          if (idx + 1 < order) {
            Animated.timing(
              // Animate over time
              this.state.top[idx], // The animated value to drive
              {
                toValue:
                  -height + (idx + 1) * rowHeight - (height - rowHeight + py), // Animate to opacity: 1 (opaque)
                duration: 1000, // Make it take a while
              }
            ).start();
          }
          if (idx + 1 >= order) {
            Animated.timing(
              // Animate over time
              this.state.top[idx], // The animated value to drive
              {
                toValue: -height + (idx + 1) * rowHeight - py, // Animate to opacity: 1 (opaque)
                duration: 1000, // Make it take a while
              }
            ).start();
          }
        }); // Starts the animation
        // this.scrollview.scrollTo({ x: 0, y: (order - 1) * rowHeight });
      }
    );
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
              this.state.top[idx], // The animated value to drive
              {
                toValue: -height + (idx + 1) * rowHeight, // Animate to opacity: 1 (opaque)
                duration: 1000, // Make it take a while
              }
            ).start();
          }
          if (idx + 1 >= order) {
            Animated.timing(
              // Animate over time
              this.state.top[idx], // The animated value to drive
              {
                toValue: -height + (idx + 1) * rowHeight, // Animate to opacity: 1 (opaque)
                duration: 1000, // Make it take a while
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
    const { top } = this.state;
    const numberProducts = this.numberProducts();

    return (
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
              top={top[idx]}
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
