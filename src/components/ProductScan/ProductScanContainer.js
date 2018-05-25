import React from 'react';
import { FlatList, ScrollView, Text, Dimensions, View } from 'react-native';
import { ProductRow } from './ProductRow';
const height = Dimensions.get('window').height;
const rowHeight = height / 8;
export default class ProductScanContainerInner extends React.Component {
  state = {
    index: 1,
  };

  render() {
    return (
      <View style={{ height }}>
        <ScrollView>
          <ProductRow order={1} zIndex={12} />
          <ProductRow order={2} zIndex={11} />
          <ProductRow order={3} zIndex={10} />
          <ProductRow order={4} zIndex={9} />
          <ProductRow order={5} zIndex={8} />
          <ProductRow order={6} zIndex={7} />
          <ProductRow order={7} zIndex={6} />
          <ProductRow order={8} zIndex={5} />
          <ProductRow order={9} zIndex={4} />
          <ProductRow order={10} zIndex={3} />
          <ProductRow order={11} zIndex={2} />
          <ProductRow order={12} zIndex={1} />
          <View style={{ height: rowHeight * 12 }} />
        </ScrollView>
      </View>
    );
  }
}
