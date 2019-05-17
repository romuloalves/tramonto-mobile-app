
import React, { Component, Fragment } from 'react';

import ArtifactsList from '../../components/List';
import ListItem from '../../components/ListItem'

import { List } from 'react-native-paper';

import FabButton from '../../components/FabButton';

export default class Artifacts extends Component {
  constructor(props) {
    super(props);

    this.onListItemClick = this.onListItemClick.bind(this);
  }

  onListItemClick(item) {
    if (!this.props.onArtifactDownload) {
      return;
    }

    return this.props.onArtifactDownload(item.hash);
  }

  render() {
    const items = this.props.items;
    const addArtifactClick = this.props.onAddArtifactClick;

    return (
      <Fragment>
        <ArtifactsList>
          {
            items.map((item, key) => (
              <ListItem key={ key }
                title={ item.name }
                description={ item.description }
                onClick={ () => this.onListItemClick(item) }
                right={ props => <List.Icon {...props} icon="cloud-download" /> }></ListItem>
            ))
          }
        </ArtifactsList>
        {
          this.props.isOwner && addArtifactClick && <FabButton icon="cloud-upload" onClick={ () => addArtifactClick() } />
        }
      </Fragment>
    );
  }
}
