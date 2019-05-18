
import React, { PureComponent, Fragment } from 'react';

import ArtifactsList from '../../components/List';
import ListItem from '../../components/ListItem'

import { List } from 'react-native-paper';

let FabButton = null;

export default class Artifacts extends PureComponent {
  state = {
    isFabLoaded: false
  };

  constructor(props) {
    super(props);

    this.onListItemClick = this.onListItemClick.bind(this);
  }

  componentDidMount() {
    if (!this.props.isOwner || !this.props.onAddArtifactClick) {
      return;
    }

    if (FabButton === null) {
      FabButton = require('../../components/FabButton').default;
    }

    this.setState(() => ({
      isFabLoaded: true
    }));
  }

  onListItemClick(item) {
    if (!this.props.onArtifactDownload) {
      return;
    }

    return this.props.onArtifactDownload(item.hash);
  }

  render() {
    return (
      <Fragment>
        <ArtifactsList data={ this.props.items }
          keyExtractor={ item => item.hash }
          renderItem={ ({ item }) => (
            <ListItem title={ item.name }
              description={ item.description }
              onClick={ () => this.onListItemClick(item) }
              right={ props => <List.Icon {...props} icon="cloud-download" /> }></ListItem>
          ) } />
        {
          this.state.isFabLoaded && <FabButton icon="cloud-upload" onClick={ () => this.props.onAddArtifactClick() } />
        }
      </Fragment>
    );
  }
}
