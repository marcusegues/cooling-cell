import React from 'react';
import { View } from 'react-native';

export const BinsRow = ({ children }) => (
  <View
    style={{
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 10,
      paddingHorizontal: 15,
    }}
  >
    {children}
  </View>
);
