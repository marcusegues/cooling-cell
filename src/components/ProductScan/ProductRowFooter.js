import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import Touchable from 'react-native-platform-touchable';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import ProgressBar from 'react-native-progress/Bar';
import { AppText } from '../General/Text/AppText';
import { SecondaryText } from '../General/Text/SecondaryText';
import { blue100 } from '../../styles/colors';
import { DisplayProgress } from '../DisplayProgress/DisplayProgress';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

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
