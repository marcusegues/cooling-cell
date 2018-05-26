import React from 'react';
import { Text } from 'react-native';

export const AppText = ({ children }) => (
  <Text
    style={{
      fontFamily: 'open-sans-semi-bold',
      color: 'red',
      fontSize: 20,
    }}
  >
    {children}
  </Text>
);
