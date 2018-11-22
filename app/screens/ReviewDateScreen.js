import React from 'react';
import { StyleSheet, FlatList, TouchableWithoutFeedback, Text, View  } from 'react-native';
import { SearchBar } from 'react-native-elements';
import axios from 'axios';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#c0dae8',
  },
  searchBarContainer: {
    backgroundColor: 'white',
    width: '100%',
  },
  searchBarInputContainer: {
    backgroundColor: '#c0dae8',
  },
  rowContainer: {
    flex: 1,
    backgroundColor: 'white',
    padding: 14,
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

export default class ReviewDateScreen extends React.Component {

  constructor(props){
    super(props);
    this.state = { results: [], searchText: "", isLoading: true, timeout: null };
    this.searchBarOnChangeText = this.searchBarOnChangeText.bind(this);
    this.searchForPlace = this.searchForPlace.bind(this);
    this.rowOnSelect = this.rowOnSelect.bind(this);
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }


  // Handler method for text change events on the search bar
  searchBarOnChangeText(text) {
    this.setState({ searchText: text });

    // Reset 300ms timer for running searchForPlace back to 0 (rate limit)
    clearTimeout(this.state.timeout);
    this.setState({ timeout: setTimeout(() => this.searchForPlace(text), 300) });
  }

  // Handler method for text cleared events on the search bar
  searchBarOnClear() {
    this.setState({ searchText: "", results: [] });
    clearTimeout(this.state.timeout);
  }

  // Initiate API call to search Google Places API for text
  searchForPlace(text) {
    axios.get('https://maps.googleapis.com/maps/api/place/findplacefromtext/json', {
      headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
      params: {
        key: 'AIzaSyALMjinQuXMZRQv8DVSDH3Q2CwRr6OameQ',
        input: text,
        inputtype: 'textquery',
        fields: 'formatted_address,name,place_id,rating'
      }
    }).then(response => {
      // Update the FlatList to show results
      console.log(response.data.candidates);
      this.setState({ results: response.data.candidates });
    });
  }

  // Handler for row selection
  rowOnSelect(selectedResult) {
    this.setState({ results: [] });
  }

  // Component render implementation.
  render() {
    return (
      <View style={styles.container}>
        <SearchBar
          lightTheme
          containerStyle={styles.searchBarContainer}
          inputContainerStyle={styles.searchBarInputContainer}
          onChangeText={this.searchBarOnChangeText}
          onClear={this.searchBarDidChangeText}
          placeholder='Search for a location...' />
        <FlatList
          data={this.state.results}
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
    );
  }
}
