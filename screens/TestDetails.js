import React, { Component } from 'react';
import { Text } from 'react-native';

import { Appbar } from 'react-native-paper';

export default class TestDetails extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.title,
    headerRight: (
      <Appbar.Action icon="share"
        color="#fff"
        onPress={() => console.log('Pressed delete')} />
    )
  });

  render () {
    return (
      <Text>Hello!</Text>
    );
  }
}