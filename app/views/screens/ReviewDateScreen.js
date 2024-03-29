import React from 'react';
import { StyleSheet, Text, TextInput, View  } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import IADTableView from '../components/IADTableView';
import Icon from 'react-native-vector-icons/FontAwesome';
import IADLargeButton from '../components/IADLargeButton';
import PersistenceManager from '../../controllers/PersistenceManager';
import UserManager from '../../controllers/UserManager';
import Date from '../../models/Date';

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
    this.state = { dateCity: null, dateComment: null, dateTitle: null, dateLineEntries: [], readyToSubmit: false };
    this.onPressAddLocation = this.onPressAddLocation.bind(this);
    this.onFinishAddLocation = this.onFinishAddLocation.bind(this);
    this.onFinishReview = this.onFinishReview.bind(this);
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

  // Event handler for the LocationSearchScreen finishing and returning new DLE
  onFinishAddLocation(newEntry) {
    this.setState(prevState => ({
      dateLineEntries: [...prevState.dateLineEntries, newEntry]
    }))
  }

  // Event handler for the Finish Review button being clicked
  onFinishReview() {

    // Ask PersistenceManager to save the Date review, await response
    PersistenceManager.getInstance().saveDate(
      new Date(
        this.state.dateTitle,
        this.state.dateComment,
        this.state.dateCity,
        this.state.dateLineEntries,
        UserManager.getInstance().getUserID()
      )
    ).then(() => {
      alert("Thank you for submitting your review!");
      this.props.navigation.goBack();
    }).catch(error => {
      console.log(error);
      alert("An error occurred while submitting your date. Please try again.")
    });
  }

  // Component render implementation.
  render() {
    return (
      <KeyboardAwareScrollView
      style={{ backgroundColor: '#c0dae8' }}
      resetScrollToCoords={{ x: 0, y: 0 }}
      contentContainerStyle={styles.container}
      scrollEnabled={true}>
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
            <Text style={styles.formEntryTitle}>City</Text>
          </View>
          <TextInput
            style={styles.formEntryInput}
            multiline={false}
            numberOfLines={1}
            onChangeText={(text) => this.setState({ dateCity: text })}
            placeholder="Which city were you in?"
            value={this.state.dateCity}
          />
        </View>

        <View style={styles.formEntryContainer}>
          <View style={styles.formEntryTitleContainer}>
            <Text style={styles.formEntryTitle}>Tagged Locations</Text>
            <Icon style={styles.formEntryRightIcon} name='plus' size={14} 
              onPress={this.onPressAddLocation}/>
          </View>
          <IADTableView data={this.state.dateLineEntries} objectKey="location"
            titleKey="name" subtitleKey="formatted_address" onRowSelect={_ => {}}/>
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
            && this.state.dateCity && (this.state.dateCity.length > 3)
            && this.state.dateLineEntries.length > 0) 
          ? styles.buttonEnabled : styles.buttonDisabled
        }
        >
          <IADLargeButton title="Finish Review" color="white" 
            disabled={!(this.state.dateComment && (this.state.dateComment.length > 3)
              && this.state.dateTitle && (this.state.dateTitle.length > 3)
              && this.state.dateCity && (this.state.dateCity.length > 3)
              && this.state.dateLineEntries.length > 0)}
            onPress={() => this.onFinishReview()}/>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}
