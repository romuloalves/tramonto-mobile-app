import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { ActivityIndicator, Button, Headline } from 'react-native-paper';
import RNExitApp from 'react-native-exit-app';

export default class InitializeScreen extends Component {
  //static contextType = BridgeContext;

  state = {
    signalTimer: null
  };

  componentWillMount() {
    //this.context.onInitializationReady(() => {
    //clearInterval(this.state.signalTimer);
    //this.setState({ signalTimer: null }, () => {
    //  this.props.navigation.navigate('Main');
    //});
    //});

    //this.context.onInitializationError(() => {
    //alert('Error');
    //});
  }

  componentDidMount() {
    //this.state.signalTimer = setInterval(() => {
    //this.context.askForState();
    //}, 1000);
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
