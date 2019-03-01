import React, { Component } from 'react';

import Theme from '../components/Theme';
import List from '../components/List';
import ListItem from '../components/ListItem';

type Props = {};
export default class TestList extends Component<Props> {
  static navigationOptions = {
    title: 'Testes'
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

    return (
      <Theme>
        <List>
          {
            items.map((item, key) => (
              <ListItem key={ key }
                title={ item.title }
                description={ item.description }
                onClick={ () => this.onListItemClick(item) }></ListItem>
            ))
          }
        </List>
      </Theme>
    );
  }
}
