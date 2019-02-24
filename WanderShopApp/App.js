import React from "react";
import { Button, View, Text, StyleSheet, TextInput } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";

class WelcomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  }
  render() {
    return (
		<View style={styles.container}>
      <View style={{flex:.2}}></View>
      <View style={{flex:.4}}>
        <Text style={styles.welcome}>WanderShop</Text>
        <Text style={styles.normal}>Solve all your trip planning needs.</Text>
      </View>
      <View style={{flex:.4}}>
        <Button title="Sign In"
          onPress={() => this.props.navigation.navigate('Login')}/>
        <Button title="Create Account"
          onPress={() => this.props.navigation.navigate('CreateAccount')}/>
      </View>
		
		</View>
    );
  }
}
class LoginScreen extends React.Component {
	render() {
		const {navigate} = this.props.navigation;
		return (
			<View style={styles.container}>
        <View style={{flex:.2, flexDirection: 'column'}}></View>
        <View style={{flex:.3}}>
          <Text style={styles.normal}>Please log into your account.</Text>
        </View>
        <View style={{flex:.2, flexDirection: 'column'}}>
          <View style={{flex: 1, flexDirection:'row', justifyContent: 'center'}}>
            <View style={{flex:.3}}></View>
            <TextInput
              style={{flex:.7}}
              placeholder="Email"
              onChangeText={(email) => this.setState({email})}>
            </TextInput>
          </View>
          <View style={{flex: 1, flexDirection:'row', justifyContent: 'center'}}>
            <View style={{flex:.3}}></View>
            <TextInput
              style={{flex:.7}}
              placeholder="Password"
              secureTextEntry={true}
              onChangeText={(pass) => this.setState({pass})}>
            </TextInput>
          </View>
          <Button title="Sign In"
            onPress={() => this.login()}/>
        </View>
        <View style={{flex:.4, flexDirection: 'column'}}>
          <Text style={styles.normal}>Nothing</Text>
        </View>
		</View>
		);
  };
  
  login() {
    try {
      console.log(this.state.email)
      console.log(this.state.pass)
      fetch('http://127.0.0.1:5000/login/', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({
          email: this.state.email,
          password: this.state.pass,
        }),
      })
      .then((response) => response.json())
      .then((responseJSON) => {
        if (responseJSON['success'] == 1) {
          this.props.navigation.navigate('Welcome')
        } else {
          console.log(responseJSON)
          console.log("Login failed");
        }
      }).catch(function(error) {
        console.log('There has been a problem with your fetch operation: ' + error.message);
         // ADD THIS THROW error
          throw error;
      });
    } catch (error) {
      console.error(error);
    }
  }
}
// TODO: Provide better error handling (i.e. email already exists)
// TODO: Provide better validation for phone numbers (must be in format +17705555555)
//       can transform afterwards or just prompt user 
class CreateAccountScreen extends React.Component {
	render() {
    const {navigate} = this.props.navigation;
		return (
			<View style={styles.container}>
        <View style={{flex:.2, flexDirection: 'column'}}></View>
        <View style={{flex:.3}}>
          <Text style={styles.normal}>Please create an account.</Text>
        </View>
        <View style={{flex:.3, flexDirection: 'column'}}>
          <View style={{flex: 1, flexDirection:'row', justifyContent: 'center'}}>
            <View style={{flex:.3}}></View>
            <TextInput
              style={{flex:.7}}
              placeholder="Name"
              onChangeText={(name) => this.setState({name})}>
            </TextInput>
          </View>
          <View style={{flex: 1, flexDirection:'row', justifyContent: 'center'}}>
            <View style={{flex:.3}}></View>
            <TextInput
              style={{flex:.7}}
              placeholder="Phone"
              onChangeText={(phone) => this.setState({phone})}>
            </TextInput>
          </View>
          <View style={{flex: 1, flexDirection:'row', justifyContent: 'center'}}>
            <View style={{flex:.3}}></View>
            <TextInput
              style={{flex:.7}}
              placeholder="Email"
              onChangeText={(email) => this.setState({email})}>
            </TextInput>
          </View>
          <View style={{flex: 1, flexDirection:'row', justifyContent: 'center'}}>
            <View style={{flex:.3}}></View>
            <TextInput
              style={{flex:.7}}
              placeholder="Password (at least 8 characters)"
              secureTextEntry={true}
              onChangeText={(password) => this.setState({password})}>
            </TextInput>
          </View>
          <View style={{flex: 1, flexDirection:'row', justifyContent: 'center'}}>
            <View style={{flex:.3}}></View>
            <TextInput
              style={{flex:.7}}
              placeholder="Confirm Password"
              secureTextEntry={true}
              onChangeText={(confirmPass) => this.setState({confirmPass})}>
            </TextInput>
          </View>
          <Button title="Create Account"
            onPress={() => {
              this.verifyPasswordMatch();
              this.forceUpdate(this.createAccount());
            }}/>
        </View>
        <View style={{flex:.5, flexDirection: 'column'}}>
          <Text style={styles.normal}>Nothing</Text>
        </View>
		</View>
		);
  };
  
  verifyPasswordMatch() {
    if (this.state.password == this.state.confirmPass) {
      console.log(this.state.password + " " + this.state.confirmPass);
      this.setState((state) => {
        return {passwordVerified: true};
      });
      //this.setState({passwordVerified: true}, this.createAccount());
      console.log(this.state.passwordVerified);
    } else {
      this.setState((state) => {
        return {passwordVerified: false};
      });
    }
  }

  createAccount() {
    if (!this.state.passwordVerified) {
      console.log(this.state.passwordVerified);
      return;
    }
    try {
      fetch('http://127.0.0.1:5000/register/', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({
          name: this.state.name,
          phone: this.state.phone,
          email: this.state.email,
          password: this.state.password,
        }),
      })
      .then((response) => response.json())
      .then((responseJSON) => {
        if (responseJSON['success'] == 1) {
          this.props.navigation.navigate('Welcome')
        } else {
          console.log(responseJSON)
          console.log("Create account failed");
        }
      }).catch(function(error) {
        console.log('There has been a problem with your fetch operation: ' + error.message);
         // ADD THIS THROW error
          throw error;
      });
    } catch (error) {
      console.error(error);
    }
  }
}

const AppNavigator = createStackNavigator({
	Welcome: WelcomeScreen,
	Login: LoginScreen,
	CreateAccount: CreateAccountScreen
}
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}

  
  const styles = StyleSheet.create({
	container: {
	  flex: 1,
	  justifyContent: 'center',
	  backgroundColor: '#42cef4',
	  flexDirection: 'column'
	},
	welcome: {
	  fontSize: 40,
	  textAlign: 'center',
	  margin: 10,
	},
	normal: {
	  fontSize: 20,
	  textAlign: 'center',
	  margin: 10,
	},
	instructions: {
	  textAlign: 'center',
	  color: '#333333',
	  marginBottom: 5,
	},
	background: {
	  backgroundColor: '#42cef4',
	  flex: 1,
	},
  });