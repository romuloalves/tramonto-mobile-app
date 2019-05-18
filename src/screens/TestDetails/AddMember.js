import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import {
  TextInput,
  Button,
  Dialog,
  ActivityIndicator,
  Headline,
  Switch,
  Text,
  HelperText
} from 'react-native-paper';
import { StackActions, NavigationActions } from 'react-navigation';

import { SnackbarContext } from '../../contexts/snackbar-context';
import { OneContext } from '../../contexts/one-context';

class AddMemberScreen extends Component {
  state = {
    name: '',
    email: '',
    role: '',
    loading: false,
    buttonText: 'Adicionar',
    publishingStatus: null
  };

  constructor(props) {
    super(props);

    this.addMember = this.addMember.bind(this);
  }

  async addMember() {
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
            autoCapitalize="characters"
            returnKeyType="next"
            disabled={ loading } />
          <TextInput
            label="E-mail"
            value={ this.state.email }
            onChangeText={ email => this.setState({ email }) }
            multiline={ true }
            mode="outlined"
            style={{ marginTop: 20, backgroundColor: '#fff' }}
            disabled={ loading } />
          <TextInput
            label="Cargo"
            value={ this.state.role }
            onChangeText={ role => this.setState({ role }) }
            multiline={ true }
            mode="outlined"
            style={{ marginTop: 20, backgroundColor: '#fff' }}
            disabled={ loading } />
        </View>
        <View>
          <Button mode="contained"
            loading={ loading }
            style={{ backgroundColor: 'rgb(220, 64, 69)', height: 45, justifyContent: 'center' }}
            onPress={ async () => await this.addMember() }
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

export default function AddMemberScreenContainer(props) {
  return (
    <SnackbarContext.Consumer>
      {
        snackBarContext => (
          <OneContext.Consumer>
            {
              oneContext => <AddMemberScreen snackbarContext={ snackBarContext } oneInstance={ oneContext } { ...props } />
            }
          </OneContext.Consumer>
        )
      }
    </SnackbarContext.Consumer>
  );
}

AddMemberScreenContainer.navigationOptions = {
  title: 'Adicionar membro'
};