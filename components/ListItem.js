import React from 'react';
import { List } from 'react-native-paper';

export default function ListItem({ title, description, onClick }) {
  return (
    <List.Item
      title={title}
      description={description}
      onPress={ () => onClick() }>
    </List.Item>
  );
}