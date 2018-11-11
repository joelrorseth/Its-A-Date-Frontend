import React from 'react';
import { createStackNavigator } from 'react-navigation';
import HomeScreen from './app/screens/Home'

const RootStack = createStackNavigator({
  Home: {
    screen: HomeScreen
  }
});

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
};