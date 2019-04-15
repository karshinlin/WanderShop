import * as React from 'react';
import { Button, Platform, View, Text, StyleSheet, KeyboardAvoidingView, TextInput, AsyncStorage, ScrollView, Dimensions } from "react-native";
import CalendarPicker from 'react-native-calendar-picker';
import {cRed, cBlack, cWhite, cLightBlue} from "./App"
import StandardButton from './StandardButton';
import AppNavigator from './App.js';
import moment from "moment";

export default class TripOptionsScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		  selectedStartDate: null,
			selectedEndDate: null,
			originCity: null,
			destCity: null,
		};
		this.onDateChange = this.onDateChange.bind(this);
		this.onSubmitOptions = this.onSubmitOptions.bind(this);
	}

	onDateChange(date, type) {
		if (type === 'END_DATE') {
		  this.setState({
			selectedEndDate: date,
		  });
		} else {
		  this.setState({
			selectedStartDate: date,
			selectedEndDate: null,
		  });
		}
	}

	onSubmitOptions() {
		console.log(this.state);
		if (this.state.selectedStartDate != null && 
			this.state.selectedEndDate != null &&
			this.state.originCity != null && 
			this.state.destCity != null) {
				var start = this.state.selectedStartDate.format("YYYY-MM-DD");
				var end = this.state.selectedEndDate.format("YYYY-MM-DD");
				global.destination = this.state.destCity;
				global.origin = this.state.originCity;
				global.startDate = start.toString();
				global.endDate = end.toString();
				global.numDays = moment(end).diff(start, 'days');
				console.log(global.numDays); 
				this.props.navigation.navigate('TripPage', {startDate: start.toString(),
				endDate: end.toString(), origin: this.state.originCity,
				destination: this.state.destCity});
				console.log("navigating");
			}
		else {
			console.log("Fields not complete");
		}
	}

  	render() {
			AsyncStorage.removeItem('currentCart');
			const { selectedStartDate, selectedEndDate, originCity, destCity} = this.state;
			console.log(this.state);
			const minDate = new Date(); // Today
			const maxDate = new Date(2019, 12, 30);
			const startDate  =  selectedStartDate ? selectedStartDate.toString() : '';
			const endDate = selectedEndDate ? selectedEndDate.toString() : '';
			const origin = originCity ? originCity.toString() : '';
			const dest = destCity ? destCity.toString() : '';
			const theWarning = startDate != '' && endDate != '' && origin != '' && dest != '' ? '' : 'Please complete all fields'; //Please complete all fields
			let warnStyle = theWarning == '' ? 'none' : 'flex';
			//let enableContinue = theWarning == '' ? 0.6 : 1;
			return (
				<KeyboardAvoidingView style={styles.container} enabled behavior={'position'}>
					<View style={[{height: "auto"}, styles.titleHolder]}>
							<Text style={styles.title}>Start your trip </Text>
							<Text style={[styles.warning, {display: warnStyle}]}>{theWarning}</Text>
					</View>

					
					
						{/* <Text style={styles.normal}>Please select your trip dates:</Text> */}
						<View style={styles.calendarContainer}>
							<CalendarPicker style={{}}
							startFromMonday={true}
							allowRangeSelection={true}
							minDate={minDate}
							maxDate={maxDate}
							todayBackgroundColor="#1D71F3"
							selectedDayColor="#FAA916"
							selectedDayTextColor="white"
							onDateChange={this.onDateChange}
							width={Dimensions.get("window").width-60}
							
							/>
							</View>
					
							<View>
							{/* <Text>SELECTED START DATE:{ startDate }</Text> */}
							{/* <Text>SELECTED END DATE:{ endDate }</Text> */}
							</View>

							<View style={{}}>
								<TextInput
									style={styles.textInput}
									placeholder="Origin"
									onChangeText={(city) => this.setState({originCity: city})}>
								</TextInput>
								<TextInput
									style={styles.textInput}
									placeholder="Destination"
									onChangeText={(city) => this.setState({destCity: city})}>
								</TextInput>
							</View>

							<StandardButton style={{opacity: theWarning == '' ? 1 : 0.6}}
							onPress={this.onSubmitOptions}>
								<Text style={styles.standardButton}> Continue</Text>
						</StandardButton>
				</KeyboardAvoidingView>
			);
  	}
}
 
const styles = StyleSheet.create({
	container: {
	  backgroundColor: 'white',
		flexDirection: 'column',
		flex: 1,
		paddingLeft: 30,
		paddingRight: 30,
		height: '100%',
		paddingTop: 20
	},
	titleHolder: {
    justifyContent: "center",
		alignItems: "flex-start",
		height: 100
  },
  title: {
    textAlign: 'left',
    fontSize: Platform.OS === 'ios' ? 32 : 35,
    fontFamily: "Arial",
		color: "black",		
		fontWeight: Platform.OS === 'ios' ? 'bold' : 'regular',
	},
	warning: {
		color: '#3EAAFA',
		fontSize: Platform.OS === 'ios' ? 18 : 21,
		textAlign: 'left',
		marginTop: 7,
		marginBottom: 7,

		fontFamily: "Arial"
	 },
	calendarContainer: {
		borderRadius: 8,
		backgroundColor: '#F2F2F2',
		marginBottom: 18,
		fontFamily: "Arial",
		fontSize: 23,
		height: Platform.OS === 'ios' ? 280 : 340,
		overflow: "hidden"
		
	},
	textInput: {
    borderRadius: 8,
    backgroundColor: '#F2F2F2',
    height: Platform.OS === 'ios' ? 60 : 70,
    marginBottom: Platform.OS === 'ios' ? 13 : 18,
    fontFamily: "Arial",
    fontSize: Platform.OS === 'ios' ? 20 : 23,
    padding: 19,

  },
	background: {
	  backgroundColor: '#42cef4',
		flex: 1,
		
	},
	input: {
		margin: 15,
		height: 40,
		borderColor: '#7a42f4',
		borderWidth: 1
 },

 standardButton: {
	color: "#FFFFFF",
	fontSize: 25,
	fontFamily: "Arial",
	fontWeight: 'bold'
	
},
});