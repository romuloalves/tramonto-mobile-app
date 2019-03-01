import React, { Component } from 'react';
import { Avatar, List } from 'react-native-paper';
import stringToHexColor from 'string-to-hex-color';

import Theme from '../../components/Theme';
import MembersList from '../../components/List';
import ListItem from '../../components/ListItem'

import InstructionBanner from '../../components/InstructionBanner';

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
    this.onBannerPress = this.onBannerPress.bind(this);
  }

  onBannerPress() {
    return this.setState({
      bannerVisible: false
    });
  }

  onListItemClick(item) {
    this.props.navigation.navigate('Details', item);

    return;
  }

  render() {
    const items = [
      {
        title: 'Tim Haggins',
        description: 'membro_um@domain.tld'
      },
      {
        title: 'Rodolfo Joslin',
        description: 'membro_dois@domain.tld'
      },
      {
        title: 'Sima Pugsley',
        description: 'membro_tres@domain.tld'
      },
    ];

    const { bannerVisible } = this.state;

    return (
      <BridgeContext.Consumer>
        {
          ({ send }) => (
            <Theme>
              <InstructionBanner visible={ bannerVisible }
                onPress={ this.onBannerPress }>
                Esta tela lista todos os artefatos adicionados ao teste.
              </InstructionBanner>
              <MembersList>
                {
                  items.map((item, key) => {
                    const [backgroundColor, color] = stringToHexColor(item.description);

                    return (
                      <ListItem key={ key }
                        title={ item.title }
                        description={ item.description }
                        onClick={ () => this.onListItemClick(item) }
                        right={ props => <List.Icon {...props} icon="email" /> }
                        left={ props => <Avatar.Text {...props}
                          label={ item.title[0] }
                          size={ 40 }
                          color={ color }
                          style={{ alignSelf: 'center', backgroundColor }} /> }></ListItem>
                    );
                  })
                }
              </MembersList>
              <FabButton icon="person-add" onClick={ () => send(ACTIONS.ADD_MEMBER) }>
              </FabButton>
            </Theme>
          )
        }
      </BridgeContext.Consumer>
    );
  }
}
