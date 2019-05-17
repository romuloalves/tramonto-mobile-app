import React, { Component, Fragment } from 'react';
import { Appbar, BottomNavigation, Portal, Dialog, Headline, ActivityIndicator } from 'react-native-paper';

import { OneContext } from '../../contexts/one-context';

import ShareDialog from './ShareDialog';

import Artifacts from './Artifacts';
import Members from './Members';

class TestDetailsScreen extends Component {
  state = {
    dialogVisible: false,
    index: 0,
    routes: [
      { key: 'artifacts', title: 'ARTEFATOS', icon: 'insert-drive-file' },
      { key: 'people', title: 'MEMBROS', icon: 'group' }
    ],
    artifacts: [],
    people: [],
    readingStatus: null,
    isOwner: true
  };

  constructor(props) {
    super(props);

    this.showDialog = this.showDialog.bind(this);
    this.hideDialog = this.hideDialog.bind(this);
    this.onAddArtifactClick = this.onAddArtifactClick.bind(this);
  }

  async componentDidMount() {
    const { navigation, oneInstance } = this.props;
    const { ipfs, ipns, secret, ipnsKeyCreated, isOwner } = navigation.state.params;
    let test = null;

    if (!isOwner && ipnsKeyCreated) {
      test = await oneInstance.getTestbyIPNS(ipns, secret);
    } else {
      test = await oneInstance.getTestbyIPFS(ipfs, secret);
    }

    if (!test) {
      return alert('error');
    }

    this.props.navigation.setParams({
      showShareDialog: this.showDialog
    });

    return this.setState({
      artifacts: test.metadata.artifacts,
      people: test.metadata.members,
      isOwner
    });
  }

  _handleIndexChange = index => this.setState({ index });

  _renderScene = ({ route }) => {
    switch (route.key) {
      case 'artifacts':
        return (
          <Artifacts items={ this.state.artifacts }
            isOwner={ this.state.isOwner }
            onAddArtifactClick={ this.onAddArtifactClick } />
        );
      case 'people':
        return <Members items={ this.state.people } isOwner={ this.state.isOwner } />
    }
  };

  onAddArtifactClick() {
    return this.props.navigation.navigate('AddArtifact', this.props.navigation.state.params.ipns);
  }

  async showDialog() {
    const { navigation, oneInstance } = this.props;
    const { ipfs, ipnsKeyCreated, metadata } = navigation.state.params;

    if (!ipnsKeyCreated) {
      const testingResp = await oneInstance.publishToIPNSAsync(ipfs, metadata.name, v => alert(v));

      alert(testingResp);
    }

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
    const { dialogVisible, readingStatus } = this.state;
    const { metadata, ipns, secret, ipfs } = this.props.navigation.state.params;

    return (
      <Fragment>
        <Portal>
          <Dialog visible={ dialogVisible }
            onDismiss={ this.hideDialog }>
            <ShareDialog onClose={ this.hideDialog }
              name={ metadata.name }
              ipns={ ipns || '' }
              secret={ secret || '' }
              ipfs={ ipfs || '' } />
          </Dialog>
        </Portal>
        <BottomNavigation
          barStyle={{ backgroundColor: 'rgb(245, 245, 245)' }}
          activeColor="rgb(30, 45, 62)"
          inactiveColor="rgba(85, 85, 85, 0.4)"
          navigationState={ this.state }
          onIndexChange={ this._handleIndexChange }
          renderScene={ this._renderScene } />
          <Dialog visible={ readingStatus !== null }
            dismissable={ false }>
            <Dialog.Content>
              <ActivityIndicator animating={ true }
                color="rgb(30, 45, 62)"
                size="large">
              </ActivityIndicator>
              <Headline style={{ textAlign: 'center', marginTop: 20 }}>
                { readingStatus }
              </Headline>
            </Dialog.Content>
          </Dialog>
      </Fragment>
    );
  }
}

export default function TestDetailsScreenContainer(props) {
  return (
    <OneContext.Consumer>
    {
      context => <TestDetailsScreen { ...props } oneInstance={ context } />
    }
    </OneContext.Consumer>
  );
}

TestDetailsScreenContainer.navigationOptions = ({ navigation }) => ({
  title: navigation.state.params.metadata.name,
  headerRight: (
    <Appbar.Action icon="share"
      color="#fff"
      onPress={ navigation.getParam('showShareDialog') } />
  )
});