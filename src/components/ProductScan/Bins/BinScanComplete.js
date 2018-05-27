import React from 'react';
import { View } from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { blue500 } from '../../../styles/colors';

export const BinScanComplete = ({ selected = true }) => (
  <View
    style={{
      height: 30,
      width: 30,
      marginRight: 10,
    }}
  >
    {selected ? <MaterialIcons name="check" size={30} color={blue500} /> : null}
  </View>
);
