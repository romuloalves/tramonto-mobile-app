import React, { Component } from 'react';
import { View } from 'react-native';

import { createStackNavigator, createAppContainer } from 'react-navigation';

import nodejs from 'nodejs-mobile-react-native';

import { getBridgeContext } from './bridge-context';

// Screens
import TestList from './screens/TestList';
import TestDetails from './screens/TestDetails/TestDetails';

// Models
import NewTest from './screens/NewTest';

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

const BridgeContext = getBridgeContext(nodejs);
const App = createAppContainer(MainNavigator);

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
    return alert(msg);
  }

  render() {
    return (
      <BridgeContext.Provider>
        <App />
      </BridgeContext.Provider>
    );
  }
}