import React from 'react';
import { View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { blue500 } from '../../styles/colors';

export const ExpandRow = ({ expanded = false }) => (
  <View
    style={{
      height: 30,
      width: 30,
      marginRight: 10,
    }}
  >
    {expanded ? (
      <MaterialCommunityIcons name="chevron-up" size={30} color={blue500} />
    ) : (
      <MaterialCommunityIcons name="chevron-down" size={30} color={blue500} />
    )}
  </View>
);
