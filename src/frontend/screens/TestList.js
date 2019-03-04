import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';

import Theme from '../components/Theme';
import TestsList from '../components/List';
import ListItem from '../components/ListItem';

import { List } from 'react-native-paper';

import InstructionBanner from '../components/InstructionBanner';

import FabButton from '../components/FabButton';

import * as Tests from '../storage/tests';

import { getBridgeContext } from '../bridge-context';

const BridgeContext = getBridgeContext();

// Constants
const BANNER_KEY = 'banner-TestList';

export default class TestListScreen extends Component {
  static navigationOptions = {
    title: 'Testes'
  };

  state = {
    showBanner: false,
    bannerVisible: false,
    tests: []
  };

  constructor(props) {
    super(props);

    this.onListItemClick = this.onListItemClick.bind(this);
    this.onNewTestClick = this.onNewTestClick.bind(this);
    this.onBannerPress = this.onBannerPress.bind(this);
  }

  async componentWillMount() {
    const newState = {
      tests: await Tests.getTests()
    };
    const banner = await AsyncStorage.getItem(BANNER_KEY);

    if (!banner) {
      newState.showBanner = true;
      newState.bannerVisible = true;
    }

    return this.setState(newState);
  }

  onBannerPress() {
    return this.setState({
      bannerVisible: false
    }, () => {
      AsyncStorage.setItem(BANNER_KEY, 'true');
    });
  }

  onListItemClick(item) {
    this.props.navigation.navigate('Details', item);

    return;
  }

  onNewTestClick() {
    this.props.navigation.navigate('NewTest');

    return;
  }

  render() {
    const { tests, bannerVisible, showBanner } = this.state;

    return (
      <BridgeContext.Consumer>
        {
          ({}) => (
            <Theme>
              {
                showBanner && (
                  <InstructionBanner visible={ bannerVisible }
                    onPress={ this.onBannerPress }>
                    Esta é sua tela inicial. Ela lista todos os testes no qual você está envolvido.
                  </InstructionBanner>
                )
              }

              <TestsList>
                {
                  tests.map(item => (
                    <ListItem key={ item.hash }
                      title={ item.name }
                      description={ item.description }
                      onClick={ () => this.onListItemClick(item) }
                      right={ props => <List.Icon {...props} icon="star-border" /> }></ListItem>
                  ))
                }
              </TestsList>
              <FabButton icon="add" onClick={ () => this.onNewTestClick() }>
              </FabButton>
            </Theme>
          )
        }
      </BridgeContext.Consumer>
    );
  }
}
