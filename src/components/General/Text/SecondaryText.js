import React from 'react';
import { AppText } from './AppText';

export const SecondaryText = ({ children, style = {} }) => (
  <AppText style={style} fontSize={10}>
    {children}
  </AppText>
);
