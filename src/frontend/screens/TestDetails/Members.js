import React, { Component, Fragment } from 'react';
import { Avatar, List } from 'react-native-paper';
import stringToHexColor from 'string-to-hex-color';

import MembersList from '../../components/List';
import ListItem from '../../components/ListItem'

import FabButton from '../../components/FabButton';

import { getBridgeContext, ACTIONS } from '../../bridge-context';

const BridgeContext = getBridgeContext();

export default class TestList extends Component {
  state = {
    bannerVisible: true
  };

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
    const { bannerVisible } = this.state;

    return (
      <BridgeContext.Consumer>
        {
          ({ send }) => (
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
              <FabButton icon="person-add" onClick={ () => send(ACTIONS.ADD_MEMBER) }>
              </FabButton>
            </Fragment>
          )
        }
      </BridgeContext.Consumer>
    );
  }
}
