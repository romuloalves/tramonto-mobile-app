import React, { Component, Fragment } from 'react';
import One from 'tramonto-one-sdk';

import TestsList from '../components/List';
import ListItem from '../components/ListItem';

import { List, FAB } from 'react-native-paper';

export default class TestListScreen extends Component {
  static navigationOptions = {
    title: 'Testes'
  };

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
    return this.setState({
      tests: await Tests.getTests()
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
            tests.map((item, key) => (
              <ListItem key={ `${item.hash}+${key}` }
                title={ item.name }
                description={ item.description }
                onClick={ () => this.onListItemClick(item) }
                right={ props => <List.Icon {...props} icon="star-border" /> }></ListItem>
            ))
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
