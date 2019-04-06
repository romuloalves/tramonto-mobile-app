import React, { Component } from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { DefaultTheme, Provider as PaperProvider, Snackbar } from 'react-native-paper';

import { OneContext, contextFunctions } from './contexts/one-context';
import { SnackbarContext } from './contexts/snackbar-context';

// Screens
import TestListScreen from './screens/TestList';
import TestDetails from './screens/TestDetails/TestDetails';
import NewTestScreen from './screens/NewTest';
import ImportTestScreen from './screens/ImportTest';

// Modals
import Initialize from './screens/Initialize';

const MainNavigator = createStackNavigator({
  Home: { screen: TestListScreen },
  Details: { screen: TestDetails },
  NewTest: { screen: NewTestScreen },
  ImportTest: { screen: ImportTestScreen }
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

    const toggleSnackBar = value => {
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

  async componentDidMount() {
    // alert('Starting setup');

    // try {
    // // const instance = new One();

    // // await instance.setup();
    //   // await this.context.initialize();

    //   return alert('Repo started!!!! :X');
    // } catch (err) {
    //   alert('Error starting repo: ' + err);
    // }
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