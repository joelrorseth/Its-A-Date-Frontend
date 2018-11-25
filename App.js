import React from 'react';
import { createStackNavigator } from 'react-navigation';
import HomeScreen from './app/screens/HomeScreen';
import FindDateScreen from './app/screens/FindDateScreen';
import ReviewDateScreen from './app/screens/ReviewDateScreen';
import LocationSearchScreen from './app/screens/LocationSearchScreen';
import AuthScreen from './app/screens/AuthScreen';

const RootStack = createStackNavigator(
  {
    Auth: {
      screen: AuthScreen
    },
    Home: {
      screen: HomeScreen
    },
    FindDate: {
      screen: FindDateScreen
    },
    ReviewDate: {
      screen: ReviewDateScreen
    },
    LocationSearch: {
      screen: LocationSearchScreen
    },
  },
  {
    initialRouteName: "Auth",
  }
);

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
};