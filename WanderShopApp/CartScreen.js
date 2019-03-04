import React, { Component } from "react";
import { View, Text, FlatList, AsyncStorage } from "react-native";

class CartScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
        currentCart: null,
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
        await this.setState({ currentCart: cart });
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

    if (this.state.currentCart){
        console.log(this.state.currentCart);
        return (
        <View style={{ flex: 1, backgroundColor: "#42cef4" }}>
            <FlatList
            data={this.state.currentCart}
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
        </View>
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
