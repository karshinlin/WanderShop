import React, { Component } from "react";
import { View, Text, FlatList, Image, StyleSheet, ScrollView, AsyncStorage } from "react-native";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome5";
import StarRating from 'react-native-star-rating';

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
            renderItem={({ item: { tripid, cheapestProviderName, displayLowTotal, fareFamily, legs } }) => (
              <View style={{ margin: 15, borderBottomColor: "#000", borderBottomWidth: 2 }}>
                <Text>Airline: {cheapestProviderName}</Text>
                <Text>Price: {displayLowTotal}</Text>
                <Text>Cabin Type: {fareFamily.displayName}</Text>
                <Text>Number of Stops: {Object.keys(legs[0].segments).length}</Text>
              </View>
            )}
            refreshing={this.state.refreshing}
            keyExtractor={({item: tripid}) => tripid}
            onRefresh={this.handleRefresh}
        />
        <FlatList
        scrollEnabled={false}
        data={this.state.hotels}
        renderItem={({ item: { displayaddress, brand, cheapestProvider, stars, userrating, phone } }) => (
          <View style={{ margin: 15, borderBottomColor: "#000", borderBottomWidth: 2 }}>
            <Text>Hotel Name: {brand}</Text>
            <Text>Address: {displayaddress}</Text>
            <Text>Phone Number: {phone}</Text>
            <Text>Cost: {cheapestProvider.displayprice}</Text>
            <Text>Rooms Remaining: {cheapestProvider.roomsRemaining}</Text>
            <Text>Stars: {stars}</Text>
            <Text>User Rating: {userrating}</Text>
          </View>
        )}
        refreshing={this.state.refreshing}
        keyExtractor={({item: hotelId}) => hotelId}
        onRefresh={this.handleRefresh}
      />
        <FlatList
        data={this.state.events}
        renderItem={({ item: { name, info, images, id, priceRanges, url, type, place, _embedded: { venues } } }) => (
          <View style={{ margin: 15, borderBottomColor: "#000", borderBottomWidth: 2 }}>
            <Image
              style={{width: 75, height: 75, alignSelf: "center" }}
              source={{uri: images[0].url}}
            />
            <Text style={styles.centerTitle}>{name}</Text>
              
            {venues && venues.length > 0 &&
            <View>
              <Text style={styles.miniHeader}>Location:</Text>
              <Text>{venues[0].name}</Text>
              <Text>{venues[0].address.line1}</Text><Text>{venues[0].city.name}, {venues[0].state && <Text>{venues[0].state.stateCode}</Text>} {venues[0].postalCode}</Text>
            </View>
            }
            {!(venues && venues.length < 0) && place && 
              <Text>Address: {place.address.line1} {place.city.name}, {place.state && <Text>{place.state.stateCode}</Text>} {place.postalCode}</Text>

            }
            {priceRanges && priceRanges.length > 0 &&
            <Text style={styles.miniHeader}>Cost: ${priceRanges[0].min} - ${priceRanges[0].max}</Text>
            }
            <Text style={styles.link} onPress={() => { Linking.openURL(url); }}>Take a Look!</Text>
            {info && <View><Text style={styles.miniHeader}>Extra Info:</Text><Text>{info}</Text></View>}
          </View>
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
        <View style={{ backgroundColor: "#42cef4" }} >
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
  }
});

export default CartScreen;
