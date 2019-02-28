import React from 'react';
import { List } from 'react-native-paper';

export default function ListItem({ title, description }) {
  return (
    <List.Item
      title={title}
      description={description}>
    </List.Item>
  );
}