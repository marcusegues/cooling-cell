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
      expanded: this.props.expanded || 0,
      currentScroll: 0,
      scrollBeforeExpand: 0,
      unselectedEvent: false,
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
    this.setState(
      {
        top: { ...this.initialTop(), ...top },
        expanded: order,
        scrollBeforeExpand: this.state.currentScroll,
      },
      () => {
        // debugger;
        this.scrollview.scrollTo({ x: 0, y: (order - 1) * rowHeight });
      }
    );
  }

  handleUnselectRow() {
    this.setState(
      {
        expanded: 0,
        top: this.initialTop(),
        unselectedEvent: true,
      },
      () => {
        // debugger;
        // this.scrollview.scrollTo({ x: 0, y: this.state.scrollBeforeExpand });
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
          onScroll={event => this.handleScroll(event)}
          scrollEventThrottle={1}
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
