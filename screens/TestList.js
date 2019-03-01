import React, { Component } from 'react';

import Theme from '../components/Theme';
import TestsList from '../components/List';
import ListItem from '../components/ListItem';

import { List } from 'react-native-paper';

import InstructionBanner from '../components/InstructionBanner';

import FabButton from '../components/FabButton';

export default class TestList extends Component {
  static navigationOptions = {
    title: 'Testes'
  };

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
        title: 'TR0001',
        description: 'Descrição do teste TR0001, relacionado ao software ABC'
      },
      {
        title: 'TR0002',
        description: 'O teste TR0002 é relacionado a funcionalidade 123 que tem por objetivo a manutenção de...'
      },
      {
        title: 'TR0003',
        description: 'Teste de intrusão na rede wireless da empresa XYZ'
      },
    ];

    const { bannerVisible } = this.state;

    return (
      <Theme>
        <InstructionBanner visible={ bannerVisible }
          onPress={ this.onBannerPress }>
          Esta é sua tela inicial. Ela lista todos os testes no qual você está envolvido.
        </InstructionBanner>
        <TestsList>
          {
            items.map((item, key) => (
              <ListItem key={ key }
                title={ item.title }
                description={ item.description }
                onClick={ () => this.onListItemClick(item) }
                right={ props => <List.Icon {...props} icon="star-border" /> }></ListItem>
            ))
          }
        </TestsList>
        <FabButton icon="add" onClick={ () => this.props.navigation.navigate('NewTest') }>
        </FabButton>
      </Theme>
    );
  }
}
