import React from 'react';
import { Dimensions, View, Text, TouchableHighlight } from 'react-native';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const rowHeight = height / 8;

class ProductRow extends React.Component {
  handlePress() {
    this.viewComponent.measure((fx, fy, width, height, px, py) => {
      console.log('Component width is: ' + width);
      console.log('Component height is: ' + height);
      console.log('X offset to frame: ' + fx);
      console.log('Y offset to frame: ' + fy);
      console.log('X offset to page: ' + px);
      console.log('Y offset to page: ' + py);
    });
  }

  handleOnLayout(event) {
    const { x, y, width, height } = event.nativeEvent.layout;
    console.log('OnLayout', this.props.order, x, y, width, height);
  }

  render() {
    const { order, handlePress, zIndex } = this.props;
    return (
      <View
        ref={view => {
          this.viewComponent = view;
        }}
        onLayout={event => this.handleOnLayout(event)}
        style={{
          flex: 1,
          zIndex,
          alignItems: 'center',
          position: 'absolute',
          justifyContent: 'flex-end',
          top: -height + order * rowHeight,
          height,
          width,
          borderWidth: 3,
          borderTopColor: 'red',
        }}
      >
        <TouchableHighlight
          style={{ height: rowHeight, width: '100%' }}
          onPress={() => this.handlePress()}
        >
          <View>
            <Text style={{ color: 'red' }}>Hello</Text>
            <Text style={{ color: 'red' }}>You</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

export { ProductRow };
