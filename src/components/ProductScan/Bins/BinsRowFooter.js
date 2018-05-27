import React from 'react';
import { Dimensions, View } from 'react-native';
import Touchable from 'react-native-platform-touchable';

const height = Dimensions.get('window').height;
const rowHeight = height / 8;

export const BinsRowFooter = ({ children, onPress }) => (
  <Touchable style={{ height: rowHeight, width: '100%' }} onPress={onPress}>
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        height: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
      }}
    >
      {children}
    </View>
  </Touchable>
);
