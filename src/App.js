import React, { Component } from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { DefaultTheme, Provider as PaperProvider, Snackbar } from 'react-native-paper';

import { OneContext, contextFunctions } from './contexts/one-context';
import { SnackbarContext } from './contexts/snackbar-context';

// Modals
import Initialize from './screens/Initialize';

const MainNavigator = createStackNavigator({
  Home: { screen: require('./screens/TestList').default },
  Details: { screen: require('./screens/TestDetails/TestDetails').default },
  NewTest: { screen: require('./screens/NewTest').default },
  ImportTest: { screen: require('./screens/ImportTest').default },
  AddArtifact: { screen: require('./screens/TestDetails/AddArtifact').default },
  AddMember: { screen: require('./screens/TestDetails/AddMember').default }
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
  initialRouteName: 'InitializeModal',
  mode: 'modal',
  headerMode: 'none'
});
const App = createAppContainer(RootStack);

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'rgb(30, 45, 62)',
    accent: 'rgb(220, 64, 69)'
  }
};

export default class extends Component {
  constructor(props) {
    super(props);

    const toggleSnackBar = (value, time) => {
      if (time) {
        setTimeout(() => {
          return this.setState({
            snackBarVisible: false
          });
        }, time);
      }

      return this.setState(({ snackBarVisible }) => {
        if (value === null || value === undefined) {
          value = !snackBarVisible;
        }

        return {
          snackBarVisible: value
        };
      });
    };

    const setSnackBarText = text => {
      return this.setState({
        snackBarText: text
      });
    };

    this.state = {
      snackBarVisible: false,
      snackBarText: '',
      toggleSnackBar,
      setSnackBarText
    };
  }

  render() {
    return (
      <PaperProvider theme={ theme }>
        <OneContext.Provider value={ contextFunctions }>
          <SnackbarContext.Provider value={ this.state }>
            <App />
            <Snackbar visible={ this.state.snackBarVisible }
              onDismiss={ () => this.state.toggleSnackBar(false) }
              action={{
                label: 'Fechar',
                onPress: () => this.state.toggleSnackBar(false)
              }}>
              { this.state.snackBarText }
            </Snackbar>
          </SnackbarContext.Provider>
        </OneContext.Provider>
      </PaperProvider>
    );
  }
}