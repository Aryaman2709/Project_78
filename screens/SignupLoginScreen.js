import * as React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ScrollView,
  KeyboardAvoidingView
} from 'react-native';
import firebase from 'firebase';
import db from '../config';

export default class SignupLoginScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      emailId: '',
      password: '',
      isModalVisible: false,
      firstName: '',
      lastName: '',
      address: '',
      contact: '',
      confirmPassword: '',
    };
  }

  showModal = () => {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.state.isModalVisible}>
        <View style={styles.modalContainer}>
          <ScrollView style={{ width: '100%' }}>
            <KeyboardAvoidingView style={styles.keyboardAvoidingView}>
              <Text style={styles.modalTitle}>Registration</Text>
              <TextInput
                style={styles.formTextInput}
                placeholder="First Name"
                maxLength={8}
                onChangeText={(text) => {
                  this.setState({ firstName: text });
                }}
                value={this.state.firstName}></TextInput>
              <TextInput
                style={styles.formTextInput}
                placeholder="Last Name"
                maxLength={8}
                onChangeText={(text) => {
                  this.setState({ lastName: text });
                }}
                value={this.state.lastName}></TextInput>
              <TextInput
                style={styles.formTextInput}
                placeholder="Contact"
                maxLength={10}
                keyboardType={'numeric'}
                onChangeText={(text) => {
                  this.setState({ contact: text });
                }}
                value={this.state.contact}></TextInput>
              <TextInput
                style={styles.formTextInput}
                placeholder="Address"
                multiline={true}
                onChangeText={(text) => {
                  this.setState({ address: text });
                }}
                value={this.state.address}></TextInput>
              <TextInput
                style={styles.formTextInput}
                placeholder="Email ID"
                keyboardType='email-address'
                onChangeText={(text) => {
                  this.setState({ emailId: text });
                }}
                value={this.state.emailId}></TextInput>
              <TextInput
                style={styles.formTextInput}
                placeholder="Password"
                secureTextEntry={true}
                onChangeText={(text) => {
                  this.setState({ password: text });
                }}
                value={this.state.password}></TextInput>
              <TextInput
                style={styles.formTextInput}
                placeholder="Confirm Password"
                secureTextEntry={true}
                onChangeText={(text) => {
                  this.setState({ confirmPassword: text });
                }}
                value={this.state.confirmPassword}></TextInput>
              <View style={styles.modalBackButon}>
                <TouchableOpacity
                  style={styles.registerButton}
                  onPress={() => {
                    this.userSignup(
                      this.state.emailId,
                      this.state.password,
                      this.state.confirmPassword
                    );
                  }}>
                  <Text style={styles.registerButtonText}>Register</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.modalBackButon}>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => {
                    this.setState({isModalVisible:false})
                  }}
                  >
                  <Text style={{ color: 'black' }}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </Modal>
    );
  };

   userLogin = (emailId, password)=>{
        firebase.auth().signInWithEmailAndPassword(emailId, password)
        .then(()=>{
            return alert("Login Successful")
        })
        .catch((error)=>{
            var errorCode = error.code;
            var errorMessage = error.message;
            return alert(errorMessage)
        })
    }

    userSignup = (emailId, password, confirmPassword) => {
      if (password !== confirmPassword) {
        return alert('Password does not match');
      } else {
        firebase
          .auth()
          .createUserWithEmailAndPassword(emailId, password)
          .then((response) => {
            db.collection('users').add({
              first_name: this.state.firstName,
              last_name: this.state.lastName,
              contact: this.state.contact,
              address: this.state.address,
              email_id: this.state.emailId,
            });
            return alert('User added successfully', '', [
              {
                text: 'OK',
                onPress: () => {
                  this.setState({ isModalVisible: false });
                },
              },
            ]);
          })
          .catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            return alert(errorMessage);
          });
      }
    };

  render() {
    return (
      <View style={styles.container}>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          {this.showModal()}
        </View>
      <View>
      <Text style={styles.title}>Barter</Text>
      </View>
        <View>
          <TextInput
            style={styles.loginBox}
            placeholder="Email ID"
            keyboardType="email-address"
            onChangeText={(text) => {
              this.setState({ emailId: text });
            }}
            value={this.state.emailId}></TextInput>
          <TextInput
            style={styles.loginBox}
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={(text) => {
              this.setState({ password: text });
            }}
            value={this.state.password}>
          </TextInput>
          <TouchableOpacity
            style={[styles.button,{marginBottom:20, marginTop:20}]}
            onPress = {()=>{this.userLogin(this.state.emailId, this.state.password)}}
            >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.setState({isModalVisible:true})
            }}
            >
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EADBB4',
  },
  loginBox: {
    width: 300,
    height: 40,
    borderBottomWidth: 1.5,
    borderColor: '#EB9365',
    fontSize: 20,
    margin: 10,
    paddingLeft: 10,
  },
  button: {
    width: 300,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 10.32,
    elevation: 16,
  },
  buttonText: {
    color: '#EB9365',
    fontWeight: 200,
    fontSize: 20,
  },
  title:{
    fontSize: 65,
    fontWeight: 300,
    paddingBottom: 30,
    color: 'black',
  },
  keyboardAvoidingView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalTitle: {
    justifyContent: 'center',
    alignSelf: 'center',
    fontSize: 30,
    color: '#ff5722',
    margin: 50,
  },
  modalContainer: {
    flex: 1,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffff',
    marginRight: 30,
    marginLeft: 30,
    marginTop: 80,
    marginBottom: 80,
  },
  formTextInput: {
    width: '75%',
    height: 35,
    alignSelf: 'center',
    borderColor: '#ffab91',
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 20,
    padding: 10,
  },
  registerButton: {
    width: 200,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 30,
  },
  registerButtonText: { 
    color: '#ff5722',
     fontSize: 15, 
     fontWeight: 'bold' },
  cancelButton: {
    width: 200,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },
});
