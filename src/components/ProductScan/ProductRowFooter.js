import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import Touchable from 'react-native-platform-touchable';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const rowHeight = height / 8;

export const ProductRowFooter = ({
  expanded,
  handlePress,
  onUnselectRow,
  name,
}) => (
  <Touchable
    style={{ height: rowHeight, width: '100%' }}
    onPress={expanded ? () => {} : () => handlePress()}
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
          lineHeight: 60,
        }}
      >
        {name}
      </Text>
      <View style={{ height: 40 }}>
        {expanded ? (
          <Touchable onPress={onUnselectRow}>
            <MaterialIcons name="view-list" size={20} color="#757575" />
          </Touchable>
        ) : null}
      </View>
    </View>
  </Touchable>
);
