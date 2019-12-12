import React, { Component } from 'react';
import { firebase, dataBase, auth, doSignInWithEmailAndPassword } from '../App';
import { Form, TextValidator } from 'react-native-validator-form';
import Nicon from 'react-native-vector-icons/AntDesign';

import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  TextInput
} from 'react-native';

// const googleProvider = firebase.auth.GoogleAuthProvider();

class LogIn extends Component {
  state = {
    email: '',
    user: {},
    error: null
  };

  handleChange = ({ target: { value, name } }) => {
    this.setState({ [name]: value });
  };

  handleSubmit = () => {
    const { email, user } = this.state;
    const { navigation } = this.props;
    doSignInWithEmailAndPassword(email, user.password)
      .then(res => {
        navigation.navigate('userProfile');
        this.setState({ email: '', user: {} });
      })
      .catch(error => {
        this.setState({ error: error });
      });
  };

  handlePassword = event => {
    const { user } = this.state;
    user.password = event.nativeEvent.text;
    this.setState({ user });
  };

  render() {
    const { email, user, error } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.LogIn}>
          <Text style={styles.LogIn__title}>Log In</Text>
          <View style={styles.LogIn__inputs}>
            <Form ref="form" onSubmit={this.handleSubmit}>
              <TextValidator
                style={styles.LogIn__input}
                name="email"
                label="email"
                validators={['required', 'isEmail']}
                errorMessages={['This field is required', 'Email invalid']}
                placeholder="Enter your Email"
                type="text"
                keyboardType="email-address"
                value={email}
                onChangeText={value =>
                  this.setState({ email: value, error: null })
                }
              />
              <TextValidator
                style={styles.LogIn__input}
                name="password"
                label="text"
                secureTextEntry
                validators={['required']}
                errorMessages={['This field is required']}
                placeholder="Enter Password"
                type="text"
                value={user.password}
                onChange={this.handlePassword}
              />
              <TouchableOpacity style={styles.LogIn__btn}>
                <Button
                  title="Log In"
                  color="black"
                  onPress={this.handleSubmit}
                />
              </TouchableOpacity>
              <View>
                {error !== null ? (
                  <Text style={{ color: 'red', width: 80 }}>
                    {error.message}
                  </Text>
                ) : null}
              </View>
            </Form>
          </View>
          <View style={styles.LogIn__btns}>
            <Text style={{ color: 'black', fontSize: 25 }}>OR</Text>
            <TouchableOpacity style={styles.LogIn__btn}>
              <Button
                title="Log In with Google"
                color="black"
                // onPress={() => {
                //   auth.signInWithPopup(googleProvider);
                //   this.props.navigation.navigate('userProfile');
                // }}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <Nicon
            name="home"
            size={30}
            style={{
              marginTop: 20,
              width: 60,
              height: 60,
              textAlign: 'center',
              lineHeight: 60,
              borderRadius: 30,
              backgroundColor: 'gray'
            }}
            color="white"
            onPress={() => this.props.navigation.navigate('Home')}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111111',
    justifyContent: 'center',
    alignItems: 'center'
  },
  LogIn: {
    width: 300,
    height: 450,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderColor: 'gray',
    borderWidth: 3
  },
  LogIn__title: {
    color: 'black',
    fontSize: 25,
    marginBottom: 45
  },
  LogIn__input: {
    width: 240,
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 20
  },
  LogIn__inputs: {
    height: 105,
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  LogIn__btn: {
    width: 240,
    height: 40
  },
  LogIn__btns: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default LogIn;
