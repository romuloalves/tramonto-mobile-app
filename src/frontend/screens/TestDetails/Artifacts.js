
import React, { Component } from 'react';

import Theme from '../../components/Theme';
import ArtifactsList from '../../components/List';
import ListItem from '../../components/ListItem'

import { List } from 'react-native-paper';

import InstructionBanner from '../../components/InstructionBanner';

import FabButton from '../../components/FabButton';

import { getBridgeContext, ACTIONS } from '../../bridge-context';

const BridgeContext = getBridgeContext();

export default class TestList extends Component {
  state = {
    bannerVisible: true
  };

  constructor(props) {
    super(props);

    this.onListItemClick = this.onListItemClick.bind(this);
    this.onBannerPress = this.onBannerPress.bind(this);
  }

  onBannerPress() {
    return this.setState({
      bannerVisible: false
    });
  }

  onListItemClick(item) {
    this.props.navigation.navigate('Details', item);

    return;
  }

  render() {
    const items = [
      {
        title: 'Artefato 1',
        description: 'Executor Um'
      },
      {
        title: 'Artefato 2',
        description: 'Executor Um'
      },
      {
        title: 'Artefato 3',
        description: 'Executor Dois'
      },
    ];

    const { bannerVisible } = this.state;

    return (
      <BridgeContext.Consumer>
        {
          ({ send }) => (
            <Theme>
              <InstructionBanner visible={ bannerVisible }
                onPress={ this.onBannerPress }>
                Esta tela lista todos os artefatos adicionados ao teste.
              </InstructionBanner>
              <ArtifactsList>
                {
                  items.map((item, key) => (
                    <ListItem key={ key }
                      title={ item.title }
                      description={ item.description }
                      onClick={ () => this.onListItemClick(item) }
                      right={ props => <List.Icon {...props} icon="cloud-download" /> }></ListItem>
                  ))
                }
              </ArtifactsList>
              <FabButton icon="cloud-upload" onClick={ () => send(ACTIONS.ADD_FILE) }>
              </FabButton>
            </Theme>
          )
        }
      </BridgeContext.Consumer>
    );
  }
}
