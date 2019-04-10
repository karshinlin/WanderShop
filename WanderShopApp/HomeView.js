import * as React from 'react';
import { Platform, Button, View, Text, StyleSheet, TextInput, AsyncStorage, Image } from "react-native";
import { cDarkBlue, cLightBlue, cBlack, cWhite } from "./App";
import StandardButton from "./StandardButton"
import NewTripButton from './NewTripButton';
import HotelCard from "./HotelCard";
import RestaurantCard from "./RestaurantCard";
import EventCard from "./EventCard";
import FlightCard from "./FlightCard";
import TripCard from "./TripCard";
//import NewTripButton from './NewTripButton';

export default class HomeView extends React.Component {
	constructor(props) {
    super(props);
		this.params = this.props.navigation.state.params;
		console.log(this.params);
	}
  	render() {
			var initials = "";
			if (this.params.name) {
				this.params.name.split(" ").forEach(function(word) {
					console.log(word);
					initials += word.charAt(0);
				})
			}
			console.log()
			return (
				<View>
				<View style={styles.container}>
				
					<View style={{flexDirection: "row", justifyContent: "space-between",}}>
						<View style={[{height:60}, styles.titleHolder]}>
							<Text style={styles.title}>{this.params.name ? this.params.name : ''}</Text>
						</View>
						<View style={styles.profileIcon}>
							<Text style={styles.profileText}>{initials}</Text>
						</View>
					</View>
					<NewTripButton style={{marginTop: 35}}
							onPress={() => this.props.navigation.navigate('TripOptions')}>
					</NewTripButton>
					<View style={{marginTop: 60}}>
							<Text style={styles.heading}>Your Future Trips</Text>
					</View>
				</View>
				<View style={{paddingHorizontal: Platform.OS === 'ios' ? 0 : 0}}>
					<TripCard></TripCard>
					{/* <FlightCard 
						first_dep_time={"09:05"}
						first_dep_airport={"SFO"}
						first_duration={"4h 25m"}
						first_land_time={"11:07"}
						first_land_airport={"JFK"}
						second_dep_time={"10:20"}
						second_dep_airport={"JFK"}
						second_duration={"5h 05m"}
						second_land_time={"14:07"}
						second_land_airport={"SFO"}
						airline={"Emirates"}
						price={"$1,250"}
						addAction={() => {
							this.addToCart({category: "hotel", hotelName, hotelId, address, cost, phoneNumber, rating, website});
							}}
						onPress={() => {
							this.addToCart({category: "hotel", hotelName, hotelId, address, cost, phoneNumber, rating, website});
							}}>
						</FlightCard> */}
				</View>
					
				</View>
			);
  }
}
 
const styles = StyleSheet.create({
	container: {
	  backgroundColor: 'white',
    flexDirection: 'column',
    padding: 30,
    
  },
	titleHolder: {
    justifyContent: "center",
		alignItems: "center"
  },
  title: {
    textAlign: 'left',
    fontSize: 35,
    fontFamily: "Arial",
		color: "black",
		alignSelf: "center",
		fontWeight: "bold"
		
	},
	heading: {
		textAlign: 'left',
    fontSize: 30,
    fontFamily: "Arial",
		color: "black",
	},
  profileIcon: {
		backgroundColor: "#D4D4D4",
		borderRadius: 30,
		width: Platform.OS === 'ios' ? 50 :60,
		height: Platform.OS === 'ios' ? 50 :60,
		justifyContent: "center",
		alignItems: "center",
		marginTop: Platform.OS === 'ios' ? 5: 0,
	},
	profileText: {
		fontSize: Platform.OS === 'ios' ? 23 :30,
		fontFamily: "Arial",
		marginTop: Platform.OS === 'ios' ? 3 : 0,
	}
});