import React, { Component, Fragment } from 'react';
import { Appbar, BottomNavigation, Portal, Dialog } from 'react-native-paper';

import ShareDialog from './ShareDialog';

import Artifacts from './Artifacts';
import Members from './Members';

import { getBridgeContext } from '../../contexts/bridge-context';

const BridgeContext = getBridgeContext();

export default class TestDetailsScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.name,
    headerRight: (
      <Appbar.Action icon="share"
        color="#fff"
        onPress={ navigation.getParam('showShareDialog') } />
    )
  });

  static contextType = BridgeContext;

  state = {
    dialogVisible: false,
    index: 0,
    routes: [
      { key: 'artifacts', title: 'ARTEFATOS', icon: 'insert-drive-file' },
      { key: 'people', title: 'MEMBROS', icon: 'group' }
    ],
    artifacts: [],
    people: []
  };

  constructor(props) {
    super(props);

    this.showDialog = this.showDialog.bind(this);
    this.hideDialog = this.hideDialog.bind(this);
  }

  componentWillUnmount() {
    this.context.onReadTestMessage();
  }

  componentDidMount() {
    this.props.navigation.setParams({
      showShareDialog: this.showDialog
    });

    this.context.onReadTestMessage(payload => {
      const newState = {
        artifacts: payload.artifacts,
        people: payload.people
      };

      return this.setState(newState);
    });

    const { hash, secret } = this.props.navigation.state.params;

    this.context.readTest(hash, secret);
  }

  _handleIndexChange = index => this.setState({ index });

  _renderScene = ({ route }) => {
    switch (route.key) {
      case 'artifacts':
        return <Artifacts items={ this.state.artifacts } />;
      case 'people':
        return <Members items={ this.state.people } />
    }
  };

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
          navigationState={ this.state }
          onIndexChange={ this._handleIndexChange }
          renderScene={ this._renderScene } />
      </Fragment>
    );
  }
}