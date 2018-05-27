import React from 'react';
import { View } from 'react-native';
import Touchable from 'react-native-platform-touchable';

export const BinsRow = ({ children, onPress }) => (
  <Touchable onPress={onPress}>
    <View
      style={{
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        paddingLeft: 15,
        paddingRight: 15,
        backgroundColor: 'orange',
      }}
    >
      {children}
    </View>
  </Touchable>
);
