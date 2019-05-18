import React from 'react';
import { FlatList } from 'react-native';

export default function List({ data, keyExtractor, renderItem }) {
  return (
    <FlatList style={{ backgroundColor: 'white' }}
      data={ data }
      keyExtractor={ keyExtractor }
      renderItem={ renderItem } />
  );
}