import { createStackNavigator, createAppContainer } from 'react-navigation';

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

export default createAppContainer(MainNavigator);