import React from 'react';
import { StyleSheet, Text, TextInput, View  } from 'react-native';
import IADTableView from '../components/IADTableView';
import Icon from 'react-native-vector-icons/FontAwesome';
import IADLargeButton from '../components/IADLargeButton';
import axios from 'axios';

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
  formEntryInput: {
    color: 'grey',
    marginTop: 4,
    marginBottom: 4,
    padding: 10,
    borderRadius: 8,
    borderColor: 'grey',
    borderWidth: 0.2,
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

export default class ReviewDateScreen extends React.Component {

  static navigationOptions = { title: 'Review a Date' };

  constructor(props){
    super(props);
    this.state = { dateTitle: null, dateComment: null, dateLocations: [], readyToSubmit: false };
    this.onPressAddLocation = this.onPressAddLocation.bind(this);
    this.onFinishAddLocation = this.onFinishAddLocation.bind(this);
    this.onFinishReview = this.onFinishReview.bind(this);
    this.saveDateInfoToServer = this.saveDateInfoToServer.bind(this);
  }

  // Event handler for pressing the + button to tag a new location
  onPressAddLocation() {
    this.props.navigation.push('LocationSearch', 
      {
        onFinish: this.onFinishAddLocation,
        onCancel: () => console.log("Add location cancelled"),
      },
    );
  }

  // Event handler for the LocationSearchScreen finishing and returning new location
  onFinishAddLocation(location) {
    this.setState(prevState => ({
      dateLocations: [...prevState.dateLocations, location]
    }))
  }

  // Event handler for the Finish Review button being clicked
  onFinishReview() {
    const oldThis = this;

    // Create the Date object, and if response is OK, proceed to 
    // create and link DLEs and Locations

    axios.post('http://localhost:3000/dates', {
      nameDate: this.state.dateTitle,
      comments: this.state.dateComment,
      city: "Windsor",                  // TODO
      _id: "5bfb3a33fd9fb1b72e31237b"  // TODO
    }).then(response => {
      console.log(response);
      if (response.status == 200 || response.status == 201)
        oldThis.saveDateInfoToServer(response.data.createdDate);
    }).catch(error => {
      console.log(error);
    });
  }


  // Handle creation of Location and DLE objects, linking to newly created Date
  saveDateInfoToServer(newDateObj) {
    var newDateID = newDateObj._id;
    var createLocationsPromises = [];
    var newLocations = [];
    
    // Collect all POST requests into an array of promises (executables)
    this.state.dateLocations.forEach(locationObj => {
      createLocationsPromises.push(
        axios.post('http://localhost:3000/location', {
          place_id: locationObj.locationInfo.place_id,
          nameLocation: locationObj.locationInfo.name,
          address: locationObj.locationInfo.formatted_address,
          rating: locationObj.locationInfo.rating,
        })
      );
    });

    // Execute all promises synchronously
    axios.all(createLocationsPromises)
      .then(results => {
        results.forEach(response => {
          console.log(response);
          newLocations.push(response.data.location);
          if (response.status != 201 && response.status != 200)
            return;
        })
      }).catch(_ => {error => {
        console.log(error);
        return;
      }}
    ).then(() => {

      var createDLEPromises = [];

      // Create DateLineEntry objects,
      newLocations.forEach((locationServerObj, i) => {
        createDLEPromises.push(
          axios.post('http://localhost:3000/dateLineEntry', {
            date: newDateID,                      // a date id.
            location: locationServerObj._id,      // a location id. 
            name: locationServerObj.nameLocation,
            rating: this.state.dateLocations.locationUserRating,
            comments: this.state.dateLocations.locationUserComment,
          })
        );
      });

      // Execute the promises to create the DLE's
      axios.all(createDLEPromises)
        .then(results => {
          results.forEach(response => {
            console.log(response);
            if (response.status != 201 && response.status != 200)
              return;
          })
        }).catch(_ => {error => {
          console.log(error);
          return;
        }}
      ).then(() => {
        alert("Thank you for submitting your review!");
        this.props.navigation.goBack();
      });

    });
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
          <IADTableView data={this.state.dateLocations} objectKey="locationInfo"
            titleKey="name" subtitleKey="formatted_address"/>
        </View>
        <View style={styles.formEntryContainer}>
          <View style={styles.formEntryTitleContainer}>
            <Text style={styles.formEntryTitle}>Comment</Text>
          </View>
          <TextInput
            style={styles.formEntryInput}
            multiline={true}
            numberOfLines={4}
            onChangeText={(text) => this.setState({ dateComment: text })}
            placeholder="Describe your date..."
            value={this.state.dateComment}
          />
        </View>
        <View style={
          (this.state.dateComment && (this.state.dateComment.length > 3)
            && this.state.dateTitle && (this.state.dateTitle.length > 3)
            && this.state.dateLocations.length > 0) 
          ? styles.buttonEnabled : styles.buttonDisabled
        }
        >
          <IADLargeButton title="Finish Review" color="white" 
            disabled={!(this.state.dateComment && (this.state.dateComment.length > 3)
              && this.state.dateTitle && (this.state.dateTitle.length > 3)
              && this.state.dateLocations.length > 0)}
            onPress={() => this.onFinishReview()}/>
        </View>
      </View>
    );
  }
}
