import React, { Component } from 'react';

import { createStackNavigator, createAppContainer } from 'react-navigation';

import nodejs from 'nodejs-mobile-react-native';

import { getBridgeContext } from './bridge-context';

// Screens
import TestListScreen from './screens/TestList';
import TestDetails from './screens/TestDetails/TestDetails';
import NewTestScreen from './screens/NewTest';

// Modals
import Initialize from './screens/Initialize';

const MainNavigator = createStackNavigator({
  Home: { screen: TestListScreen },
  Details: { screen: TestDetails },
  NewTest: { screen: NewTestScreen }
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
  Main: { screen: MainNavigator },
  InitializeModal: { screen: Initialize }
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
  }

  componentWillMount() {
    nodejs.start('main.js');
  }

  render() {
    return (
      <BridgeContext.Provider>
        <App />
      </BridgeContext.Provider>
    );
  }
}