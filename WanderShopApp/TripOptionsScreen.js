import * as React from 'react';
import { Button, View, Text, StyleSheet, TextInput, AsyncStorage, ScrollView } from "react-native";
import CalendarPicker from 'react-native-calendar-picker';

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
		const theWarning = startDate != '' && endDate != '' && origin != '' && dest != '' ? '' : 'Please complete all fields';
		return (
			<View style={styles.container}>
				<View style={{flex:.1}}>
				<Text style={styles.header}>Let's make a new trip!</Text>
				{
					theWarning != "" && 
					<Text styles={styles.warning}>{theWarning}</Text>
				}
				</View>
				<ScrollView style={{flex:.65}}>
					<Text style={styles.normal}>Please select your trip dates:</Text>
					<View style={styles.container}>
						<CalendarPicker
						startFromMonday={true}
						allowRangeSelection={true}
						minDate={minDate}
						maxDate={maxDate}
						todayBackgroundColor="#f2e6ff"
						selectedDayColor="#7300e6"
						selectedDayTextColor="#FFFFFF"
						onDateChange={this.onDateChange}
						/>
				
						<View>
						<Text>SELECTED START DATE:{ startDate }</Text>
						<Text>SELECTED END DATE:{ endDate }</Text>
						</View>

						<TextInput style={styles.input} placeholder="Origin City" onChangeText={(city) => this.setState({originCity: city})}></TextInput>
						<TextInput style={styles.input} placeholder="Destination City" onChangeText={(city) => this.setState({destCity: city})}></TextInput>
					</View>

					<View style={{flex:.4}}>
					<Button title="See Past Trips"></Button>
					<Button title="See Options" onPress={this.onSubmitOptions}/>
					</View>
				</ScrollView>
				<View style={{flex:.10}}></View>
				
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
	  fontSize: 30,
	  textAlign: 'left',
	  margin: 5,
	},
	normal: {
	  fontSize: 20,
	  textAlign: 'left',
	  margin: 10,
	  fontWeight: 'bold',
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
	input: {
		margin: 15,
		height: 40,
		borderColor: '#7a42f4',
		borderWidth: 1
 },
 warning: {
	color: 'red',
	fontSize: 25,
	textAlign: 'left',
	margin: 5,
	fontWeight: 'bold',
	flex: .25,
 }
});