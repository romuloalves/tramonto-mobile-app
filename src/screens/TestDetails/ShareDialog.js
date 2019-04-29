import React, { Fragment } from 'react';
import { Clipboard, StyleSheet } from 'react-native';
import { Button, Dialog, Title, Text } from 'react-native-paper';

import { SnackbarContext } from '../../contexts/snackbar-context';

function ShareDialog({ name, ipns, secret, ipfs, onClose, snackbarContext }) {
  function copyToClipboard(value) {
    snackbarContext.setSnackBarText('Copiado!');
    snackbarContext.toggleSnackBar(true);

    return Clipboard.setString(value);
  }

  return (
    <Fragment>
      <Dialog.Title>{ name }</Dialog.Title>
      <Dialog.Content>
        <Title>Hash IPNS</Title>
        <Text>{ ipns }</Text>
        <Button style={ styles.button }
          icon="content-copy"
          onPress={ () => copyToClipboard(ipns) }>Copiar</Button>
        <Title>Hash IPFS</Title>
        <Text>{ ipfs }</Text>
        <Button style={ styles.button }
          icon="content-copy"
          onPress={ () => copyToClipboard(ipfs) }>Copiar</Button>
        <Title>Chave</Title>
        <Text>{ secret }</Text>
        <Button style={ styles.button }
          icon="content-copy"
          onPress={ () => copyToClipboard(secret) }>Copiar</Button>
      </Dialog.Content>
      <Dialog.Actions>
        <Button onPress={ () => onClose() }>Fechar</Button>
      </Dialog.Actions>
    </Fragment>
  );
}

export default function ShareDialogContainer(props) {
  return (
    <SnackbarContext.Consumer>
      {
        context => <ShareDialog { ...props } snackbarContext={ context } />
      }
    </SnackbarContext.Consumer>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 15
  }
})