import React from 'react';
import {
  Dimensions,
  View,
  Text,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Button,
  Animated,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Touchable from 'react-native-platform-touchable';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const rowHeight = height / 8;

class ProductRow extends React.Component {
  handlePress() {
    this.viewComponent.measure((fx, fy, width, height, px, py) => {
      this.props.onSelectRow(this.props.order, py);
    });
  }

  render() {
    const {
      top,
      expanded,
      zIndex,
      borderTopColor = 'white',
      borderBottomColor = 'black',
      name,
      bins,
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
        <Touchable
          style={{ height: rowHeight, width: '100%' }}
          onPress={() => this.handlePress()}
        >
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              height: '100%',
              justifyContent: 'space-between',
            }}
          >
            <Text
              style={{
                fontFamily: 'open-sans-semi-bold',
                color: 'red',
                fontSize: 20,
                lineHeight: 30,
              }}
            >
              {name}
            </Text>
            {expanded ? (
              <Touchable onPress={this.props.onUnselectRow}>
                <MaterialIcons name="view-list" size={20} color="#757575" />
              </Touchable>
            ) : null}
          </View>
        </Touchable>
      </View>
    );
  }
}

export { ProductRow };
