import React from "react";
import { Button, View, Text, StyleSheet, TextInput, AsyncStorage, Image } from "react-native";
import { createStackNavigator, createAppContainer, NavigationActions, withNavigation } from "react-navigation";
import TabViewPageHomeScreen from "./TabViewPage";
import CartButton from "./CartButton";
import CartScreen from "./CartScreen";
import HomeView from "./HomeView";
import TripOptionsScreen from './TripOptionsScreen';
import './global.js';
import EmphasisButton from './EmphasisButton';

export const cBlack = '#3D3D3D';
export const cDarkBlue = "#1D71F3";
export const cLightBlue = "#3EAAFA";
export const cRed = "#ED6A5A";
export const cOrange = "#FAA916";
export const cWhite = "#FFFFFF";

class WelcomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  }
  render() {
    return (
		<View style={styles.welcomeContainer}>
      <View>
      <Image source={require('./assets/img/logo_icon.png')} style={styles.welcomeLogo} />
      </View>
      <View>
        <Text style={styles.welcomeTitle}>Welcome to Wander Shop</Text>
        <Text style={styles.welcomeSubtitle}>An all-in-one travel e-commerce platform for all your future trips</Text>
      </View>
      <View>
          <EmphasisButton isRipple style={{}} rippleColor={cLightBlue}
            onPress={() => this.props.navigation.navigate('Login')} >
              <Text style={styles.emphasisButton}> LogIn Now </Text>
          </EmphasisButton>
          <EmphasisButton isRipple style={{backgroundColor: cRed}} rippleColor={cLightBlue} 
            onPress={() => this.props.navigation.navigate('CreateAccount')}>
              <Text style={[styles.emphasisButton, {color: cBlack}]}> Create an Account </Text>
          </EmphasisButton>
        </View>
		
		</View>
    );
  }

  componentDidMount() {
    AsyncStorage.removeItem('currentCart');
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
          <Text style={styles.normal}></Text>
        </View>
		</View>
		);
  };
  
  componentDidMount() {
    AsyncStorage.removeItem('currentCart');
  }

  login() {
    try {
      console.log(this.state.email)
      console.log(this.state.pass)
      fetch(global.url + 'login/', {
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
          // try {
          //   AsyncStorage.setItem('currentUserUid', responseJSON['uid']);
          // } catch (error) {
          //   console.log(error);
          // }
          this.props.navigation.navigate('HomePage');
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
            }}/>
        </View>
        <View style={{flex:.5, flexDirection: 'column'}}>
          <Text style={styles.normal}></Text>
        </View>
		</View>
		);
  };
  
  verifyPasswordMatch() {
    if (this.state.password == this.state.confirmPass) {
      console.log(this.state.password + " " + this.state.confirmPass);
      this.setState({passwordVerified: true}, () => { this.createAccount() });
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
      fetch(global.url + 'register/', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({
          name: this.state.name,
          phone: "+1" + this.state.phone,
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

class LogoutButton extends React.Component {

  logout() {
    console.log('LOGOUT');
    this.props.navigation.navigate('Welcome');
  }

  render() {
    var that = this;
    return (
      <Button title={"Logout"} onPress={that.logout.bind(that)}/>
    );
  }

}

const LogoutButtonNav = withNavigation(LogoutButton);

const AppNavigator = createStackNavigator({
	Welcome: WelcomeScreen,
	Login: LoginScreen,
  CreateAccount: CreateAccountScreen,
  HomePage: {
    screen: HomeView,
    navigationOptions: {
      headerLeft: null,
      headerRight: (<LogoutButtonNav />),
    },
  },
  TripOptions: {
    screen: TripOptionsScreen,
    navigationOptions: {
      headerRight: (<LogoutButtonNav />),
    },
  },
  TripPage: {
    screen: TabViewPageHomeScreen,
    navigationOptions: {
      headerRight: (<CartButton />),
    },
  },
  Cart: CartScreen,
}
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer persistenceKey={"NavigationKey"} />;
  }
}


const styles = StyleSheet.create({
  welcomeContainer: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
	  backgroundColor: '#FFFFFF',
    flexDirection: 'column',
    padding: 40
	},
  welcomeLogo: {
    width: 130, 
    height: 157,
    marginTop: 100
  },
  welcomeTitle: {
    fontFamily: "MontserratBold",
    fontSize: 34,
    textAlign: 'center',
    fontWeight: 'bold',
    color: cBlack,
    marginTop: 59
  },
	welcomeSubtitle: {
	  fontSize: 25,
	  textAlign: 'center',
    marginTop: 20,
    marginBottom: 90
  },
  emphasisButton: {
    color: cWhite,
    fontSize: 23,
    fontFamily: "MontserratSemiBold",
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