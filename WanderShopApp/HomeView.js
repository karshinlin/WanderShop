import * as React from 'react';
import { Platform, Button, View, ScrollView, Text, StyleSheet, FlatList, TextInput, AsyncStorage, Image } from "react-native";
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
		this.params = this.props.navigation.state.params || {};
		console.log(this.params);
		this.getSample();
	}
	// TODO: REPLACE WITH DATA FROM DATABASE
	async getSample() {
		var sample = await AsyncStorage.getItem('itinerary');
		if (sample !== null) {
			var sampleTrips = [JSON.parse(sample)];
			this.setState({sample: sampleTrips});
		} else { 
			this.setState({sample : []})
		}
	
	}
  	render() {
			var initials = "";
			if (this.params && this.params.name) {
				this.params.name.split(" ").forEach(function(word) {
					console.log(word);
					initials += word.charAt(0);
				})
			}
			global.email = this.params.email;
			console.log()
			
			// let sampleTrips = [{ destination: "Seattle", startDate: "March 3", endDate: "March 6", 
			// 		events: [], food: [], hotels: [], flights: [], numDays: 3, totalCost: 290 },
			// 		{ destination: "Seattle", startDate: "March 3", endDate: "March 6", 
			// 		events: [], food: [], hotels: [], flights: [], numDays: 3, totalCost: 290 }];
			
			return (
				<ScrollView>
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
				<FlatList
        data={this.state ? this.state.sample : []}
        renderItem={({ item }) => (
          <TripCard onPress={() => this.props.navigation.navigate('Itinerary', { showSave: false })} trip={item}></TripCard>
        )}
        keyExtractor={({item: id}) => id}
				onRefresh={this.handleRefresh}
				scrollEnabled={false}
      />
				</View>
					
				</ScrollView>
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