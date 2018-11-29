import React from 'react';
import { createStackNavigator } from 'react-navigation';
import HomeScreen from './app/views/screens/HomeScreen';
import FindDateScreen from './app/views/screens/FindDateScreen';
import ReviewDateScreen from './app/views/screens/ReviewDateScreen';
import LocationSearchScreen from './app/views/screens/LocationSearchScreen';
import AuthScreen from './app/views/screens/AuthScreen';
import DeleteAccountScreen from './app/views/screens/DeleteAccountScreen';

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
    DeleteAccount: {
      screen: DeleteAccountScreen
    }
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