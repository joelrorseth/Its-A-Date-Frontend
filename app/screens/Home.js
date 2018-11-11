import React from 'react';
import { View, Text, Button } from 'react-native';

export default class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>It's a Date!</Text>
        <Button title="Find a Date"/>
        <Button title="Review a Date"/>
      </View>
    );
  }
}