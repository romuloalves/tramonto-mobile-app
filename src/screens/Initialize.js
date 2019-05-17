import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { ActivityIndicator, Headline } from 'react-native-paper';

import { OneContext } from '../contexts/one-context';

class InitializeScreen extends Component {
  componentDidMount() {
    try {
      this.props.oneInstance.initialize(() => {
        this.props.navigation.navigate('Main');
      });
    } catch (err) {
      alert(err.message);
    }
  }

  render() {
    return (
      <View style={ styles.container }>
        <ActivityIndicator animating={ true }
          color="rgb(30, 45, 62)"
          size="large">
        </ActivityIndicator>
        <Headline style={ styles.title }>Inicializando</Headline>
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