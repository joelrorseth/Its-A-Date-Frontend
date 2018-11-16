import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
    padding: 14,
  },
});

export default class ReviewDateScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
      </View>
    );
  }
}