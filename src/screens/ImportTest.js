import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Dialog, ActivityIndicator, Headline } from 'react-native-paper';

import { SnackbarContext } from '../contexts/snackbar-context';
import { OneContext } from '../contexts/one-context';

class ImportTestScreen extends Component {
  state = {
    hash: '',
    secret: '',
    loading: false,
    buttonText: 'Importar',
    importingStatus: null
  };

  constructor(props) {
    super(props);

    this.importTest = this.importTest.bind(this);
  }

  importTest() {
    this.setState({
      loading: true,
      buttonText: 'Importando'
    }, () => {
      setTimeout(async () => {
        const { hash, secret } = this.state;
        const { oneContext, snackbarContext } = this.props;

        const importedTest = await oneContext.importTest(hash, secret);

        snackbarContext.setSnackBarText('Teste importado!');
        snackbarContext.toggleSnackBar(true);

        const resetActions = StackActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({ routeName: 'Main' })
          ]
        });

        navigation.dispatch(resetActions);
        navigation.navigate('Details', importedTest);
      });
    });
  }

  render() {
    const { buttonText, loading, importingStatus } = this.state;

    return (
      <View style={ styles.view }>
        <View>
          <TextInput
            label="Hash"
            value={ this.state.hash }
            onChangeText={ hash => this.setState({ hash }) }
            mode="outlined"
            style={{ backgroundColor: '#fff' }}
            returnKeyType="next"
            disabled={ loading } />
          <TextInput
            label="Chave"
            value={ this.state.secret }
            onChangeText={ secret => this.setState({ secret }) }
            mode="outlined"
            style={{ marginTop: 20, backgroundColor: '#fff' }}
            disabled={ loading } />
        </View>
        <View>
          <Button mode="contained"
            loading={ loading }
            style={{ backgroundColor: 'rgb(220, 64, 69)', height: 45, justifyContent: 'center' }}
            onPress={ () => this.importTest() }
            disabled={ loading }>
            { buttonText }
          </Button>
        </View>
        <Dialog visible={ importingStatus !== null }
          dismissable={ false }>
          <Dialog.Content>
            <ActivityIndicator animating={ true }
              color="rgb(30, 45, 62)"
              size="large">
            </ActivityIndicator>
            <Headline style={{ textAlign: 'center', marginTop: 20 }}>
              { importingStatus }
            </Headline>
          </Dialog.Content>
        </Dialog>
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

export default function ImportTestScreenContainer(props) {
  return (
    <SnackbarContext.Consumer>
      {
        snackBarContext => (
          <OneContext.Consumer>
            {
              oneContext => (
                <ImportTestScreen snackbarContext={ snackBarContext }
                  oneContext={ oneContext }
                  { ...props } />
              )
            }
          </OneContext.Consumer>
        )
      }
    </SnackbarContext.Consumer>
  );
}

ImportTestScreenContainer.navigationOptions = {
  title: 'Importar teste'
};
