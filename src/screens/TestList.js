import React, { Component, Fragment } from 'react';

import TestsList from '../components/List';
import ListItem from '../components/ListItem';

import { List, FAB } from 'react-native-paper';

import { OneContext } from '../contexts/one-context';

class TestListScreen extends Component {
  state = {
    isFabOpen: false,
    tests: []
  };

  constructor(props) {
    super(props);

    this.onListItemClick = this.onListItemClick.bind(this);
    this.onNewTestClick = this.onNewTestClick.bind(this);
    this.onImportTestClick = this.onImportTestClick.bind(this);
  }

  async componentWillMount() {
    const { navigation } = this.props;

    navigation.addListener('willFocus', () => this.loadTests());

    await this.loadTests();
  }

  async loadTests() {
    return this.setState({
      tests: await this.props.oneInstance.getTests()
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

  onImportTestClick() {
    this.props.navigation.navigate('ImportTest');

    return;
  }

  render() {
    const { tests, isFabOpen } = this.state;

    return (
      <Fragment>
        <TestsList>
          {
            tests.map((item, key) => {
              return (
                <ListItem key={ `${item.ipfs}+${key}` }
                  title={ item.metadata.name }
                  description={ item.metadata.description }
                  onClick={ () => this.onListItemClick(item) }
                  right={ props => <List.Icon {...props} icon="star-border" /> }></ListItem>
              );
            })
          }
        </TestsList>
        <FAB.Group
          open={ isFabOpen }
          icon={ isFabOpen ? 'close' : 'add' }
          actions={[
            {
              icon: 'add',
              label: 'Novo teste',
              onPress: () => this.onNewTestClick()
            },
            {
              icon: 'cloud-download',
              label: 'Importar teste',
              onPress: () => this.onImportTestClick()
            }
          ]}
          onStateChange={ ({ open }) => this.setState({ isFabOpen: open }) } />
      </Fragment>
    );
  }
}

export default function TestListScreenContainer(props) {
  return (
    <OneContext.Consumer>
      {
        context => <TestListScreen { ...props } oneInstance={ context } />
      }
    </OneContext.Consumer>
  );
}

TestListScreenContainer.navigationOptions = {
  title: 'Testes'
};
