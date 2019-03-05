import React, { Fragment } from 'react';
import { Clipboard, StyleSheet } from 'react-native';
import { Button, Dialog, Title, Text } from 'react-native-paper';

export default function ShareDialog({ name, hash, secret, onClose }) {
  function copyToClipboard(value) {
    return Clipboard.setString(value);
  }

  return (
    <Fragment>
      <Dialog.Title>{ name }</Dialog.Title>
      <Dialog.Content>
        <Title>Hash</Title>
        <Text>{ hash }</Text>
        <Button style={ styles.button }
          icon="content-copy"
          onPress={ () => copyToClipboard(hash) }>Copiar</Button>
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

const styles = StyleSheet.create({
  button: {
    marginTop: 15
  }
})