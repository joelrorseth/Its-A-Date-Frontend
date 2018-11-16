import React from 'react';
import { createStackNavigator } from 'react-navigation';
import HomeScreen from './app/screens/HomeScreen';
import FindDateScreen from './app/screens/FindDateScreen';
import ReviewDateScreen from './app/screens/ReviewDateScreen';

const RootStack = createStackNavigator(
  {
    Home: {
      screen: HomeScreen
    },
    FindDate: {
      screen: FindDateScreen
    },
    ReviewDate: {
      screen: ReviewDateScreen
    },
  },
  {
    initialRouteName: "Home",
  }
);

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
};