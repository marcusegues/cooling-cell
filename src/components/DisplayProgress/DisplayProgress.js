import React from 'react';
import { View } from 'react-native';
import ProgressBar from 'react-native-progress/Bar';
import { blue100 } from '../../styles/colors';
import { SecondaryText } from '../General/Text/SecondaryText';

export const DisplayProgress = ({ total, totalScanned }) => (
  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
    <SecondaryText style={{ marginRight: 5 }}>{`${totalScanned}/${
      total
    }`}</SecondaryText>
    <ProgressBar
      progress={totalScanned / total}
      width={100}
      height={20}
      borderRadius={10}
      color={blue100}
    />
  </View>
);
