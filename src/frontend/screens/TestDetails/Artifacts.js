
import React, { Component, Fragment } from 'react';

import ArtifactsList from '../../components/List';
import ListItem from '../../components/ListItem'

import { List } from 'react-native-paper';

import FabButton from '../../components/FabButton';

import { getBridgeContext } from '../../contexts/bridge-context';

const BridgeContext = getBridgeContext();

export default class TestList extends Component {
  state = {
    bannerVisible: true
  };

  constructor(props) {
    super(props);

    this.onListItemClick = this.onListItemClick.bind(this);
  }

  onListItemClick(item) {
    this.props.navigation.navigate('Details', item);

    return;
  }

  render() {
    const items = this.props.items;
    const { bannerVisible } = this.state;

    return (
      <BridgeContext.Consumer>
        {
          ({ send }) => (
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
              <FabButton icon="cloud-upload" onClick={ () => send() }>
              </FabButton>
            </Fragment>
          )
        }
      </BridgeContext.Consumer>
    );
  }
}
