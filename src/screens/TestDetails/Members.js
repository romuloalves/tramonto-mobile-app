import React, { Component, Fragment } from 'react';
import { Avatar, List } from 'react-native-paper';
import stringToHexColor from 'string-to-hex-color';

import MembersList from '../../components/List';
import ListItem from '../../components/ListItem'

import FabButton from '../../components/FabButton';

export default class Members extends Component {
  constructor(props) {
    super(props);

    this.onListItemClick = this.onListItemClick.bind(this);
  }

  onListItemClick(item) {
    this.props.navigation.navigate('Details', item);

    return;
  }

  render() {
    const items = this.props.items;

    return (
      <Fragment>
        <MembersList>
          {
            items.map((item, key) => {
              const [backgroundColor, color] = stringToHexColor(item.description);

              return (
                <ListItem key={ key }
                  title={ item.name }
                  description={ item.description }
                  onClick={ () => this.onListItemClick(item) }
                  right={ props => <List.Icon {...props} icon="email" /> }
                  left={ props => <Avatar.Text {...props}
                    label={ item.name[0] }
                    size={ 40 }
                    color={ color }
                    style={{ alignSelf: 'center', backgroundColor }} /> }></ListItem>
              );
            })
          }
        </MembersList>
        {
          this.props.isOwner && <FabButton icon="person-add" onClick={ () => send() } />
        }
      </Fragment>
    );
  }
}
