import React, { Component } from 'react';
import 'firebase/firestore';
import 'firebase/storage';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import { firebase, dataBase, auth, doSignInWithEmailAndPassword } from '../App';

// new home screen
class HomeScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.home}>
          <View style={styles.home__title}>
            <Text style={styles.home__mainTitle}>React Helper</Text>
            <Text style={{ fontSize: 17, color: 'gray', textAlign: 'center' }}>
              Assest your react level then start a suitable course
            </Text>
            <Icon name="react" size={200} color="#d8d8d8" />
          </View>
          <View style={styles.home__btn}>
            <TouchableOpacity style={styles.home__logIn}>
              <Button
                title="Log In"
                color="gray"
                onPress={() => this.props.navigation.navigate('Login')}
              />
            </TouchableOpacity>
            <Text
              style={styles.home__signUp}
              onPress={() => this.props.navigation.navigate('Signup')}
            >
              Create a new account
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111111'
  },
  home: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#111111'
  },
  home__title: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  home__btn: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 80
  },
  home__logIn: {
    width: 250
  },
  home__signUp: {
    color: 'white',
    fontSize: 18,
    paddingTop: 10
  },
  home__mainTitle: {
    color: '#d8d8d8',
    fontSize: 27,
    paddingBottom: 30
  }
});

export default HomeScreen;
