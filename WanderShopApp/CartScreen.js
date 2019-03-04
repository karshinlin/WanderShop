import React, { Component } from "react";
import { View, Text, FlatList, ScrollView, AsyncStorage } from "react-native";

class CartScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
        hotels: null,
        flights: null,
        events: null,
        food: null,
    }
  }

  componentDidMount() {
    this.getCurrentCart();
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
        cart.forEach(element => {
          if (element.category == "food") {
            food.push(element);
          }
          if (element.category == "hotel") {
            hotels.push(element);
          }
          if (element.category == "flight") {
            flights.push(element);
          }
          if (element.category == "event") {
            events.push(element);
          }
        });
        await this.setState({ flights, events, food, hotels });
        console.log(cart);
      } else {
          console.log("NULLL");
      }
    } catch (error) {
        console.log(error);
      // Error retrieving data
    }
  }

  render() {
    console.log(this.state.food);
    if (this.state.flights || this.state.events || this.state.food || this.state.hotels){
        return (
        <ScrollView style={{ flex: 1, backgroundColor: "#42cef4" }}>
            <FlatList
            scrollEnabled={false}
            data={this.state.flights}
            renderItem={({ item: { flightsNumber, airline, dLoc, aLoc, cost, departure, arrival } }) => (
            <View style={{ margin: 15, borderBottomColor: "#000", borderBottomWidth: 2 }}>
                <Text>Flight Number: {flightsNumber}</Text>
                <Text>Airline: {airline}</Text>
                <Text>Departure Airport: {dLoc}</Text>
                <Text>Arrival Airport: {aLoc}</Text>
                <Text>Price Range: {cost}</Text>
                <Text>Departure Date: {departure}</Text>
                <Text>Arrival Date: {arrival}</Text>
            </View>
            )}
            refreshing={this.state.refreshing}
            keyExtractor={({item: flightsNumber}) => flightsNumber}
            onRefresh={this.handleRefresh}
        />
        <FlatList
        scrollEnabled={false}
        data={this.state.hotels}
        renderItem={({ item: { address, cost, hotelId, hotelName, phoneNumber, rating, website } }) => (
          <View style={{ margin: 15, borderBottomColor: "#000", borderBottomWidth: 2 }}>
            <Text>Hotel Name: {hotelName}</Text>
            <Text>Address: {address}</Text>
            <Text>Phone Number: {phoneNumber}</Text>
            <Text>Website: {website}</Text>
            <Text>Cost: {cost}</Text>
            <Text>Rating: {rating}</Text>
          </View>
        )}
        refreshing={this.state.refreshing}
        keyExtractor={({item: hotelId}) => hotelId}
        onRefresh={this.handleRefresh}
      />
        <FlatList
        scrollEnabled={false}
        data={this.state.events}
        renderItem={({ item: { activityId, activityName, address, cost, date, description } }) => (
          <View style={{ margin: 15, borderBottomColor: "#000", borderBottomWidth: 2 }}>
            <Text>Event: {activityName}</Text>
            <Text>Address: {address}</Text>
            <Text>Date: {date}</Text>
            <Text>Cost: {cost}</Text>
            <Text>Description: {description}</Text>
          </View>
        )}
        refreshing={this.state.refreshing}
        keyExtractor={({item: activityId}) => activityId}
        onRefresh={this.handleRefresh}
      />
        <FlatList
        scrollEnabled={false}
        data={this.state.food}
        renderItem={({ item: { restaurantId, restaurantName, address, phone, type, website, rating } }) => (
          <View style={{ margin: 15, borderBottomColor: "#000", borderBottomWidth: 2 }}>
            <Text>Restaurant: {restaurantName}</Text>
            <Text>Address: {address}</Text>
            <Text>{type}</Text>
            <Text>Rating: {rating}</Text>
            <Text>Website: {website}</Text>
          </View>
        )}
        refreshing={this.state.refreshing}
        keyExtractor={({item: restaurantId}) => restaurantId}
        onRefresh={this.handleRefresh}
      />
        </ScrollView>
        );
    }
    return (
        <View style={{ backgroundColor: "#42cef4" }} >
            <Text>No Items in Cart</Text>
        </View>
    );
  }
}

export default CartScreen;
