import * as React from 'react';
import { Appbar } from 'react-native-paper';

export default function NavBar({ title, onBack }) {
  const goBack = () => console.log('Went back');
  const onSearch = () => console.log('Searching');
  const onMore = () => console.log('Shown more');

  return (
    <Appbar.Header>
      {
        onBack && (
          <Appbar.BackAction
            onPress={onBack}
          />
        )
      }
      {
        !onBack && (
          <Appbar.Action icon="menu"
            onPress={() => console.log('Pressed archive')} />
        )
      }
      <Appbar.Content
        title={title}
        style={{ alignItems: 'flex-start' }}
      />
    </Appbar.Header>
  );
}