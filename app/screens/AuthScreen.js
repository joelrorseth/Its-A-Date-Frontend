import React from 'react';
import { Button, StyleSheet, Text, TextInput, View  } from 'react-native';
import IADLargeButton from '../components/IADLargeButton';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#c0dae8',
    padding: 14,
  },
  titleView: {

    fontWeight: 'bold',
    fontSize: 30,
    flex: 3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 36,
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

export default class AuthScreen extends React.Component {

  constructor(props){
    super(props);
    this.state = { creatingNewAccount: false, emailField: "", passwordField: "" };
    this.onToggleCreateNewAccount = this.onToggleCreateNewAccount.bind(this);
    this.onProceedButtonPressed = this.onProceedButtonPressed.bind(this);
  }

  // Event handler for pressing the proceed button
  onProceedButtonPressed() {
    if (this.state.creatingNewAccount) {
      // TODO: Tell server to create account first
    }

    // TODO: Verify credentials via server, then present error message or transition to Home
    this.props.navigation.push('Home');
  }

  // Event handler for pressing the toggle Login/Create button
  onToggleCreateNewAccount() {
    this.setState({ creatingNewAccount: !this.state.creatingNewAccount });
  }

  // Component render implementation.
  render() {
    return (
      <View style={styles.container}>
        
        <View style={styles.titleView}>
          <Text style={styles.title}>It's a Date!</Text>
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
              placeholder="Email or username"
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
        </View>

        <View style={styles.buttonsView}>
          <View style={
            (this.state.emailField.length > 3 && this.state.passwordField.length > 3) 
              ? styles.buttonEnabled : styles.buttonDisabled}>
            <IADLargeButton 
              title={this.state.creatingNewAccount ? "Create Account" : "Login"}
              color="white" 
              disabled={!(this.state.emailField.length > 3 && this.state.passwordField.length > 3)}
              onPress={() => this.onProceedButtonPressed()}/>
          </View>
        </View>

        <Button title={this.state.creatingNewAccount ? 
          "Log into an existing account" : "I don't have an account"}
          onPress={() => this.onToggleCreateNewAccount()}/>
        <View style={{ flex: 2 }}/>
      </View>
    );
  }
}
