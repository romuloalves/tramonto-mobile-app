import React from 'react';
import { ScrollView } from 'react-native';

export default function List({ children }) {
  return (
    <ScrollView style={{ backgroundColor: 'white' }}>
      { children }
    </ScrollView>
  );
}