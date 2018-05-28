import React from 'react';
import { StyleSheet, Animated, View, Text } from 'react-native';
import { BarCodeScanner } from 'expo';
import Touchable from 'react-native-platform-touchable';
/* eslint-disable import/no-extraneous-dependencies */
import { Ionicons } from '@expo/vector-icons';

export const Scanner = ({
  scanViewFlex,
  scan,
  onBarCodeRead,
  onStartScan,
  selectedBinId,
}) => (
  <Animated.View
    style={{
      flex: scanViewFlex,
      width: '100%',
      backgroundColor: 'black',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    {scan ? (
      <BarCodeScanner
        onBarCodeRead={onBarCodeRead}
        style={StyleSheet.absoluteFill}
      />
    ) : (
      <Touchable onPress={onStartScan}>
        <View style={{ alignItems: 'center' }}>
          <Text
            style={{
              color: 'red',
            }}
          >
            {selectedBinId ? 'Tap to start scanning' : 'Please select a bin'}
          </Text>
          <Ionicons name="ios-qr-scanner" size={60} color="#757575" />
        </View>
      </Touchable>
    )}
  </Animated.View>
);
