import React, { PureComponent, Fragment } from 'react';
import { Avatar, List } from 'react-native-paper';
import stringToHexColor from 'string-to-hex-color';

import MembersList from '../../components/List';
import ListItem from '../../components/ListItem'

let FabButton = null;

export default class Members extends PureComponent {
  state = {
    isFabLoaded: false
  };

  constructor(props) {
    super(props);

    this.onListItemClick = this.onListItemClick.bind(this);
  }

  componentDidMount() {
    if (!this.props.isOwner || !this.props.onAddMemberClick) {
      return;
    }

    if (FabButton === null) {
      FabButton = require('../../components/FabButton').default;
    }

    this.setState(() => ({
      isFabLoaded: true
    }));
  }

  onListItemClick(item) {
    this.props.navigation.navigate('Details', item);

    return;
  }

  render() {
    return (
      <Fragment>
        <MembersList data={ this.props.items }
          keyExtractor={ item => `${item.name}_${item.role}` }
          renderItem={ ({ item }) => {
            const [backgroundColor, color] = stringToHexColor(item.description);

            return (
              <ListItem title={ item.name }
                description={ item.description }
                onClick={ () => this.onListItemClick(item) }
                right={ props => <List.Icon {...props} icon="email" /> }
                left={ props => <Avatar.Text {...props}
                label={ item.name[0] }
                size={ 40 }
                color={ color }
                style={{ alignSelf: 'center', backgroundColor }} /> }></ListItem>
            );
          } } />
        {
          this.state.isFabLoaded && <FabButton icon="person-add" onClick={ () => this.props.onAddMemberClick() } />
        }
      </Fragment>
    );
  }
}
