import React, { Component } from "react";
import { View, Platform, Text, FlatList, Image, StyleSheet, Linking, ScrollView, AsyncStorage } from "react-native";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome5";
import StarRating from 'react-native-star-rating';
import FlightCard from "./FlightCard.js";
import HotelCard from "./HotelCard.js";

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
        <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
            <FlatList
            scrollEnabled={false}
            data={this.state.flights}
            renderItem={({ item: { tripId, departDate, price, provider, segments, bookingUrl } }) => {
          
              var diff = segments[segments.length-1]["arriveTimeUnix"] - segments[0]["departTimeUnix"];
              console.log(segments[0]["departTimeUnix"]);
              var hours_diff = Math.floor(diff/3600);
              var mins_diff = Math.floor((diff % 3600)/60);
              var theDuration = hours_diff + "h " + mins_diff + "m ";
              return (
                <View style={Platform.OS === 'ios' ? {paddingHorizontal: 20} : {}}>
                    <FlightCard 
                      first_dep_time={segments[0]["departTime"]}
                      first_dep_airport={segments[0].originAirportCode}
                      first_duration={theDuration}
                      first_land_time={segments[segments.length-1]["arriveTime"]}
                      first_land_airport={segments[segments.length-1].destinationAirportCode}
                      aDepartDate={departDate}
                      numStops={segments.length + " Stops"}
                      showAdd={"false"}
                      // second_dep_time={"10:20"}
                      // second_dep_airport={"JFK"}
                      // second_duration={"5h 05m"}
                      // second_land_time={"14:07"}
                      // second_land_airport={"SFO"}
                      airline={provider}
                      price={price == "Not Available" ? "" : price}
                      addAction={() => {
                        this.addToCart({category: "flight", tripId, departDate, price, provider, segments, bookingUrl});
                        }}
                      >
                  </FlightCard> 
                </View>
              );
            }}
            refreshing={this.state.refreshing}
            keyExtractor={({item: tripid}) => tripid}
            onRefresh={this.handleRefresh}
        />
        <FlatList
        scrollEnabled={false}
        data={this.state.hotels}
        renderItem={({ item: { bookingId, address, bookingLogo, bookingUrl, checkin, checkout, hotelName, hotelPic, phone, price, roomsRemaining, stars } }) => (
          <View style={{ margin: 15, borderBottomColor: "#000", borderBottomWidth: 2 }}>
              <Text style={styles.centerTitle}>{hotelName}</Text>
              <Text style={styles.miniHeader}>Address: <Text style={styles.regularText}>{address}</Text></Text>
              <Text style={styles.link} onPress={() => { Linking.openURL(`tel:${phone}`); }}>Give Us a Call!</Text>
              <Text style={styles.miniHeader}>Check-In: {checkin}</Text>
              <Text style={styles.miniHeader}>Check-Out: {checkout}</Text>
              <Text style={styles.link} onPress={() => { Linking.openURL(`tel:${bookingUrl}`); }}>Book Now!</Text>
              <Text style={styles.miniHeader}>Cost: {price}</Text>
              <Text style={styles.miniHeader}>Rooms Remaining: <Text style={styles.regularText}>{roomsRemaining}</Text></Text>
            <View style={{ width: "50%"}}>
              <StarRating
                disabled={false}
                fullStarColor={"yellow"}
                maxStars={5}
                rating={stars}
              />
            </View>
          </View>
        )}
        refreshing={this.state.refreshing}
        keyExtractor={({item: bookingId}) => bookingId}
        onRefresh={this.handleRefresh}
      />
        <FlatList
        data={this.state.events}
        renderItem={({ item: { bookingId, address, bookingLogo, bookingUrl, checkin, checkout, hotelName, hotelPic, phone, price, roomsRemaining, stars } }) => (
          <HotelCard rating={stars} name={hotelName} price={price} address={address} bookingId={bookingId} bookingLogo={bookingLogo} bookingUrl={bookingUrl} checkin={checkin} checkout={checkout} hotelPic={hotelPic} roomsRemaining={roomsRemaining} addAction={() => {
            this.addToCart({category: "hotel", bookingId, address, bookingLogo, bookingUrl, checkin, checkout, hotelName, hotelPic, phone, price, roomsRemaining, stars});
          }}/>
        )}
        refreshing={this.state.refreshing}
        keyExtractor={({item: id}) => id}
        onRefresh={this.handleRefresh}
      />
        <FlatList
        scrollEnabled={false}
        data={this.state.food}
        renderItem={({ item: { name, id,
          rating,
          price,
          display_phone,
          url,
          location: {
              address1,
              city,
              state,
              postal_code,
          } } }) => (
          <View style={{ margin: 15, borderBottomColor: "#000", borderBottomWidth: 2 }}>
            <Text style={styles.titleText}>{name}</Text>
            <View style={{ width: "50%"}}>
              <StarRating
                disabled={false}
                fullStarColor={"yellow"}
                maxStars={5}
                rating={rating}
              />
            </View>
            <View style={{ marginTop: 5, marginBottom: 5 }}>
              <Text style={styles.miniHeader}>Address:</Text>
              <Text>{address1}</Text>
              <Text>{city}, {state} {postal_code}</Text>
            </View>
            <Text style={styles.miniHeader}>Price:</Text>
            <View style={{ width: "50%"}}>
              <StarRating
                disabled={false}
                fullStarColor={"yellow"}
                maxStars={4}
                rating={price}
                halfStar={null}
                emptyStar={null}
                fullStar={"dollar"}
                iconSet={"FontAwesome"}
              />
            </View>
            <Text style={styles.link} onPress={() => { Linking.openURL(`tel:${display_phone}`); }}>Give Us a Call!</Text>
            <Text style={styles.link} onPress={() => { Linking.openURL(url); }}>Take a Look!</Text>
          </View>
        )
          }
        refreshing={this.state.refreshing}
        keyExtractor={({item: id}) => id}
        onRefresh={this.handleRefresh}
      />
        </ScrollView>
        );
    }
    return (
        <View style={{ backgroundColor: "white", padding: 20 }} >
            <Text>No Items in Cart</Text>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  baseText: {
    fontFamily: 'Cochin',
  },
  link: {
    textDecorationLine: 'underline',
    color: "#00F",
    marginTop: 5,
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  centerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    alignSelf: "center",
  },
  miniHeader: {
    fontSize: 15,
    fontWeight: "bold",
  },
  regularText: {
    fontSize: 15,
    fontWeight: "normal",
  },
});

export default CartScreen;
