import React from 'react';
import { FlatList, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  rowContainer: {
    flex: 1,
    backgroundColor: 'white',
    padding: 14,
    marginTop: 0.2,
    marginBottom: 0.2,
    borderBottomWidth: 0.2,
    borderColor: 'grey',
  },
  rowTitle: {
    fontWeight: '300',
    fontSize: 16,
  },
  rowSubtitle: {
    color: 'grey',
    fontSize: 12,
  },
});

// Generic Table View component, with props to handle selection and
// specify keys mapping data source to title and subtitle of each row.

export default class IADTableView extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.props.data}
          renderItem={({item}) => 
            <TouchableWithoutFeedback onPress={(_) => this.props.onRowSelect(item)}>
              <View>
              {this.props.objectKey &&
                <View style={styles.rowContainer}>
                  <Text style={styles.rowTitle}>{
                    item[this.props.objectKey][this.props.titleKey]}</Text>
                  <Text style={styles.rowSubtitle}>
                    {item[this.props.objectKey][this.props.subtitleKey]}</Text>
                </View>
              }
              {(!this.props.objectKey) &&
                <View style={styles.rowContainer}>
                  <Text style={styles.rowTitle}>{item[this.props.titleKey]}</Text>
                  <Text style={styles.rowSubtitle}>{item[this.props.subtitleKey]}</Text>
                </View>
              }
              </View>
            </TouchableWithoutFeedback>
          }
          keyExtractor={(item, index) => item+index}
          keyboardShouldPersistTaps='always'
        />
      </View>
    );
  }
}