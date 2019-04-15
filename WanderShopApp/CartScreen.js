import React, { Component } from "react";
import { View, Platform, Text, FlatList, Image, StyleSheet, Linking, Alert, Button, ScrollView, AsyncStorage } from "react-native";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome5";
import StarRating from 'react-native-star-rating';
import FlightCard from "./FlightCard.js";
import HotelCard from "./HotelCard.js";
import EventCard from "./EventCard.js";
import RestaurantCard from "./RestaurantCard.js";
import CartSummaryCard from "./CartSummaryCard.js";

class CartScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
        hotels: null,
        flights: null,
        events: null,
        food: null,
        totalCost: 0,
        checkout: false,
    }
    this.setCheckoutState = this.setCheckoutState.bind(this);
  }

  componentDidMount() {
    this.getCurrentCart();
  }

  setCheckoutState() {
    console.log("New Checkout State");
    this.setState({checkout: true});
  }

  async getCurrentCart() {
    try {
      const value = await AsyncStorage.getItem('currentCart');
      if (value !== null) {
        // We have data!!
        const cart = JSON.parse(value);
        console.log(cart);
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
      await this.getCurrentCart();
    } catch (error) {
      // Error saving data
      console.error(error);
    }
  }

  render() {
    //this.getCurrentCart()
    console.log("Rerender");
    console.log(this.state.checkout);
    if ((this.state.flights && this.state.flights.length > 0) || (this.state.events && this.state.events.length > 0) 
      || (this.state.food && this.state.food.length > 0) || (this.state.hotels && this.state.hotels.length > 0)){
        var showCheckout = this.state.checkout;
        return (
          <View style={{flex: 1}}>
            <View style={{flexDirection: 'column', flex: 0.20}}>
              <CartSummaryCard displayItinerary={this.state.checkout} setCheckoutState={this.setCheckoutState} price={this.state.totalCost} flights={this.state.flights} events={this.state.events} hotels={this.state.hotels} food={this.state.food}/>
            </View>
            <ScrollView style={{ flex: 0.75, backgroundColor: "white" }}>
              <FlatList
                extraData={this.state.checkout}
                scrollEnabled={false}
                data={this.state.flights}
                renderItem={({ item: { id, departDate, returnDate, price, provider, segmentsTo, segmentsBack, bookingUrl } }) => {
                  var diff = segmentsTo[segmentsTo.length-1]["arriveTimeUnix"] - segmentsTo[0]["departTimeUnix"];
                  var hours_diff = Math.floor(diff/3600);
                  var mins_diff = Math.floor((diff % 3600)/60);
                  var durationTo = hours_diff + "h " + mins_diff + "m ";
                  console.log("Render Flatlist item");
                  diff = segmentsBack[segmentsBack.length-1]["arriveTimeUnix"] - segmentsBack[0]["departTimeUnix"];
                  hours_diff = Math.floor(diff/3600);
                  mins_diff = Math.floor((diff % 3600)/60);
                  var durationBack = hours_diff + "h " + mins_diff + "m ";
                  return (
                    <View style={Platform.OS === 'ios' ? {paddingHorizontal: 20} : {}}>
                        <FlightCard 
                          showAdd={false}
                          first_dep_time={segmentsTo[0]["departTime"]}
                          first_dep_airport={segmentsTo[0].originAirportCode}
                          first_duration={durationTo}
                          first_land_time={segmentsTo[segmentsTo.length-1]["arriveTime"]}
                          first_land_airport={segmentsTo[segmentsTo.length-1].destinationAirportCode}
                          aDepartDate={departDate}
                          numStopsTo={segmentsTo.length}
                          bookingUrl={bookingUrl}
                          second_dep_time={segmentsBack[0]["departTime"]}
                          second_dep_airport={segmentsBack[0].originAirportCode}
                          second_duration={durationBack}
                          second_land_time={segmentsBack[segmentsBack.length-1]["arriveTime"]}
                          second_land_airport={segmentsBack[segmentsBack.length-1].destinationAirportCode}
                          aReturnDate={returnDate}
                          numStopsBack={segmentsBack.length}
                          showCheckout={showCheckout}
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
                extraData={this.state.checkout}
                scrollEnabled={false}
                data={this.state.hotels}
                renderItem={({ item: { id, address, bookingLogo, bookingUrl, checkin, checkout, hotelName, hotelPic, phone, price, roomsRemaining, stars } }) => (
                  <HotelCard showAdd={false} showCheckout={showCheckout}
                  rating={stars} name={hotelName} price={price} address={address} id={id} bookingLogo={bookingLogo} bookingUrl={bookingUrl} checkin={checkin} checkout={checkout} hotelPic={hotelPic} roomsRemaining={roomsRemaining} removeAction={() => {
                    this.removeFromCart(id, "hotel");
                    //this.addToCart({category: "hotel", bookingId, address, bookingLogo, bookingUrl, checkin, checkout, hotelName, hotelPic, phone, price, roomsRemaining, stars});
                  }}/>
                )}
                refreshing={this.state.refreshing}
                keyExtractor={({item: id}) => id}
                onRefresh={this.handleRefresh}
              />
              <FlatList
                extraData={this.state.checkout}
                data={this.state.events}
                renderItem={({ item: { name, info, images, id, priceRanges, url, type, place, _embedded: { venues } } }) => (
                  <EventCard showCheckout={showCheckout}
                  showAdd={false} name={name} info={info} sourceURL={images[0].url} bookingUrl={url} price={priceRanges && priceRanges.length > 0 ? `${priceRanges[0].min}` : ''} eventLocation={venues[0].name} removeAction={() => {
                    this.removeFromCart(id, "event");
                    //this.addToCart({ category: "event", name, info, images, id, priceRanges, url, type, place, _embedded: { venues } });
                  }}/>
                )}
                refreshing={this.state.refreshing}
                keyExtractor={({item: id}) => id}
                onRefresh={this.handleRefresh}
              />
              <FlatList
                extraData={this.state.checkout}
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
                      <RestaurantCard showCheckout={this.state.checkout} showAdd={false} name={name} address={address1 + "," + city} rating={rating} sourceURL={photos && photos.length > 0 ? photos[0] : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTOH9vW49J77rJpXQ9wDM5Pgc8b6DOt2-ZuUUVuhEb7WR5IThl"} price={thePrice} removeAction={() => {
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
