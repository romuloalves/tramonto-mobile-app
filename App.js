import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import Navbar from './components/Navbar';
import List from './components/List';
import ListItem from './components/ListItem';

import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'rgb(30, 45, 62)',
    accent: 'rgb(220, 64, 69)'
  }
};

type Props = {};
export default class App extends Component<Props> {
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
      <PaperProvider theme={theme}>
        <Navbar title="TESTES"></Navbar>
        <List>
          {
            items.map((item, key) => (
              <ListItem key={key}
                title={item.title}
                description={item.description}></ListItem>
            ))
          }
        </List>
      </PaperProvider>
    );
  }
}
