import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import RNFS from 'react-native-fs';
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
import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker';

import { SnackbarContext } from '../../contexts/snackbar-context';
import { OneContext } from '../../contexts/one-context';

class AddArtifactScreen extends Component {
  state = {
    name: '',
    description: '',
    file: null,
    loading: false,
    buttonText: 'Adicionar',
    publishingStatus: null
  };

  constructor(props) {
    super(props);

    this.addArtifact = this.addArtifact.bind(this);
    this.selectFile = this.selectFile.bind(this);
  }

  async addArtifact() {
    const url = this.state.file.uri;
    const split = url.split('/');
    const name = split.pop();
    const inbox = split.pop();
    const realPath = `${RNFS.TemporaryDirectoryPath}${inbox}/${name}`;

    const uploadResponse = RNFS.uploadFiles({
      fields: {
        name: this.state.name,
        description: this.state.description
      },
      files: [{
        name,
        filetype: this.state.file.type,
        filepath: realPath,
        filename: name
      }],
      method: 'POST',
      toUrl: `http://localhost:3000/artifacts/${this.props.navigation.state.params}`,
      headers: {
        Accepts: 'application/json'
      }
    });

    const result = await uploadResponse.promise;

    alert(JSON.stringify(result));
  }

  selectFile() {
    DocumentPicker.show({
      filetype: [DocumentPickerUtil.allFiles()]
    }, (err, response) => {
      if (err) {
        return alert(err);
      }

      return this.setState({
        file: {
          uri: response.uri,
          type: response.type
        }
      });
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
          <Button mode="contained"
            style={{ backgroundColor: 'rgb(220, 64, 69)', height: 45, justifyContent: 'center' }}
            onPress={ () => this.selectFile() }
            disabled={ loading }>
            Selecionar
          </Button>
        </View>
        <View>
          <Button mode="contained"
            loading={ loading }
            style={{ backgroundColor: 'rgb(220, 64, 69)', height: 45, justifyContent: 'center' }}
            onPress={ async () => await this.addArtifact() }
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

export default function AddArtifactScreenContainer(props) {
  return (
    <SnackbarContext.Consumer>
      {
        snackBarContext => (
          <OneContext.Consumer>
            {
              oneContext => <AddArtifactScreen snackbarContext={ snackBarContext } oneInstance={ oneContext } { ...props } />
            }
          </OneContext.Consumer>
        )
      }
    </SnackbarContext.Consumer>
  );
}

AddArtifactScreenContainer.navigationOptions = {
  title: 'Adicionar artefato'
};