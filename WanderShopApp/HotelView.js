import React, { Component } from "react";
import { View, Text, FlatList, TouchableOpacity, Linking, StyleSheet, ActivityIndicator, Button, AsyncStorage } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import StarRating from 'react-native-star-rating'; 
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome5";

import './global.js'
import HotelCard from "./HotelCard.js";

class HotelView extends Component {
  constructor(props) {
    super(props);
    this.state = {
        isLoading: true,
        currentCart: null,
        error: false,
        refreshing: false,
        time: 30,
    };
    this.fetchHotels();
  }

  fetchHotels(){
    return fetch(global.url + 'hotels')
        .then((response) => response.json())
        .then((response) => {
            this.setState({
                isLoading: false,
                error: false,
                data: response,
                refreshing: false,
                time: 30,
            }, function () {

            });
        })
        .catch((error) => {
            this.setState({
                isLoading: false,
                error: true
            })
        });
    }
    componentDidMount() {
        this.getCurrentCart();
        this.setState({ isLoading: false });
    }

    async getCurrentCart() {
      try {
        const value = await AsyncStorage.getItem('currentCart');
        if (value !== null) {
          // We have data!!
          const cart = JSON.parse(value);
          await this.setState({ currentCart: cart });
          console.log(cart);
        }
      } catch (error) {
        // Error retrieving data
      }
    }

  async addToCart(hotelObj) {
    await this.getCurrentCart();
    console.log(hotelObj);
    if (this.state.currentCart) {
      var currentCart = this.state.currentCart;
      console.log(currentCart);
      currentCart.push(hotelObj);
      await this.setState({ currentCart: currentCart });
    } else {
      const currentCart = [hotelObj];
      console.log(currentCart);
      await this.setState({ currentCart: currentCart });
    }
    await this.saveCartLocally();
  }

  async saveCartLocally() {
    try {
      console.log(this.state.currentCart);
      await AsyncStorage.setItem('currentCart', JSON.stringify(this.state.currentCart));
      await this.getCurrentCart();
    } catch (error) {
      // Error saving data
      console.error(error);
    }
  }

  render() {
    if (this.state.error) {
        return (
            <View style={{ flex: 1, paddingTop: 25, alignSelf: "center" }}>
                <Icon name="error" size={75} color="#F00" />
                <Text style={{ alignSelf: "center", color: "#F00" }}>Error</Text>
            </View>
            );
    }
    if (this.state.isLoading) {
        return (
            <View style={{ flex: 1, paddingTop: 25 }}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }
    return (
      
      <View style={{ flex: 1 }}>
        <FlatList
        data={this.state.data}
        renderItem={({ item: { bookingId, address, bookingLogo, bookingUrl, checkin, checkout, hotelName, hotelPic, phone, price, roomsRemaining, stars } }) => (
          <HotelCard rating={stars} name={hotelName} price={price} address={address} bookingId={bookingId} bookingLogo={bookingLogo} bookingUrl={bookingUrl} checkin={checkin} checkout={checkout} hotelPic={hotelPic} roomsRemaining={roomsRemaining} addAction={() => {
            this.addToCart({category: "hotel", bookingId, address, bookingLogo, bookingUrl, checkin, checkout, hotelName, hotelPic, phone, price, roomsRemaining, stars});
          }}/>
          // <View style={{ margin: 15, borderBottomColor: "#000", borderBottomWidth: 2 }}>
          //   <Text style={styles.centerTitle}>{}</Text>
          //   <Text style={styles.miniHeader}>Address: <Text style={styles.regularText}>{displayaddress}</Text></Text>
          //   <Text style={styles.link} onPress={() => { Linking.openURL(`tel:${phone}`); }}>Give Us a Call!</Text>
          //   <Text style={styles.miniHeader}>Cost: {cheapestProvider.displayprice}</Text>
          //   <Text style={styles.miniHeader}>Rooms Remaining: <Text style={styles.regularText}>{cheapestProvider.roomsRemaining}</Text></Text>
          //   <View style={{ width: "50%"}}>
          //     <StarRating
          //       disabled={false}
          //       fullStarColor={"yellow"}
          //       maxStars={5}
          //       rating={stars}
          //     />
          //   </View>
          //   <View style={{ margin: 15, flex: 1, justifyContent: "center", alignSelf: "center" }}>
          //     <TouchableOpacity onPress={() => {
          //       this.addToCart({category: "hotel", displayaddress, brand, cheapestProvider, cheapestProviderName, stars, userrating, phone});
          //     }}>
          //       <FontAwesomeIcon size={35} name={"cart-plus"} color={"#000"}/>
          //     </TouchableOpacity>
          //   </View>
          // </View>
        )}
        refreshing={this.state.refreshing}
        keyExtractor={({item: displayaddress}) => displayaddress}
        onRefresh={this.handleRefresh}
      />
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
    marginBottom: 5,
  },
  centerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    alignSelf: "center",
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
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

export default HotelView;
