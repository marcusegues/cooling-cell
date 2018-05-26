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

  render() {
    const {
      top,
      expanded,
      zIndex,
      borderTopColor = 'red',
      borderBottomColor = 'black',
      name,
    } = this.props;
    return (
      <View
        ref={view => {
          this.viewComponent = view;
        }}
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
          borderTopColor,
          borderBottomColor,
        }}
      >
        <TouchableHighlight
          style={{ height: rowHeight, width: '100%' }}
          onPress={() => this.handlePress()}
        >
          <View>
            <Text style={{ color: 'red' }}>Hello</Text>
            <Text style={{ color: 'red' }}>{name}</Text>
            {expanded ? (
              <Button onPress={this.props.onUnselectRow} title={'Go Back'} />
            ) : null}
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

export { ProductRow };
