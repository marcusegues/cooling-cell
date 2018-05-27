import React from 'react';
import { Text } from 'react-native';

export const AppText = ({ children, fontSize = 20 }) => (
  <Text
    style={{
      fontFamily: 'open-sans-regular',
      color: '#212121',
      fontSize,
    }}
  >
    {children}
  </Text>
);
