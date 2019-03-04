import React, { Component } from "react";
import { View, Text, FlatList, ActivityIndicator, Button, AsyncStorage } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

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
    return fetch('http://127.0.0.1:5000/hotels/getByCity/')
        .then((response) => response.json())
        .then((response) => {
            this.setState({
                isLoading: false,
                error: false,
                data: response.hotels,
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
        renderItem={({ item: { address, cost, hotelId, hotelName, phoneNumber, rating, website } }) => (
          <View style={{ margin: 15, borderBottomColor: "#000", borderBottomWidth: 2 }}>
            <Text>Hotel Name: {hotelName}</Text>
            <Text>Address: {address}</Text>
            <Text>Phone Number: {phoneNumber}</Text>
            <Text>Website: {website}</Text>
            <Text>Cost: {cost}</Text>
            <Text>Rating: {rating}</Text>
            <Button title={'Add To Cart'} onPress={() => {
              console.log("Hi");
              this.addToCart({type: "hotel", hotelName, hotelId, address, cost, phoneNumber, rating, website});
            }
            }/>
          </View>
        )}
        refreshing={this.state.refreshing}
        keyExtractor={({item: hotelId}) => hotelId}
        onRefresh={this.handleRefresh}
      />
      </View>
    );
  }
}

export default HotelView;
