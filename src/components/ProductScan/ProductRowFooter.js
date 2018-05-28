import React from 'react';
import { View, Dimensions } from 'react-native';
import Touchable from 'react-native-platform-touchable';
import { AppText } from '../General/Text/AppText';
import { DisplayProgress } from '../DisplayProgress/DisplayProgress';

const { height } = Dimensions.get('window');

const rowHeight = height / 8;

export const ProductRowFooter = ({
  expanded,
  handlePress,
  onUnselectRow,
  name,
  total,
  totalScanned,
}) => (
  <Touchable
    style={{ height: rowHeight, width: '100%' }}
    onPress={expanded ? () => onUnselectRow() : () => handlePress()}
  >
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        height: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
      }}
    >
      <AppText>{name}</AppText>
      <DisplayProgress total={total} totalScanned={totalScanned} />
    </View>
  </Touchable>
);
