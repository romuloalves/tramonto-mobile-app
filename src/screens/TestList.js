import React, { Component, Fragment } from 'react';

import TestsList from '../components/List';
import ListItem from '../components/ListItem';

import { OneContext } from '../contexts/one-context';

let FABGroup = null;

class TestListScreen extends Component {
  state = {
    isFabLoaded: false,
    isFabOpen: false,
    tests: []
  };

  constructor(props) {
    super(props);

    this.toggleFab = this.toggleFab.bind(this);
    this.onListItemClick = this.onListItemClick.bind(this);
    this.onNewTestClick = this.onNewTestClick.bind(this);
    this.onImportTestClick = this.onImportTestClick.bind(this);
  }

  async componentDidMount() {
    const { navigation } = this.props;

    navigation.addListener('willFocus', () => this.loadTests());

    this.loadTests();

    if (FABGroup === null) {
      FABGroup = require('react-native-paper').FAB.Group;
    }

    this.setState(() => ({
      isFabLoaded: true
    }));
  }

  loadTests() {
    this.props.oneInstance.getTests((err, data) => {
      if (err) {
        return;
      }

      this.setState(() => ({
        tests: data
      }));
    });
  }

  toggleFab() {
    requestAnimationFrame(() => {
      return this.setState(({ isFabOpen }) => ({
        isFabOpen: !isFabOpen
      }));
    });
  }

  onListItemClick(item) {
    requestAnimationFrame(() => {
      this.props.navigation.navigate('Details', item);
    });
  }

  onNewTestClick() {
    requestAnimationFrame(() => {
      this.props.navigation.navigate('NewTest');
    });
  }

  onImportTestClick() {
    requestAnimationFrame(() => {
      this.props.navigation.navigate('ImportTest');
    });
  }

  render() {
    const { tests, isFabOpen, isFabLoaded } = this.state;

    return (
      <Fragment>
        <TestsList data={ tests }
          keyExtractor={ item => item.ipfs }
          renderItem={ ({ item }) => (
            <ListItem title={ item.metadata.name }
              description={ item.metadata.description }
              onClick={ () => this.onListItemClick(item) }></ListItem>
          ) } />

        {
          isFabLoaded && (
            <FABGroup
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
              onStateChange={ this.toggleFab } />
          )
        }
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
