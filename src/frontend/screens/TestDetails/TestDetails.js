import React, { Component, Fragment } from 'react';
import { Appbar, BottomNavigation, Portal, Dialog } from 'react-native-paper';

import ShareDialog from './ShareDialog';

import Artifacts from './Artifacts';
import Members from './Members';

export default class MyComponent extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.name,
    headerRight: (
      <Appbar.Action icon="share"
        color="#fff"
        onPress={ navigation.getParam('showShareDialog') } />
    )
  });

  state = {
    dialogVisible: false,
    index: 0,
    routes: [
      { key: 'artifacts', title: 'ARTEFATOS', icon: 'insert-drive-file' },
      { key: 'people', title: 'MEMBROS', icon: 'group' }
    ]
  };

  constructor(props) {
    super(props);

    this.showDialog = this.showDialog.bind(this);
    this.hideDialog = this.hideDialog.bind(this);
  }

  componentDidMount() {
    this.props.navigation.setParams({
      showShareDialog: this.showDialog
    });
  }

  _handleIndexChange = index => this.setState({ index });

  _renderScene = BottomNavigation.SceneMap({
    artifacts: Artifacts,
    people: Members
  });

  showDialog() {
    return this.setState({
      dialogVisible: true
    });
  }

  hideDialog() {
    return this.setState({
      dialogVisible: false
    });
  }

  render() {
    const { dialogVisible } = this.state;
    const { name, hash, secret } = this.props.navigation.state.params;

    return (
      <Fragment>
        <Portal>
          <Dialog visible={ dialogVisible }
            onDismiss={ this.hideDialog }>
            <ShareDialog onClose={ this.hideDialog }
              name={ name }
              hash={ hash || '' }
              secret={ secret || '' } />
          </Dialog>
        </Portal>
        <BottomNavigation
          barStyle={{ backgroundColor: 'rgb(245, 245, 245)' }}
          activeColor="rgb(30, 45, 62)"
          inactiveColor="rgba(85, 85, 85, 0.4)"
          navigationState={this.state}
          onIndexChange={this._handleIndexChange}
          renderScene={this._renderScene}
        />
      </Fragment>
    );
  }
}