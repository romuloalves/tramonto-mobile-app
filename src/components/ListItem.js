import React, { PureComponent } from 'react';
import { List } from 'react-native-paper';

export default class ListItem extends PureComponent {
  render() {
    const { title, description, onClick, left, right } = this.props;

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
}
