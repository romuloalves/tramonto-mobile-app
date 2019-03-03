import React, { Component } from 'react';
import { View } from 'react-native';

import { createStackNavigator, createAppContainer } from 'react-navigation';

import nodejs from 'nodejs-mobile-react-native';

import { getBridgeContext, ACTIONS } from './bridge-context';

// Screens
import TestList from './screens/TestList';
import TestDetails from './screens/TestDetails/TestDetails';
import NewTest from './screens/NewTest';

// Modals
import Initialize from './screens/Initialize';

const MainNavigator = createStackNavigator({
  Home: { screen: TestList },
  Details: { screen: TestDetails },
  NewTest: { screen: NewTest }
}, {
  initialRouteName: 'Home',
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: 'rgb(30, 45, 62)'
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    }
  }
});
const RootStack = createStackNavigator({
  Main: {
    screen: MainNavigator
  },
  InitializeModal: {
    screen: Initialize
  }
}, {
  initialRouteName: 'Main',
  mode: 'modal',
  headerMode: 'none'
});
const App = createAppContainer(RootStack);

const BridgeContext = getBridgeContext(nodejs);

export default class extends Component {
  constructor(props) {
    super(props);

    this.onMessage = this.onMessage.bind(this);
  }

  componentWillMount() {
    nodejs.start('main.js');
    nodejs.channel.addListener('message', this.onMessage, this);
  }

  onMessage(msg) {
    const { action } = msg;

    if (action === 'node-initialized') {
      setTimeout(() => {
        nodejs.channel.send({
          action: ACTIONS.INIT_IPFS
        });
      }, 10000);
    }

    return alert(JSON.stringify(msg));
  }

  render() {
    return (
      <BridgeContext.Provider>
        <App />
      </BridgeContext.Provider>
    );
  }
}