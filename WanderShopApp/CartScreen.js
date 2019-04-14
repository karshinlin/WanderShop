import React, { Component } from "react";
import { View, Platform, Text, FlatList, Image, StyleSheet, Linking, Alert, Button, ScrollView, AsyncStorage } from "react-native";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome5";
import StarRating from 'react-native-star-rating';
import FlightCard from "./FlightCard.js";
import HotelCard from "./HotelCard.js";
import EventCard from "./EventCard.js";
import RestaurantCard from "./RestaurantCard.js";

class CartScreen extends Component {
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
        var totalCost = 0;
        cart.forEach(element => {
          if (element.category == "food") {
            food.push(element);
          }
          if (element.category == "hotel") {
            hotels.push(element);
            if (element.price || element.price != '') {
              totalCost += parseInt(element.price.substring(1))
            }
          }
          if (element.category == "flight") {
            flights.push(element);
            if (element.price || element.price != '') {
              totalCost += parseInt(element.price.substring(1))
            }
          }
          if (element.category == "event") {
            events.push(element);
            if (element.price || element.price != '') {
              totalCost += parseInt(element.price.substring(1))
            }
          }
        });
        await this.setState({ flights, events, food, hotels, totalCost });
        console.log(cart);
      } else {
          console.log("NULLL");
      }
    } catch (error) {
        console.log(error);
      // Error retrieving data
    }
  }

  async removeFromCart(id, category) {
    var flights = this.state.flights;
    var hotels = this.state.hotels;
    var food = this.state.food;
    var events = this.state.events;

    switch(category) {
      case "flight":
        for (var i = 0; i < flights.length; i++) {
          if (flights[i].id == id) {
            flights.splice(i, 1);
            break;
          }
        }
        break;
      case "hotel":
        for (var i = 0; i < hotels.length; i++) {
          if (hotels[i].id == id) {
            hotels.splice(i, 1);
            break;
          }
        }
        break;
      case "food":
        for (var i = 0; i < food.length; i++) {
          if (food[i].id == id) {
            food.splice(i, 1);
            break;
          }
        }
        break;
      case "event":
        for (var i = 0; i < events.length; i++) {
          if (events[i].id == id) {
            events.splice(i, 1);
            break;
          }
        }
        break;
    }
    try {
      await AsyncStorage.setItem('currentCart', JSON.stringify(flights.concat(hotels, food, events)));
      //await this.getCurrentCart();
    } catch (error) {
      // Error saving data
      console.error(error);
    }
  }
  checkoutFunction() {
    
  }

  render() {
    this.getCurrentCart()
    if ((this.state.flights && this.state.flights.length > 0) || (this.state.events && this.state.events.length > 0) 
      || (this.state.food && this.state.food.length > 0) || (this.state.hotels && this.state.hotels.length > 0)){
        
        return (
          <View style={{flex: 1}}>
            <View style={{flexDirection: 'row', flex: 0.1}}>
              <Text style={[{flex: 0.5, alignContent: 'center', justifyContent: 'center'},  styles.titleText]}>
                {'$' + this.state.totalCost}
              </Text>
              <Button
                style={{flex: 0.5}}
                onPress={() => this.checkoutFunction()}
                title="Checkout"
              />
            </View>
            <ScrollView style={{ flex: 0.9, backgroundColor: "white" }}>
              <FlatList
                scrollEnabled={false}
                data={this.state.flights}
                renderItem={({ item: { id, departDate, price, provider, segments, bookingUrl } }) => {
                  var diff = segments[segments.length-1]["arriveTimeUnix"] - segments[0]["departTimeUnix"];
                  console.log(segments[0]["departTimeUnix"]);
                  var hours_diff = Math.floor(diff/3600);
                  var mins_diff = Math.floor((diff % 3600)/60);
                  var theDuration = hours_diff + "h " + mins_diff + "m ";
                  return (
                    <View style={Platform.OS === 'ios' ? {paddingHorizontal: 20} : {}}>
                        <FlightCard 
                          showAdd={false}
                          first_dep_time={segments[0]["departTime"]}
                          first_dep_airport={segments[0].originAirportCode}
                          first_duration={theDuration}
                          first_land_time={segments[segments.length-1]["arriveTime"]}
                          first_land_airport={segments[segments.length-1].destinationAirportCode}
                          aDepartDate={departDate}
                          numStops={segments.length + " Stops"}
                          // second_dep_time={"10:20"}
                          // second_dep_airport={"JFK"}
                          // second_duration={"5h 05m"}
                          // second_land_time={"14:07"}
                          // second_land_airport={"SFO"}
                          airline={provider}
                          price={price == "Not Available" ? "" : price}
                          removeAction={() => {
                            this.removeFromCart(id, "flight");
                            //this.addToCart({category: "flight", tripId, departDate, price, provider, segments, bookingUrl});
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
                renderItem={({ item: { id, address, bookingLogo, bookingUrl, checkin, checkout, hotelName, hotelPic, phone, price, roomsRemaining, stars } }) => (
                  <HotelCard showAdd={false} rating={stars} name={hotelName} price={price} address={address} id={id} bookingLogo={bookingLogo} bookingUrl={bookingUrl} checkin={checkin} checkout={checkout} hotelPic={hotelPic} roomsRemaining={roomsRemaining} removeAction={() => {
                    this.removeFromCart(id, "hotel");
                    //this.addToCart({category: "hotel", bookingId, address, bookingLogo, bookingUrl, checkin, checkout, hotelName, hotelPic, phone, price, roomsRemaining, stars});
                  }}/>
                )}
                refreshing={this.state.refreshing}
                keyExtractor={({item: id}) => id}
                onRefresh={this.handleRefresh}
              />
              <FlatList
                data={this.state.events}
                renderItem={({ item: { name, info, images, id, priceRanges, url, type, place, _embedded: { venues } } }) => (
                  <EventCard showAdd={false} name={name} info={info} sourceURL={images[0].url} price={priceRanges && priceRanges.length > 0 ? `${priceRanges[0].min}` : ''} eventLocation={venues[0].name} removeAction={() => {
                    this.removeFromCart(id, "event");
                    //this.addToCart({ category: "event", name, info, images, id, priceRanges, url, type, place, _embedded: { venues } });
                  }}/>
                )}
                refreshing={this.state.refreshing}
                keyExtractor={({item: id}) => id}
                onRefresh={this.handleRefresh}
              />
              <FlatList
                scrollEnabled={false}
                data={this.state.food}
                renderItem={({ item: { name, id, rating, price, display_phone, url, photos, location: {address1, city, state, postal_code,
                  }}}) => {
                    var thePrice = 0;
                    if (price == "$") {
                      thePrice = 1;
                    } else if (price == "$$") {
                      thePrice = 2;
                    } else if (price == "$$$") {
                      thePrice = 3;
                    } else {
                      thePrice = 4;
                    }
                    return (
                      <RestaurantCard showAdd={false} name={name} address={address1 + "," + city} rating={rating} sourceURL={photos && photos.length > 0 ? photos[0] : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTOH9vW49J77rJpXQ9wDM5Pgc8b6DOt2-ZuUUVuhEb7WR5IThl"} price={thePrice} removeAction={() => {
                        this.removeFromCart(id, "food");
                        //this.addToCart({ category: "food", name, id, rating, price, display_phone, url, photos, location: {address1, city, state, postal_code}});
                      }} />
                    );
                  }
                }
                refreshing={this.state.refreshing}
                keyExtractor={({item: id}) => id}
                onRefresh={this.handleRefresh}
              />
            </ScrollView>
          </View>
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
