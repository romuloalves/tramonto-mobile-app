import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import {
  TextInput,
  Button
} from 'react-native-paper';
import { StackActions, NavigationActions } from 'react-navigation';

import { SnackbarContext } from '../contexts/snackbar-context';
import { OneContext } from '../contexts/one-context';

class NewTestScreen extends Component {
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
    requestAnimationFrame(() => {
      this.setState(() => ({
        loading: true,
        buttonText: 'Publicando'
      }));

      const { snackbarContext, oneInstance, navigation } = this.props;
      const { name, description } = this.state;

      setTimeout(() => {
        oneInstance.createTest(name, description, (err, createdTest) => {
          if (err) {
            snackbarContext.setSnackBarText('Ocorreu um erro!');
          } else {
            snackbarContext.setSnackBarText('Teste publicado!');
          }

          snackbarContext.toggleSnackBar(true);

          const resetActions = StackActions.reset({
            index: 0,
            actions: [
              NavigationActions.navigate({ routeName: 'Main' })
            ]
          });

          const pageToNavigate = err ? 'Main' : 'Details';

          navigation.dispatch(resetActions);
          navigation.navigate(pageToNavigate, createdTest);
        });
      }, 50);
    });
  }

  render() {
    const { buttonText, loading } = this.state;

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
            disabled={ loading }
            blurOnSubmit={ true }/>
          <TextInput
            label="Descrição"
            value={ this.state.description }
            onChangeText={ description => this.setState({ description }) }
            multiline={ true }
            mode="outlined"
            style={{ marginTop: 20, backgroundColor: '#fff' }}
            disabled={ loading }
            blurOnSubmit={ true } />
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

export default function NewTestScreenContainer(props) {
  return (
    <SnackbarContext.Consumer>
      {
        snackBarContext => (
          <OneContext.Consumer>
            {
              oneContext => <NewTestScreen snackbarContext={ snackBarContext } oneInstance={ oneContext } { ...props } />
            }
          </OneContext.Consumer>
        )
      }
    </SnackbarContext.Consumer>
  );
}

NewTestScreenContainer.navigationOptions = {
  title: 'Novo teste'
};