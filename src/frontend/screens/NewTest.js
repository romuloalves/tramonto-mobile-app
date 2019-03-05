import React, { Component } from 'react';
import { View } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { StackActions, NavigationActions } from 'react-navigation';

import * as Tests from '../storage/tests';

import { getBridgeContext } from '../bridge-context';

const BridgeContext = getBridgeContext();

class NewTestScreen extends Component {
  static navigationOptions = {
    title: 'Novo teste'
  };

  state = {
    name: '',
    description: '',
    loading: false,
    buttonText: 'Publicar'
  };

  constructor(props) {
    super(props);

    this.createNewTest = this.createNewTest.bind(this);
  }

  componentDidMount() {
    this.context.onCreateTestMessage(payload => {
      this.setState({ loading: false }, async () => {
        const { name, description } = this.state;
        const newTest = {
          name,
          description,
          hash: payload.hash,
          secret: payload.secret
        };

        await Tests.addTest(newTest);

        const resetActions = StackActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({ routeName: 'Home' })
          ]
        });

        this.props.navigation.dispatch(resetActions);

        this.props.navigation.navigate('Details', newTest);
      });
    });
  }

  componentWillUnmount() {
    this.context.onCreateTestMessage();
  }

  createNewTest() {
    this.setState({
      loading: true,
      buttonText: 'Publicando'
    }, () => {
      const { name, description } = this.state;
      const { createTest } = this.context;

      createTest(name, description);
    });
  }

  render() {
    const { buttonText, loading } = this.state;

    return (
      <View style={{ paddingLeft: 20, paddingRight: 20, paddingTop: 10, paddingBottom: 20, display: 'flex', flex: 1, justifyContent: 'space-between' }}>
        <View>
          <TextInput
            label="Nome"
            value={ this.state.name }
            onChangeText={ name => this.setState({ name }) }
            mode="outlined"
            style={{ backgroundColor: '#fff' }}
            maxLength={ 6 }
            autoCapitalize="characters"
            returnKeyType="next"
            disabled={ loading } />
          <TextInput
            label="Descrição"
            value={ this.state.description }
            onChangeText={ description => this.setState({ description }) }
            multiline={ true }
            mode="outlined"
            style={{ marginTop: 20, backgroundColor: '#fff' }}
            disabled={ loading } />
        </View>
        <View>
          <Button mode="contained"
            loading={ loading }
            style={{ backgroundColor: 'rgb(220, 64, 69)', height: 45, justifyContent: 'center' }}
            onPress={ () => this.createNewTest() }
            disabled={ loading }>
            { buttonText }
          </Button>
        </View>
      </View>
    );
  }
}

NewTestScreen.contextType = BridgeContext;

export default NewTestScreen;