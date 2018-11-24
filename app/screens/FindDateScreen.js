import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue',
    padding: 14,
  },
});

export default class FindDateScreen extends React.Component {

  static navigationOptions = { title: 'Find a Date' };

  render() {
    return (
      <View style={styles.container}>
      </View>
    );
  }
}