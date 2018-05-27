import React from 'react';
import { Text } from 'react-native';

export const AppText = ({ children, fontSize = 20, style = {} }) => (
  <Text
    style={{
      fontFamily: 'open-sans-regular',
      color: '#212121',
      fontSize,
      ...style,
    }}
  >
    {children}
  </Text>
);
