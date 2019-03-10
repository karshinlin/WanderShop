import * as React from 'react';
import { Button, View, Text, StyleSheet, TextInput, AsyncStorage } from "react-native";

export default class HomeView extends React.Component {
  	render() {
		return (
			<View style={styles.container}>
				<View style={{flex:.05}}></View>
				<View style={{flex:.2}}>
				<Text style={styles.header}>Current Trips</Text>
				<Text style={styles.normal}>Here are your planned trips: </Text>
				</View>
				<View style={{flex:.4}}>
				<Button title="See Past Trips"></Button>
				<Button title="Plan New Trip" onPress={() => this.props.navigation.navigate('TripOptions')}/>
				</View>
			</View>
		);
  }
}
 
const styles = StyleSheet.create({
	container: {
	  flex: 1,
	  justifyContent: 'flex-start',
	  backgroundColor: '#42cef4',
	  flexDirection: 'column'
	},
	header: {
	  fontSize: 40,
	  textAlign: 'left',
	  margin: 10,
	},
	normal: {
	  fontSize: 20,
	  textAlign: 'left',
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