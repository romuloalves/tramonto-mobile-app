import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { ActivityIndicator, Button, Headline } from 'react-native-paper';
import RNExitApp from 'react-native-exit-app';

import { getBridgeContext } from '../contexts/bridge-context';

const BridgeContext = getBridgeContext();

export default class InitializeScreen extends Component {
  static contextType = BridgeContext;

  componentWillMount() {
    this.context.onInitializationReady(() => {
      this.props.navigation.navigate('Main');
    });

    this.context.onInitializationError(() => {
      alert('Error');
    });
  }

  render() {
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