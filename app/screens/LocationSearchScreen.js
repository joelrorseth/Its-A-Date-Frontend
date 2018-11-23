import React from 'react';
import { StyleSheet, FlatList, TouchableWithoutFeedback, Text, View  } from 'react-native';
import { SearchBar } from 'react-native-elements';
import IADTableView from '../components/IADTableView';
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
});

export default class LocationSearchScreen extends React.Component {

  constructor(props){
    super(props);
    this.state = { results: [], searchText: "", isLoading: true, timeout: null };
    this.searchBarOnChangeText = this.searchBarOnChangeText.bind(this);
    this.searchForPlace = this.searchForPlace.bind(this);
    this.onRowSelect = this.onRowSelect.bind(this);
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
  onRowSelect(selectedResult) {
    this.props.navigation.state.params.onFinish(selectedResult);
    this.props.navigation.goBack();
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
        <IADTableView data={this.state.results} titleKey="name" 
          subtitleKey="formatted_address" onRowSelect={this.onRowSelect}/>
      </View>
    );
  }
}
