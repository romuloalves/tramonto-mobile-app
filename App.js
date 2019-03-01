import { createStackNavigator, createAppContainer } from 'react-navigation';

// Screens
import TestList from './screens/TestList';
import TestDetails from './screens/TestDetails/TestDetails';

const MainNavigator = createStackNavigator({
  Home: { screen: TestList },
  Details: { screen: TestDetails }
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

export default createAppContainer(MainNavigator);