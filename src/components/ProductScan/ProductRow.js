import React from 'react';
import {
  Dimensions,
  View,
  Text,
  TouchableHighlight,
  Button,
  Animated,
} from 'react-native';

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
      this.props.onSelectRow(this.props.order, py);
    });
  }

  handleOnLayout(event) {
    const { x, y, width, height } = event.nativeEvent.layout;
    console.log('OnLayout', this.props.order, x, y, width, height);
    this.props.onLayout(this.props.order, height);
  }

  render() {
    const { top, expanded, zIndex } = this.props;
    return (
      <Animated.View
        style={{
          position: 'absolute',
          top,
          height,
          width,
          flex: 1,
          zIndex,
          alignItems: 'center',
          justifyContent: 'flex-end',
          borderWidth: 3,
          borderTopColor: 'red',
        }}
      >
        <View
          ref={view => {
            this.viewComponent = view;
          }}
          onLayout={event => this.handleOnLayout(event)}
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'flex-end',
            height: '100%',
            width: '100%',
          }}
        >
          <TouchableHighlight
            style={{ height: rowHeight, width: '100%' }}
            onPress={() => this.handlePress()}
          >
            <View>
              <Text style={{ color: 'red' }}>Hello</Text>
              <Text style={{ color: 'red' }}>You</Text>
              {expanded ? (
                <Button onPress={this.props.onUnselectRow} title={'Go Back'} />
              ) : null}
            </View>
          </TouchableHighlight>
        </View>
      </Animated.View>
    );
  }
}

export { ProductRow };
