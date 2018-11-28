import React from 'react';
import { Button, StyleSheet, Text, TextInput, View  } from 'react-native';
import { SearchBar, Rating } from 'react-native-elements';
import IADTableView from '../components/IADTableView';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
import IADLargeButton from '../components/IADLargeButton';

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
  formContainer: {
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
    borderRadius: 6,
  },
  formEntryTitleContainer: {
    flexDirection: 'row',
    marginTop: 2,
    marginBottom: 2,
  },
  formEntryTitle: {
    fontWeight: '600',
    width: '85%',
    padding: 6,
  },
  formEntryRightIcon: {
    width: '15%',
    textAlign: 'center',
    alignSelf: 'center'
  },
  formEntryText: {
    color: 'grey',
    fontSize: 14,
    paddingLeft: 6,
  },
  formEntryInput: {
    color: 'grey',
    marginTop: 4,
    marginBottom: 4,
    padding: 10,
    borderRadius: 8,
    borderColor: 'grey',
    borderWidth: 0.2,
  },
  rating: {
    alignSelf: 'flex-start',
    paddingLeft: 5,
    paddingBottom: 6,
  },
  buttonEnabled: {
    width: "100%",
    backgroundColor: 'green',
    borderRadius: 8,
    margin: 2,
    justifyContent: 'center',
  },
  buttonDisabled: {
    width: "100%",
    backgroundColor: 'grey',
    borderRadius: 8,
    margin: 2,
    justifyContent: 'center',
  },
});

export default class LocationSearchScreen extends React.Component {

  static navigationOptions = { title: 'Tag a Location' };

  constructor(props){
    super(props);
    this.state = { locationComment: null, locationRating: null, results: [], selectedResult: null, searchText: "", 
      isLoading: true, timeout: null, showSearch: true, showForm: false };
    this.toggleSearchAndEditMode = this.toggleSearchAndEditMode.bind(this);
    this.searchBarOnChangeText = this.searchBarOnChangeText.bind(this);
    this.searchForPlace = this.searchForPlace.bind(this);
    this.onRowSelect = this.onRowSelect.bind(this);
    this.onFinish = this.onFinish.bind(this);
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  // Toggle the search area and the form area visibility, only one should be visible
  toggleSearchAndEditMode() {
    this.setState({ showForm: !this.state.showForm, showSearch: !this.state.showSearch });
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
      //console.log(response.data.candidates);
      this.setState({ results: response.data.candidates });
    });
  }

  // Handler for row selection
  onRowSelect(selectedResult) {
    this.setState({ results: [], selectedResult: selectedResult });
    this.toggleSearchAndEditMode();
  }

  // Handler for pressing the Add to Date Review button
  onFinish() {
    this.props.navigation.state.params.onFinish({
      locationInfo: this.state.selectedResult,
      locationUserRating: this.state.locationRating,
      locationUserComment: this.state.locationComment,
    });
    this.props.navigation.goBack();
  }

  // Component render implementation.
  render() {
    return (
      <View style={styles.container}>

        {this.state.showSearch &&
          <View>
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
        }

        {this.state.showForm &&
          <View style={styles.formContainer}>
            <View style={styles.formEntryContainer}>
              <View style={styles.formEntryTitleContainer}>
                <Text style={styles.formEntryTitle}>{this.state.selectedResult["name"]}</Text>
                <Icon style={styles.formEntryRightIcon} name='edit' 
                  onPress={this.toggleSearchAndEditMode}/>
              </View>
              <Text style={styles.formEntryText}>{this.state.selectedResult["formatted_address"]}</Text>
            </View>

            <View style={styles.formEntryContainer}>
              <View style={styles.formEntryTitleContainer}>
                <Text style={styles.formEntryTitle}>Rate this location</Text>
              </View>
              <Rating
                type="star"
                fractions={0}
                startingValue={0}
                imageSize={30}
                onFinishRating={(newRating) => this.setState({ locationRating: newRating }) }
                style={styles.rating}
            />
            </View>

            <View style={styles.formEntryContainer}>
              <View style={styles.formEntryTitleContainer}>
                <Text style={styles.formEntryTitle}>Leave a comment</Text>
              </View>
              <TextInput
                style={styles.formEntryInput}
                multiline={true}
                numberOfLines={4}
                onChangeText={(text) => this.setState({ locationComment: text })}
                placeholder="Describe this location..."
                value={this.state.locationComment}
              />
            </View>

            <View style={
              (this.state.locationComment && this.state.locationComment.length > 5
                && this.state.locationRating && this.state.locationRating > 0
                && this.state.selectedResult)
              ? styles.buttonEnabled : styles.buttonDisabled  
            }>
              <IADLargeButton title="Add to Date Review" color="white"
                disabled={!(this.state.locationComment && this.state.locationComment.length > 5
                  && this.state.locationRating && this.state.locationRating > 0
                  && this.state.selectedResult)}
                onPress={() => this.onFinish()}/>
            </View>
          </View>
        }

      </View>
    );
  }
}
