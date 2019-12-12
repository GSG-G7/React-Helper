import React, { Component } from 'react';
import 'firebase/firestore';
import 'firebase/storage';
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

import {
  firebase,
  dataBase,
  auth,
  doCreateUserWithEmailAndPassword
} from '../App';

let userId;

class SignUp extends Component {
  state = {
    email: '',
    user: {},
    userName: '',
    errorMessage: ''
  };

  componentDidMount() {
    Form.addValidationRule('isPasswordMatch', value => {
      if (value !== this.state.user.password) {
        return false;
      }
      return true;
    });
  }

  componentWillUnmount() {
    Form.removeValidationRule('isPasswordMatch');
  }

  handlePassword = event => {
    const { user } = this.state;
    user.password = event.nativeEvent.text;
    this.setState({ user });
  };

  handleRepeatPassword = event => {
    const { user } = this.state;
    user.repeatPassword = event.nativeEvent.text;
    this.setState({ user });
  };

  handleChange = ({ target: { value, name } }) => {
    this.setState({ [name]: value });
  };

  handleSubmit = async () => {
    const { email, userName, user } = this.state;
    const { navigation } = this.props;
    try {
      const result = await doCreateUserWithEmailAndPassword(
        email,
        user.password
      );
      userId = result.user.uid;
      await dataBase
        .collection('users')
        .doc(result.user.uid)
        .set(
          {
            name: userName,
            email: email,
            userID: result.user.uid,
            scores: 0
          },
          { merge: true }
        );
      await navigation.navigate('userProfile');
      this.setState({ email: '', user: {}, userName: '' });
    } catch (error) {
      this.setState({ errorMessage: error.message });
    }
  };

  render() {
    const { email, user, userName, errorMessage } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.SignUp}>
          <Text style={styles.SignUp__title}>Sign Up</Text>
          <View style={styles.SignUp__inputs}>
            <Form onSubmit={this.handleSubmit}>
              <TextValidator
                style={styles.SignUp__input}
                name="email"
                label="email"
                validators={['required', 'isEmail']}
                errorMessages={['This field is required', 'Email invalid']}
                placeholder="Enter your Email"
                type="text"
                value={email}
                keyboardType="email-address"
                onChangeText={value => this.setState({ email: value })}
              />
              <TextValidator
                style={styles.SignUp__input}
                name="userName"
                label="userName"
                validators={['required']}
                errorMessages={['This field is required']}
                placeholder="Enter your name"
                type="text"
                value={userName}
                keyboardType="email-address"
                onChangeText={value => this.setState({ userName: value })}
              />
              <TextValidator
                style={styles.SignUp__input}
                name="password"
                label="text"
                secureTextEntry
                validators={['required']}
                errorMessages={['This field is required']}
                type="text"
                placeholder="Enter Password"
                value={user.password}
                onChange={this.handlePassword}
              />
              <TextValidator
                style={styles.SignUp__input}
                name="repeatPassword"
                label="text"
                secureTextEntry
                validators={['isPasswordMatch', 'required']}
                errorMessages={['Password mismatch', 'This field is required']}
                type="text"
                placeholder="Confirm Password"
                value={user.repeatPassword}
                onChange={this.handleRepeatPassword}
              />
              <TouchableOpacity style={styles.SignUp__btn}>
                <Button
                  title="Sign Up"
                  color="black"
                  onPress={this.handleSubmit}
                />
              </TouchableOpacity>
            </Form>
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
  SignUp: {
    width: 300,
    height: 450,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white',
    borderColor: 'gray',
    borderWidth: 3
  },
  SignUp__title: {
    color: 'black',
    fontSize: 25,
    marginTop: 25
  },
  SignUp__input: {
    width: 240,
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 20
  },
  SignUp__inputs: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  SignUp__btn: {
    width: 240,
    height: 40
  }
});

export default SignUp;
export { userId };
