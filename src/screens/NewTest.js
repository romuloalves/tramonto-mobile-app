import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Dialog, ActivityIndicator, Headline } from 'react-native-paper';

import { SnackbarContext } from '../contexts/snackbar-context';

class NewTestScreen extends Component {
  static navigationOptions = {
    title: 'Novo teste'
  };

  state = {
    name: '',
    description: '',
    loading: false,
    buttonText: 'Publicar',
    publishingStatus: null
  };

  constructor(props) {
    super(props);

    this.createNewTest = this.createNewTest.bind(this);
  }

  createNewTest() {
    this.setState({
      loading: true,
      buttonText: 'Publicando'
    }, () => {
      const { name, description } = this.state;
      // const bridgeContext = this.props.bridgeContext;

      // bridgeContext.createTest(name, description);
    });
  }

  render() {
    const { buttonText, loading, publishingStatus } = this.state;

    return (
      <View style={ styles.view }>
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
        <Dialog visible={ publishingStatus !== null }
          dismissable={ false }>
          <Dialog.Content>
            <ActivityIndicator animating={ true }
              color="rgb(30, 45, 62)"
              size="large">
            </ActivityIndicator>
            <Headline style={{ textAlign: 'center', marginTop: 20 }}>
              { publishingStatus }
            </Headline>
          </Dialog.Content>
        </Dialog>
      </View>
    );
  }
}

export default function(props) {
  return (
    <SnackbarContext.Consumer>
      {
        snackBarContext => (
          <NewTestScreen bridgeContext={ bridgeContext }
            snackbarContext={ snackBarContext }
            { ...props } />
        )
      }
    </SnackbarContext.Consumer>
  );
}

const styles = StyleSheet.create({
  view: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 20,
    display: 'flex',
    flex: 1,
    justifyContent: 'space-between'
  }
});