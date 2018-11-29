import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import IADLargeButton from '../components/IADLargeButton';
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#c0dae8',
    padding: 14,
  },
  titleView: {
    fontWeight: 'bold',
    fontSize: 30,
    flex: 4,
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
  buttonsView: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonView: {
    width: "100%",
    backgroundColor: '#adc9d8',
    borderRadius: 8,
    margin: 2,
    flex: 1,
    justifyContent: 'center',
  },
});

export default class HomeScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      headerRight: (
        <Icon style={{paddingRight: 20 }} size={16} name='user-times' 
          onPress={() => {
            navigation.push('DeleteAccount');
          }}
      />
      ),
    };
  };

  constructor(props) {
    super(props);
    this.navigateTo = this.navigateTo.bind(this);
  }

  navigateTo(screen) {
    this.props.navigation.push(screen);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.titleView}>
          <Text style={styles.title}>It's a Date!</Text>
        </View>
        <View style={styles.buttonsView}>
          <View style={styles.buttonView}>
            <IADLargeButton title="Find a Date" color="white"
              onPress={() => {}}/>
          </View>
          <View style={styles.buttonView}>
            <IADLargeButton title="Review a Date" color="white"
              onPress={() => this.navigateTo('ReviewDate')}/>
          </View>
        </View>
        <View style={{flex: 3}}/>
      </View>
    );
  }
}