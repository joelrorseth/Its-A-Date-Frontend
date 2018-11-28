import React from 'react';
import { StyleSheet, Text, TextInput, View  } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import IADLargeButton from '../components/IADLargeButton';
import UserManager from '../models/UserManager';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#c0dae8',
    padding: 14,
  },
  titleView: {
    fontWeight: 'bold',
    flex: 2,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
    marginBottom: 4,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 4,
    paddingBottom: 4,
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    fontFamily: 'Verdana',
    paddingBottom: 10,
  },
  subtitle: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'Verdana',
  },
  formsContainer: {
    flex: 4,
  },
  formEntryContainer: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 4,
    paddingBottom: 4,
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
  formEntryInput: {
    color: 'grey',
    backgroundColor: 'white',
    marginTop: 4,
    marginBottom: 4,
    padding: 10,
    borderRadius: 8,
    borderColor: 'grey',
    borderWidth: 0.2,
  },
  buttonsView: {
    flex: 3,
    paddingLeft: 10,
    paddingRight: 10,
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

export default class DeleteAccountScreen extends React.Component {
  
  constructor(props){
    super(props);
    this.state = { emailField: "", passwordField: "", passwordVerifyField: "" };
    this.onDeleteButtonPressed = this.onDeleteButtonPressed.bind(this);
  }

  // Event handler for pressing the Delete My Account button
  onDeleteButtonPressed() {
    // Ask UserManager to delete current user it is managing
    UserManager.getInstance().deleteCurrentUser()
      .then(_ => {
        alert("Your account was successfully purged.");
        this.props.navigation.goBack();
      })
      .catch(error => {
        alert("An error occurred, please try again.");
      })
  }

  // Component render implementation.
  render() {
    return (
      <KeyboardAwareScrollView
        style={{ backgroundColor: '#c0dae8' }}
        resetScrollToCoords={{ x: 0, y: 0 }}
        contentContainerStyle={styles.container}
        scrollEnabled={true}
      >
        <View style={styles.titleView}>
          <Text style={styles.title}>Delete Your Account</Text>
          <Text style={styles.subtitle}>
            To delete your account, fill in your account email and password below.
            After confirming, your account and personal information will be 
            permanantly deleted.
          </Text>
        </View>

        <View style={styles.formsContainer}>
          <View style={styles.formEntryContainer}>
            <View style={styles.formEntryTitleContainer}>
              <Text style={styles.formEntryTitle}>Email</Text>
            </View>
            <TextInput
              style={styles.formEntryInput}
              textContentType="emailAddress"
              multiline={false}
              numberOfLines={1}
              onChangeText={(text) => this.setState({ emailField: text })}
              placeholder="Email"
              value={this.state.emailField}
            />
          </View>
          <View style={styles.formEntryContainer}>
            <View style={styles.formEntryTitleContainer}>
              <Text style={styles.formEntryTitle}>Password</Text>
            </View>
            <TextInput
              style={styles.formEntryInput}
              textContentType="password"
              secureTextEntry={true}
              multiline={false}
              numberOfLines={1}
              onChangeText={(text) => this.setState({ passwordField: text })}
              placeholder="Password"
              value={this.state.passwordField}
            />
          </View>
          <View style={styles.formEntryContainer}>
            <View style={styles.formEntryTitleContainer}>
              <Text style={styles.formEntryTitle}>Confirm Password</Text>
            </View>
            <TextInput
              style={styles.formEntryInput}
              textContentType="password"
              secureTextEntry={true}
              multiline={false}
              numberOfLines={1}
              onChangeText={(text) => this.setState({ passwordVerifyField: text })}
              placeholder="Password"
              value={this.state.passwordVerifyField}
            />
          </View>
        </View>

        <View style={styles.buttonsView}>
          <View style={
            (this.state.emailField.length > 3 && this.state.passwordField.length > 3 
              && this.state.passwordVerifyField.length > 3 
              && this.state.passwordField == this.state.passwordVerifyField) 
              ? styles.buttonEnabled : styles.buttonDisabled}>
            <IADLargeButton 
              title="Delete My Account"
              color="white" 
              disabled={!(this.state.emailField.length > 3 && this.state.passwordField.length > 3
                && this.state.passwordVerifyField.length > 3 
                && this.state.passwordField == this.state.passwordVerifyField)}
              onPress={() => this.onDeleteButtonPressed()}/>
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}
