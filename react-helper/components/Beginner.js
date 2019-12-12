import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  TextInput
} from 'react-native';
import { firebase, dataBase, auth, doSignInWithEmailAndPassword } from '../App';
import { Form, TextValidator } from 'react-native-validator-form';
import Nicon from 'react-native-vector-icons/AntDesign';

class Beginner extends Component {
  state = {
    userName: '',
    userScore: 0,
    answers: ['The View', 'Babel', 'JSX'],
    value1: '',
    value2: '',
    value3: '',
    show: false,
    btnTitle: '',
    screen: '',
    message: ''
  };

  componentDidMount() {
    const userID = auth.currentUser;
    dataBase
      .collection('users')
      .doc(userID.uid)
      .get()
      .then(res => {
        const name = res.data().name;
        const score = res.data().scores;
        this.setState({ userName: name, userScore: score });
      });
  }
  handelSubmit = () => {
    const userID = auth.currentUser;
    let { answers, userScore, value1, value2, value3 } = this.state;
    if (value1 === answers[0]) {
      userScore++;
    }
    if (value2 === answers[1]) {
      userScore++;
    }
    if (value3 === answers[2]) {
      userScore++;
    }
    this.setState({ value1: '', value2: '', value3: '' });

    if (userScore === 4) {
      this.setState({
        show: true,
        btnTitle: 'Go to the next level',
        screen: 'LevelI',
        message: 'You have acheived the first level successfully '
      });
    } else {
      this.setState({
        show: true,
        btnTitle: 'Try a gain',
        screen: 'LevelB',
        message: 'Sorry, you must answer all questions correctly'
      });
    }
    this.setState({ userScore });
    dataBase
      .collection('users')
      .doc(userID.uid)
      .update({
        scores: userScore
      });
  };

  render() {
    const {
      userName,
      userScore,
      show,
      value1,
      value2,
      value3,
      btnTitle,
      screen,
      message
    } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.profile}>
          <View style={styles.profile__header}>
            <Text style={styles.profile__title}>
              Name : <Text>{userName}</Text>
            </Text>
            <Text style={styles.profile__title}>
              Scores : <Text>{userScore}</Text>
            </Text>
          </View>
          <Text style={styles.profile__mainQ}>Level : Beginner</Text>
          <Text style={styles.profile__subTitle}>
            You must answer all of these questions to transfer to the next level
          </Text>
          <View style={styles.profile__questions}>
            <View style={styles.profile__question}>
              <Text style={styles.profile__questionNum}>
                What part of your application does React focus on ?
              </Text>
              <View style={styles.profile__answers}>
                <Form ref="form">
                  <TextValidator
                    validators={['required']}
                    errorMessages={['This field is required']}
                    placeholder="Type your answer"
                    value={value1}
                    style={styles.profile__answer}
                    onChangeText={value1 => this.setState({ value1 })}
                  />
                </Form>
              </View>
            </View>
            <View style={styles.profile__question}>
              <Text style={styles.profile__questionNum}>
                What tool can you use to transpile JSX ?
              </Text>
              <View style={styles.profile__answers}>
                <Form ref="form">
                  <TextValidator
                    validators={['required']}
                    errorMessages={['This field is required']}
                    placeholder="Type your answer"
                    value={value2}
                    style={styles.profile__answer}
                    onChangeText={value2 => this.setState({ value2 })}
                  />
                </Form>
              </View>
            </View>
            <View style={styles.profile__question}>
              <Text style={styles.profile__questionNum}>
                lets you create JavaScript objects using HTML syntax ?
              </Text>
              <View style={styles.profile__answers}>
                <Form ref="form">
                  <TextValidator
                    validators={['required']}
                    errorMessages={['This field is required']}
                    placeholder="Type your answer"
                    value={value3}
                    style={styles.profile__answer}
                    onChangeText={value3 => this.setState({ value3 })}
                  />
                </Form>
              </View>
            </View>
            <View style={show ? styles.activScreen : styles.hiddenScreen}>
              <Text style={{ color: 'black', textAlign: 'center' }}>
                your score is <Text>{userScore}</Text> /4
              </Text>
              <Text style={{ color: 'black', textAlign: 'center' }}>
                {message}
              </Text>
              <TouchableOpacity style={{ width: '90%' }}>
                <Button
                  title={btnTitle}
                  color="black"
                  onPress={() => {
                    this.props.navigation.navigate(screen);
                    this.setState({ show: false });
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity style={styles.profile__submit}>
            <Button title="Submit" color="black" onPress={this.handelSubmit} />
          </TouchableOpacity>
          <View style={styles.footer}>
            <Nicon
              name="back"
              size={26}
              color="black"
              onPress={() => this.props.navigation.goBack()}
            />
            <Nicon
              name="home"
              size={26}
              color="black"
              onPress={() => this.props.navigation.navigate('userProfile')}
            />
            <Nicon
              name="logout"
              size={26}
              color="black"
              onPress={() => {
                auth.signOut();
                this.props.navigation.navigate('Home');
              }}
            />
          </View>
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
    alignItems: 'center',
    paddingTop: 20
  },
  activScreen: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: 'red',
    backgroundColor: 'white',
    width: 260,
    height: 150,
    position: 'absolute',
    zIndex: 10
  },
  hiddenScreen: {
    display: 'none'
  },
  profile: {
    alignItems: 'center',
    backgroundColor: 'white',
    height: 600,
    width: '90%',
    borderColor: 'gray',
    borderWidth: 3
  },
  profile__header: {
    width: '100%',
    height: 45,
    borderBottomWidth: 1,
    borderColor: 'gray',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
    alignItems: 'center'
  },
  profile__mainQ: {
    color: 'black',
    fontSize: 20,
    marginTop: 15
  },
  profile__title: {
    color: 'black',
    fontSize: 18
  },
  footer: {
    width: '100%',
    borderTopWidth: 1,
    borderColor: 'gray',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
    alignItems: 'center',
    marginTop: 25,
    height: 60
  },
  profile__questions: {
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative'
  },
  profile__question: {
    width: '95%',
    height: 100,
    borderWidth: 1,
    borderColor: 'gray',
    backgroundColor: 'black',
    marginBottom: 10
  },
  profile__answers: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  profile__answer: {
    color: 'white',
    fontSize: 14,
    borderWidth: 1,
    borderColor: 'white',
    paddingLeft: 4,
    width: 160,
    height: 30,
    marginTop: 7,
    marginLeft: 5,
    textAlign: 'center',
    lineHeight: 30,
    backgroundColor: 'gray'
  },
  profile__questionNum: {
    color: 'white',
    fontSize: 17,
    marginTop: 7,
    marginLeft: 5
  },
  profile__submit: {
    width: '95%',
    marginTop: 10
  },
  profile__subTitle: {
    textAlign: 'center',
    color: 'gray',
    marginTop: 5,
    width: '90%'
  }
});

export default Beginner;
