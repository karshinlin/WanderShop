import * as React from 'react';
import { Button, View, Text, StyleSheet, TextInput, AsyncStorage } from "react-native";
import CalendarPicker from 'react-native-calendar-picker';

export default class TripOptionsScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		  selectedStartDate: null,
		  selectedEndDate: null,
		};
		this.onDateChange = this.onDateChange.bind(this);
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

  	render() {
		const { selectedStartDate, selectedEndDate } = this.state;
		const minDate = new Date(); // Today
		const maxDate = new Date(2019, 3, 30);
		const startDate  =  selectedStartDate ? selectedStartDate.toString() : '';
		const endDate = selectedEndDate ? selectedEndDate.toString() : '';
		return (
			<View style={styles.container}>
				<View style={{flex:.05}}></View>
				<View style={{flex:.2}}>
				<Text style={styles.header}>Let's make a new trip!</Text>
				<Text style={styles.normal}>Please select your trip dates:</Text>
				</View>
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
			
					{/* <View>
					<Text>SELECTED START DATE:{ startDate }</Text>
					<Text>SELECTED END DATE:{ endDate }</Text>
					</View> */}
				</View>

				<View style={{flex:.4}}>
				<Button title="See Past Trips"></Button>
				<Button title="See Options" onPress={()=> this.props.navigation.navigate('TripPage')}/>
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
	  fontSize: 30,
	  textAlign: 'left',
	  margin: 10,
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
});