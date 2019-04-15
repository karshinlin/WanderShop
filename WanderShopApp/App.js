import React from "react";
import { Button, View, Platform, Text, StyleSheet, KeyboardAvoidingView, TextInput, AsyncStorage, Image } from "react-native";
import { createStackNavigator, createAppContainer, NavigationActions, withNavigation } from "react-navigation";
import TabViewPageHomeScreen from "./TabViewPage";
import CartButton from "./CartButton";
import CartScreen from "./CartScreen";
import HomeView from "./HomeView";
import TripOptionsScreen from './TripOptionsScreen';
import ItineraryScreen from './ItineraryScreen';
import './global.js';
import EmphasisButton from './EmphasisButton';
import StandardButton from './StandardButton';

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
          <EmphasisButton isRipple style={{}}
            onPress={() => this.props.navigation.navigate('Login')} >
              <Text style={[styles.emphasisButton, {fontWeight: "bold"}]}> Login Now </Text>
          </EmphasisButton>
          <EmphasisButton isRipple style={{backgroundColor: "white", borderWidth: 2, borderColor: "#BBBBBB",}} 
            onPress={() => this.props.navigation.navigate('CreateAccount')}>
              <Text style={[styles.emphasisButton, {color: cBlack, fontWeight: "bold"}]}> Create Account </Text>
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
			<KeyboardAvoidingView style={styles.container} enabled behavior={'padding'}>
        
        <View style={[{flex: 0.2}, styles.titleHolder]}>
          <Text style={styles.title}>Sign In</Text>
        </View>
        <View style={{}}>
          <TextInput
              style={styles.textInput}
              placeholder="Email"
              onChangeText={(email) => this.setState({email})}>
          </TextInput>
          <TextInput
              style={styles.textInput}
              placeholder="Password"
              secureTextEntry={true}
              onChangeText={(pass) => this.setState({pass})}>
            </TextInput>
        </View>
        <View style={{flex:.3}}>
          <StandardButton style={{marginTop: 50}} rippleColor={cLightBlue}
            onPress={() => this.login()} >
              <Text style={styles.standardButton}> LOG IN</Text>
          </StandardButton>
          <Text style={styles.buttonNote}>Forgot your password?</Text>
        </View>

		  </KeyboardAvoidingView>
		);
  };
  
  componentDidMount() {
    AsyncStorage.removeItem('currentCart');
  }

  login() {
    // this.props.navigation.navigate('HomePage');
    // //TODO: remove after UI improvements
    //return null;
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
          var userName = responseJSON['name'];
          console.log(responseJSON);
          this.props.navigation.navigate('HomePage', {name: userName.toString()});
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
    let inpMargin = 7;
		return (
			<KeyboardAvoidingView style={styles.container} enabled behavior={'padding'}>
        <View style={[{flex: 0.2}, styles.titleHolder]}>
          <Text style={styles.title}>Create an Account</Text>
        </View>
        <View style={{}}>
          <TextInput
            style={[styles.textInput, {marginBottom: inpMargin}]}
            placeholder="Name"
            onChangeText={(name) => this.setState({name})}>
          </TextInput>
          <TextInput
            style={[styles.textInput, {marginBottom: inpMargin}]}
            placeholder="Phone"
            onChangeText={(phone) => this.setState({phone})}>
          </TextInput>
          <TextInput
            style={styles.textInput}
            placeholder="Email"
            onChangeText={(email) => this.setState({email})}>
          </TextInput>
          <TextInput
            style={[styles.textInput, {marginBottom: inpMargin}]}
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={(password) => this.setState({password})}>
          </TextInput>
          <TextInput
            style={styles.textInput}
            placeholder="Confirm Password"
            secureTextEntry={true}
            onChangeText={(confirmPass) => this.setState({confirmPass})}>
          </TextInput>
        </View>
        <View style={{flex:.3}}>
          <StandardButton isRipple style={{height:70, marginTop: 50}} rippleColor={cLightBlue}
            onPress={() => this.verifyPasswordMatch()} >
              <Text style={styles.standardButton}>CREATE ACCOUNT</Text>
          </StandardButton>
          <Text style={styles.buttonNote}>Already have an account? <Text style={{color: cDarkBlue}}> LOG IN</Text></Text>
        </View>

		  </KeyboardAvoidingView>
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
      
      <Text style={{color: cLightBlue, fontFamily: "Arial", fontSize: 19, marginRight: 30}} onPress={that.logout.bind(that)}>Logout</Text>
    );
  }

}
class ItineraryButton extends React.Component {

  showI() {
    this.props.navigation.navigate('Itinerary');
  }

  render() {
    var that = this;
    return (
      
      <Text style={{color: "#FFFFFF", fontFamily: "Arial", fontSize: 19, marginRight: 30}} onPress={that.showI.bind(that)}>Itinerary</Text>
    );
  }

}





const LogoutButtonNav = withNavigation(LogoutButton);
const ItineraryButtonNav = withNavigation(ItineraryButton);

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
      headerStyle: {
        backgroundColor: cLightBlue,
        elevation: 0,
        shadowOpacity: 0,
        paddingTop: 15
      },
      headerLeftContainerStyle: {
        marginLeft: 5,
      },
      headerTintColor: 'white',
      
    },
  },
  Cart: {
    screen: CartScreen,
    navigationOptions: {
      headerStyle: {
        backgroundColor: cLightBlue,
        elevation: 0,
        shadowOpacity: 0,
        paddingTop: 15,
        headerTintColor: "#FFFFFF"
      },
      headerLeftContainerStyle: {
        marginLeft: 0,
      },
      headerTintColor: 'white',
    },
  },
  Itinerary: {
    screen: ItineraryScreen,
    navigationOptions: {
      title: "Your trip to San Diego",
      headerStyle: {
        backgroundColor: cLightBlue,
        elevation: 0,
        shadowOpacity: 0,
        paddingTop: 15,
        headerTintColor: "#FFFFFF"
      },
      headerLeftContainerStyle: {
        marginLeft: 5,
      },
      headerTintColor: 'white',
    },
  }
});

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {



  render() {
    return <AppContainer persistenceKey={"NavigationKey"} />;
  }
}


const styles = StyleSheet.create({
  textInput: {
    borderRadius: 8,
    backgroundColor: '#F2F2F2',
    height: 75,
    marginBottom: 20,
    fontFamily: "Arial",
    fontSize: 23,
    padding: 20,

  },
  titleHolder: {
    justifyContent: "flex-end",
    marginBottom: 50,
  },
  title: {
    textAlign: 'left',
    fontSize: 35,
    fontFamily: "Arial",
    color: cBlack,
    
   
  },
  welcomeContainer: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
	  backgroundColor: '#FFFFFF',
    flexDirection: 'column',
    padding: 40
  },
  container: {
    flex: 1,
	  backgroundColor: '#FFFFFF',
    flexDirection: 'column',
    padding: 30,
    height: '100%',
  },
  welcomeLogo: {
    width: 130, 
    height: 157,
    marginTop: 100
  },
  welcomeTitle: {
    fontFamily: "Arial",
    fontSize: 34,
    textAlign: 'center',
    fontWeight: 'bold',
    color: "#000000",
    marginTop: Platform.OS === 'ios' ? 50 : 59
  },
	welcomeSubtitle: {
	  fontSize: Platform.OS === 'ios' ? 23 : 25,
	  textAlign: 'center',
    marginTop: 20,
    marginBottom: Platform.OS === 'ios' ? 70 : 90,
    opacity: Platform.OS === 'ios' ? 0.8 : 1,
  },
  emphasisButton: {
    color: cWhite,
    fontSize: 23,
    fontFamily: "Arial",
  },
  standardButton: {
    color: cWhite,
    fontSize: 25,
    fontFamily: "Arial",
    
  },
  buttonNote: {
    textAlign: "center",
    alignItems: "center",
    fontSize: 18,
    color: cBlack,
    marginTop: 8,
    fontFamily: "Arial"
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