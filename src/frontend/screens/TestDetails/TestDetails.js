import * as React from 'react';

import { Appbar, BottomNavigation, Text } from 'react-native-paper';

import Artifacts from './Artifacts';
import Members from './Members';

export default class MyComponent extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.name,
    headerRight: (
      <Appbar.Action icon="share"
        color="#fff"
        onPress={() => console.log('Pressed delete')} />
    )
  });

  state = {
    index: 0,
    routes: [
      { key: 'artifacts', title: 'ARTEFATOS', icon: 'insert-drive-file' },
      { key: 'people', title: 'MEMBROS', icon: 'group' }
    ]
  };

  _handleIndexChange = index => this.setState({ index });

  _renderScene = BottomNavigation.SceneMap({
    artifacts: Artifacts,
    people: Members
  });

  render() {
    return (
      <BottomNavigation
        barStyle={{ backgroundColor: 'rgb(245, 245, 245)' }}
        activeColor="rgb(30, 45, 62)"
        inactiveColor="rgba(85, 85, 85, 0.4)"
        navigationState={this.state}
        onIndexChange={this._handleIndexChange}
        renderScene={this._renderScene}
      />
    );
  }
}