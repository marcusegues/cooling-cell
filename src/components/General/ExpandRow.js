import React from 'react';
import { View } from 'react-native';
import Touchable from 'react-native-platform-touchable';
/* eslint-disable import/no-extraneous-dependencies */
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { blue500 } from '../../styles/colors';

const ChevronIcon = ({ expanded }) =>
  expanded ? (
    <MaterialCommunityIcons name="chevron-up" size={30} color={blue500} />
  ) : (
    <MaterialCommunityIcons name="chevron-down" size={30} color={blue500} />
  );

export const ExpandRow = ({ expanded = false, disabled, onPress }) => (
  <Touchable onPress={onPress}>
    <View
      style={{
        height: 30,
        width: 30,
        marginRight: 10,
      }}
    >
      {disabled ? null : ChevronIcon(expanded)}
    </View>
  </Touchable>
);
