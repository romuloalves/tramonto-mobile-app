import React from 'react';
import { StyleSheet } from 'react-native';

import { Banner, Surface } from 'react-native-paper';

export default function InstructionBanner({ children, visible, onPress }) {
  return (
    <Surface style={styles.surface}>
      <Banner visible={ visible }
        actions={[
          {
            label: 'Entendi',
            onPress: () => onPress()
          }
        ]}>
        { children }
      </Banner>
    </Surface>
  );
}

const styles = StyleSheet.create({
  surface: {
    padding: 1,
    elevation: 4
  },
});