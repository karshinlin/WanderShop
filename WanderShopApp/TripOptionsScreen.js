import * as React from 'react';
import { Button, View, Text, StyleSheet, TextInput, AsyncStorage, ScrollView, Dimensions } from "react-native";
import CalendarPicker from 'react-native-calendar-picker';
import {cRed, cBlack, cWhite, cLightBlue} from "./App"
import StandardButton from './StandardButton';


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
				this.props.navigation.navigate('TripPage', {startDate: this.state.selectedStartDate,
				endDate: this.state.selectedEndDate, origin: this.state.originCity,
				destination: this.state.destCity});
				console.log("navigating");
			}
		else {
			console.log("Fields not complete");
		}
	}

  	render() {
		const { selectedStartDate, selectedEndDate, originCity, destCity} = this.state;
		console.log(this.state);
		const minDate = new Date(); // Today
		const maxDate = new Date(2019, 3, 30);
		const startDate  =  selectedStartDate ? selectedStartDate.toString() : '';
		const endDate = selectedEndDate ? selectedEndDate.toString() : '';
		const origin = originCity ? originCity.toString() : '';
		const dest = destCity ? destCity.toString() : '';
		const theWarning = startDate != '' && endDate != '' && origin != '' && dest != '' ? '' : 'Please complete all fields'; //Please complete all fields
		let warnStyle = theWarning == '' ? 'none' : 'flex';
		//let enableContinue = theWarning == '' ? 0.6 : 1;
		return (
			<View style={styles.container}>
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
					
			</View>
		);
  }
}
 
const styles = StyleSheet.create({
	container: {
	  backgroundColor: 'white',
    flexDirection: 'column',
    padding: 30,
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
    fontSize: 35,
    fontFamily: "Arial",
		color: "black",		
	},
	warning: {
		color: '#3EAAFA',
		fontSize: 21,
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
		height: 340,
		overflow: "hidden"
		
	},
	textInput: {
    borderRadius: 8,
    backgroundColor: '#F2F2F2',
    height: 70,
    marginBottom: 18,
    fontFamily: "Arial",
    fontSize: 23,
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
	
},
});