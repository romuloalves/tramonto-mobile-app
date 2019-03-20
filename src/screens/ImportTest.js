import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Dialog, ActivityIndicator, Headline } from 'react-native-paper';

import { SnackbarContext } from '../contexts/snackbar-context';

class ImportTestScreen extends Component {
  static navigationOptions = {
    title: 'Importar teste'
  };

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

  componentDidMount() {
    // const bridgeContext = this.props.bridgeContext;

    // bridgeContext.onImportTestProgress(payload => {
    //   return this.setState({
    //     importingStatus: payload
    //   });
    // });

    // bridgeContext.onImportTestMessage(payload => {
    //   this.setState({ loading: false, importingStatus: null }, async () => {
    //     const snackContext = this.props.snackbarContext;

    //     snackContext.setSnackBarText('Teste importado!');
    //     snackContext.toggleSnackBar(true);

    //     const newTest = {
    //       name: payload.name,
    //       description: payload.description,
    //       hash: payload.hash,
    //       secret: payload.secret,
    //       ipfs: payload.ipfs
    //     };

    //     await Tests.addTest(newTest);

    //     const resetActions = StackActions.reset({
    //       index: 0,
    //       actions: [
    //         NavigationActions.navigate({ routeName: 'Home' })
    //       ]
    //     });

    //     this.props.navigation.dispatch(resetActions);
    //   });
    // });
  }

  importTest() {
    this.setState({
      loading: true,
      buttonText: 'Importando'
    }, () => {
      const { hash, secret } = this.state;
      // const bridgeContext = this.props.bridgeContext;

      // bridgeContext.importTest(hash, secret);
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

export default function(props) {
  return (
    <SnackbarContext.Consumer>
      {
        snackBarContext => (
          <ImportTestScreen bridgeContext={ bridgeContext }
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