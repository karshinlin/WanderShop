import React, { Component } from "react";
import { View, NavigationActions, Platform, Text, FlatList, Image, StyleSheet, Linking, Alert, Button, ScrollView, AsyncStorage } from "react-native";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome5";
import StarRating from 'react-native-star-rating';
import FlightCard from "./FlightCard.js";
import HotelCard from "./HotelCard.js";
import EventCard from "./EventCard.js";
import RestaurantCard from "./RestaurantCard.js";
import ItineraryFlightElement from "./ItineraryFlightElement.js";
import ItineraryHotelElement from "./ItineraryHotelElement.js";
import ItineraryFoodElement from "./ItineraryFoodElement.js";
import SmallElement from "./SmalllElement.js";
import ItineraryEventElement from "./ItineraryEventElement.js";

const cDarkBlue = "#1D71F3";
const cLightBlue = "#3EAAFA";
const cBlack = '#3D3D3D';
const cRed = "#ED6A5A";
const cOrange = "#FAA916";
const cWhite = "#FFFFFF";



class ItineraryScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
        hotels: null,
        flights: null,
        events: null,
        food: null,
        totalCost: 0,
    }
  }
  componentDidMount() {
    this.getCurrentCart()

    //navigation.setParams({title: "Your trip to "})
  }
  async getCurrentCart() {
    try {
      const value = await AsyncStorage.getItem('currentCart');
      if (value !== null) {
        // We have data!!
        const cart = JSON.parse(value);
        var flights = [];
        var events = [];
        var hotels = [];
        var food = [];
        var totalCost = 0;
        cart.forEach(element => {
          if (element.category == "food") {
            food.push(element);
          }
          if (element.category == "hotel") {
            hotels.push(element);
            if (element.price && element.price != '') {
              if (global.numDays > 0) totalCost += global.numDays * parseInt(element.price.substring(1));
              else totalCost += parseInt(element.price.substring(1));
            }
          }
          if (element.category == "flight") {
            flights.push(element);
            if (element.price && element.price != '') {
              totalCost += parseInt(element.price.substring(1))
            }
          }
          if (element.category == "event") {
            events.push(element);
            if (element.price && element.price != '') {
              totalCost += parseInt(element.price.substring(1))
            }
          }
        });
        await this.setState({ flights, events, food, hotels, totalCost });
        console.log("here you go")
        console.log(this.state.flights)
        console.log(this.state.hotels)
        console.log(this.state.food)
        console.log(this.state.events)
        //console.log(cart);
      } else {
          ///console.log("NULLL");
      }
    } catch (error) {
        //console.log(error);
      // Error retrieving data
    }
  }

  render() {
    console.log('hereee')
    console.log(this.state.flights)
    if (this.state.flights != null) {
      firstFlight = this.state.flights[0].segmentsTo;
      arriveTime = firstFlight[firstFlight.length-1].arriveTime;
      arriveAirport = firstFlight[firstFlight.length-1].destinationAirportCode
      
      destCity = firstFlight[firstFlight.length-1].destinationAirportName.city
      

      arriveDate = this.state.flights[0].departDate;
      hotelName = this.state.hotels[0].hotelName
      hotelAddress = this.state.hotels[0].address
      hotelPic = this.state.hotels[0].hotelPic

      secondFlight = this.state.flights[0].segmentsBack;
      leaveTime = secondFlight[secondFlight.length-1].arriveTime;
      leaveAirport = secondFlight[secondFlight.length-1].destinationAirportCode
      leaveDate = this.state.flights[0].returnDate;
      
      
    } else {
      return (<View></View>);
    }

    
    console.log("not done");
    allRestaurants = []
    this.state.food.forEach(function(element) {
      one = <SmallElement rating={element.rating} picUrl={element.photos[0]} title={element.name} address={element.location.address1+element.location.city}/>;
      allRestaurants.push(one)
    });

    allEvents = []
    this.state.events.forEach(function(element) {
      place = element._embedded.venues[0].name
      one = <SmallElement rating={0} picUrl={element.images[0].url} title={element.name} address={place}/>;
      allEvents.push(one)
    });

  
    return(
      <ScrollView style={{backgroundColor: "white"}}>
      <View style={styles.global}>
        <View style={styles.wrapper}>
          
            <Text style={{color: "#1D71F3", fontWeight: "bold", fontSize: 15, paddingHorizontal: 20}}>May 12 - May 16</Text>
          
          
          {/* <View style={styles.dayHeader}>
            <Text style={{fontWeight: "bold"}}>Tuesday</Text>
          </View> */}
          <View style={styles.elementHolder}>
            <ItineraryFlightElement airport={"Arrive at " + arriveAirport + " airport"} time={arriveTime} date={arriveDate}/>
            <View style={styles.connector}></View>
            <ItineraryHotelElement hotelPic={hotelPic} name={hotelName} address={hotelAddress}/>
            <View style={styles.connector}></View>
            <ItineraryFoodElement numRestaurants={allRestaurants.length}/>
            {allRestaurants}
            <ItineraryEventElement numEvents={allEvents.length}/>
            {allEvents}
            <ItineraryFlightElement airport={"Depart from " + leaveAirport + " airport"} time={leaveTime} date={leaveDate}/>
          </View>
          
        </View>
      </View>
      </ScrollView>
    )
  }
  
}
const styles = StyleSheet.create({
  global: {
    backgroundColor: "#3EAAFA",
    width: "100%",
    height: "100%"
  },
  wrapper: {
    backgroundColor: "white",
    borderRadius: 15,
    marginTop: 10,
    paddingVertical: 20,
    height: "100%"

  },
  dayHeader: {
    borderWidth: 1,
    borderColor: "#DDDDDD",
    paddingVertical: 10,
    marginTop: 10,
    paddingHorizontal: 20
  },
  elementHolder: {
    padding: 30,
    paddingTop: 10
  },
  connector: {
    height: 30,
    width: 25,
    borderRightWidth: 1,
    marginVertical: 10,
    borderColor: "#BBBBBB"
  }

});

export default ItineraryScreen;