import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ActivityIndicator, Button, Headline } from 'react-native-paper';
import RNExitApp from 'react-native-exit-app';

export default function Initialize() {
  return (
    <View style={ styles.container }>
      <ActivityIndicator animating={ true }
        color="rgb(30, 45, 62)"
        size="large">
      </ActivityIndicator>
      <Headline style={ styles.title }>Inicializando</Headline>
      <Button mode="outlined"
        onPress={ () => RNExitApp.exitApp() }>
        Fechar
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    marginTop: 30,
    marginBottom: 100
  }
});