import React, { Component } from "react";
import { View, Platform, Text, FlatList, Image, StyleSheet, Linking, Alert, Button, ScrollView, AsyncStorage } from "react-native";
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
        console.log(flights)
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
    //console.log(this.state.flights)
    return(
      <View style={styles.global}>
        <View style={styles.wrapper}>
          
            <Text style={{color: "#1D71F3", fontWeight: "bold", fontSize: 15, paddingHorizontal: 20}}>May 12 - May 16</Text>
          
          
          {/* <View style={styles.dayHeader}>
            <Text style={{fontWeight: "bold"}}>Tuesday</Text>
          </View> */}
          <View style={styles.elementHolder}>
            <ItineraryFlightElement airport={"JFK"} time={"5:43pm"} date={"May 12"}/>
            <View style={styles.connector}></View>
            <ItineraryHotelElement hotelPic={""} name={"Trump Hotel NYC"} address={"159 5th St NW"}/>
            <View style={styles.connector}></View>
            <ItineraryFoodElement numRestaurants={3}/>
            <SmallElement rating={3} picUrl={""} title={"Moes Grill"} address={"159 5th St NW"}/>
            <SmallElement rating={4} picUrl={""} title={"Moes Grill"} address={"159 5th St NW"}/>
            <SmallElement rating={2} picUrl={""} title={"Moes Grill"} address={"159 5th St NW"}/>
            <ItineraryEventElement numEvents={3}/>
          </View>
          
        </View>
      </View>
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
    padding: 30
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