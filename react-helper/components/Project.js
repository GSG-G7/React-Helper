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
    level: '',
    btnTitle: '',
    screen: '',
    feedBack: ''
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

  onChange = value => {
    this.setState({ feedBack: value });
  };
  handelSubmit = () => {
    const userID = auth.currentUser;
    let { feedBack } = this.state;
    this.setState({ show: true });
    dataBase
      .collection('users')
      .doc(userID.uid)
      .set(
        {
          userQuetions: feedBack
        },
        { merge: true }
      );
  };

  render() {
    const {
      userName,
      userScore,
      show,
      btnTitle,
      screen,
      level,
      feedBack
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
          <Text style={styles.profile__mainQ}>
            Start Your First React Project
          </Text>
          <Text style={styles.profile__subTitle}>
            Read the project description and follow the required steps to start
            your first react project
          </Text>
          <View style={styles.profile__questions}>
            <View style={styles.profile__question}>
              <Text style={styles.profile__questionNum}>
                Project Name : To Do App
              </Text>
              <Text
                style={{ color: 'white', paddingLeft: 6, paddingBottom: 14 }}
              >
                You have to create To Do App that perform theses tasks :
              </Text>
              <Text
                style={{
                  color: 'white',
                  textAlign: 'left',
                  paddingLeft: 6,
                  paddingTop: 2
                }}
              >
                1- Add Items
              </Text>
              <Text
                style={{
                  color: 'white',
                  textAlign: 'left',
                  paddingLeft: 6,
                  paddingTop: 2
                }}
              >
                2- Update Items
              </Text>
              <Text
                style={{
                  color: 'white',
                  textAlign: 'left',
                  paddingLeft: 6,
                  paddingTop: 2
                }}
              >
                3- Arrange Items
              </Text>
              <Text
                style={{
                  color: 'white',
                  textAlign: 'left',
                  paddingLeft: 6,
                  paddingTop: 2
                }}
              >
                4- Delete Items
              </Text>
            </View>
            <View
              style={{
                marginTop: 10,
                height: 80,
                width: 250,
                borderColor: 'black',
                borderWidth: 1,
                borderLeftColor: 'gray'
              }}
            >
              <TextInput
                placeholder="Ask Us"
                onChangeText={this.onChange}
                value={feedBack}
              />
            </View>
            <View style={show ? styles.activScreen : styles.hiddenScreen}>
              <Text style={{ color: 'black', textAlign: 'center' }}>OK</Text>
              <Text style={{ color: 'black', textAlign: 'center' }}>
                Your Questions is sent
              </Text>
              <TouchableOpacity style={{ width: '90%' }}>
                <Button
                  title="OK"
                  color="black"
                  onPress={() => {
                    this.props.navigation.navigate('Project');
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
  footer: {
    width: '100%',
    borderTopWidth: 1,
    borderColor: 'gray',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
    alignItems: 'center',
    marginTop: 25
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
  profile__questions: {
    marginTop: 40,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative'
  },
  profile__question: {
    width: '95%',
    height: 200,
    borderWidth: 1,
    borderColor: 'gray',
    backgroundColor: 'black',
    marginBottom: 10
  },
  profile__answers: {
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
    color: 'gray',
    fontSize: 17,
    marginTop: 7,
    marginBottom: 7,
    marginLeft: 6
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
