import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { ActivityIndicator, Button, Headline } from 'react-native-paper';
import RNExitApp from 'react-native-exit-app';

import { OneContext } from '../contexts/one-context';

class InitializeScreen extends Component {
  state = {
    signalTimer: null
  };

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    // alert(this.props.oneInstance);
    // await this.props.oneInstance.initialize();
    //  this.props.navigation.navigate('Main');
    //this.context.onInitializationReady(() => {
    //clearInterval(this.state.signalTimer);
    //this.setState({ signalTimer: null }, () => {
    //});
    //});

    //this.context.onInitializationError(() => {
    //alert('Error');
    //});
  }

  async componentDidMount() {
    try {
      await this.props.oneInstance.initialize();

      this.props.navigation.navigate('Main');
    } catch (err) {
      alert(err.message);
    }
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

export default props => (
  <OneContext.Consumer>
    { context => <InitializeScreen { ...props } oneInstance={ context }></InitializeScreen> }
  </OneContext.Consumer>
);