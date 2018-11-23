import React from 'react';
import { StyleSheet, FlatList, TouchableWithoutFeedback, Text, TextInput, View  } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#c0dae8',
    padding: 12,
  },
  formEntryContainer: {
    display: 'flex',
    backgroundColor: 'white',
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
  formEntryTitleContainer: {
    flexDirection: 'row',
    marginTop: 2,
    marginBottom: 2,
  },
  formEntryTitle: {
    width: '85%',
    padding: 6,
  },
  formEntryRightIcon: {
    width: '15%',
    textAlign: 'center',
    alignSelf: 'center'
  },
  formEntryInput: {
    marginTop: 4,
    marginBottom: 4,
    padding: 10,
    height: 40,
    borderRadius: 8,
    borderColor: 'grey',
    borderWidth: 1,
  },
});

export default class ReviewDateScreen extends React.Component {

  constructor(props){
    super(props);
    this.state = { dateTitle: "", taggedLocations: [] };
    this.onPressAddLocation = this.onPressAddLocation.bind(this);
    this.onFinishAddLocation = this.onFinishAddLocation.bind(this);
  }

  onPressAddLocation() {
    console.log("PRESSED");
    //this.props.navigation.navigate('LocationSearch');
    this.props.navigation.push('LocationSearch', 
      {
        onFinish: this.onFinishAddLocation,
        onCancel: () => console.log("Add location cancelled"),
      },
    );
  }

  onFinishAddLocation(location) {
    console.log("Updated!");
    this.setState(prevState => ({
      taggedLocations: [...prevState.taggedLocations, location]
    }))
  }

  // Component render implementation.
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.formEntryContainer}>
          <View style={styles.formEntryTitleContainer}>
            <Text style={styles.formEntryTitle}>Name</Text>
          </View>
          <TextInput
            style={styles.formEntryInput}
            multiline={false}
            numberOfLines={1}
            onChangeText={(text) => this.setState({ dateTitle: text })}
            placeholder="Name your date..."
            value={this.state.dateTitle}
          />
        </View>
        <View style={styles.formEntryContainer}>
          <View style={styles.formEntryTitleContainer}>
            <Text style={styles.formEntryTitle}>Tagged Locations</Text>
              <Icon style={styles.formEntryRightIcon} name='plus' onPress={this.onPressAddLocation}/>
          </View>
          <FlatList
            data={this.state.taggedLocations}
            renderItem={({item}) => 
              <TouchableWithoutFeedback onPress={(_) => this.rowOnSelect(item)}>
                <View style={styles.rowContainer}>
                  <Text style={styles.rowTitle}>{item.name}</Text>
                  <Text style={styles.rowSubtitle}>{item.formatted_address}</Text>
                </View>
              </TouchableWithoutFeedback>
            }
            keyExtractor={(item, _) => item.place_id}
            keyboardShouldPersistTaps='always'
          />
        </View>
      </View>
    );
  }
}
