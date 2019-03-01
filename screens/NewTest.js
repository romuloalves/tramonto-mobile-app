import React, { Component } from 'react';
import { View } from 'react-native';
import { TextInput, Divider, Button } from 'react-native-paper';

import Theme from '../components/Theme';

export default class TestList extends Component {
  static navigationOptions = {
    title: 'Novo teste'
  };

  state = {
    name: '',
    description: ''
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Theme>
        <View style={{ paddingLeft: 20, paddingRight: 20, paddingTop: 10, paddingBottom: 20, display: 'flex', flex: 1, justifyContent: 'space-between' }}>
          <View>
            <TextInput
              label="Nome"
              value={ this.state.name }
              onChangeText={ name => this.setState({ name }) }
              mode="outlined"
              style={{ backgroundColor: '#fff' }}
              maxLength={ 5 }
              autoCapitalize="characters"
              returnKeyType="next"
            />
            <TextInput
              label="Descrição"
              value={ this.state.description }
              onChangeText={ description => this.setState({ description }) }
              multiline={ true }
              mode="outlined"
              style={{ marginTop: 20, backgroundColor: '#fff' }}
            />
          </View>
          <View>
            <Button mode="contained"
              style={{ backgroundColor: 'rgb(220, 64, 69)', height: 45, justifyContent: 'center' }}>
              Salvar
            </Button>
          </View>
        </View>
      </Theme>
    );
  }
}