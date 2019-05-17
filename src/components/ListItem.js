import React from 'react';
import { List } from 'react-native-paper';

export default function ListItem({ title, description, onClick, left, right }) {
  return (
    <List.Item
      title={ title }
      description={ description }
      onPress={ () => onClick() }
      left={ left }
      right={ right }>
    </List.Item>
  );
}