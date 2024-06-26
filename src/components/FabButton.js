import React from 'react';
import { StyleSheet } from 'react-native';
import { FAB } from 'react-native-paper';

export default function FabButton({ children, icon, onClick }) {
  return (
    <FAB
      style={ styles.fab }
      icon={ icon }
      label={ children }
      onPress={ () => onClick() } />
  );
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 25,
    right: 0,
    bottom: 0
  }
})