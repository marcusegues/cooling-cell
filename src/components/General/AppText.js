import React from 'react';
import { Text } from 'react-native';

export const AppText = ({ children }) => (
  <Text
    style={{
      fontFamily: 'open-sans-regular',
      color: '#212121',
      fontSize: 20,
    }}
  >
    {children}
  </Text>
);
