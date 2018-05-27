import React from 'react';
import { View } from 'react-native';
import { grey400, blue500 } from '../../../styles/colors';

export const RadioButton = ({ selected }) => (
  <View
    style={{
      height: 20,
      width: 20,
      borderRadius: 15,
      borderWidth: 1,
      borderColor: selected ? blue500 : grey400,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 10,
    }}
  >
    {selected ? (
      <View
        style={{
          height: 15,
          width: 15,
          borderRadius: 15,
          borderWidth: 1,
          borderColor: blue500,
          backgroundColor: blue500,
        }}
      />
    ) : null}
  </View>
);
