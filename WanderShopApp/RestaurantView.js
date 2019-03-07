import React, { Component } from "react";
import { View, Text, Linking, TouchableOpacity, FlatList, StyleSheet, ActivityIndicator, Button, AsyncStorage } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome5";
import StarRating from 'react-native-star-rating'; 

class RestaurantView extends Component {
  constructor(props) {
    super(props);
    this.state = {
        isLoading: true,
        currentCart: null,
        error: false,
        refreshing: false,
        time: 30,
    };
    this.fetchRestaurants();
  }

  fetchRestaurants(){
    return fetch('http://127.0.0.1:5000/restaurants/getByCity/')
        .then((response) => response.json())
        .then((response) => {
            this.setState({
                isLoading: false,
                error: false,
                data: response.business,
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

  async addToCart(restaurantObj) {
    await this.getCurrentCart();
    console.log(restaurantObj);
    if (this.state.currentCart) {
      var currentCart = this.state.currentCart;
      console.log(currentCart);
      currentCart.push(restaurantObj);
      await this.setState({ currentCart: currentCart });
    } else {
      const currentCart = [restaurantObj];
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
          } } }) => {
            if (price == "$") {
              price = 1;
            } else if (price == "$$") {
              price = 2;
            } else if (price == "$$$") {
              price = 3;
            } else {
              price = 4;
            }
            return (
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
            <View style={{ margin: 15, flex: 1, justifyContent: "center", alignSelf: "center" }}>
              <TouchableOpacity onPress={() => {
                this.addToCart({ category: "food", name, id,
                rating,
                price,
                display_phone,
                url,
                location: {
                    address1,
                    city,
                    state,
                    postal_code,
                }});
              }}>
                <FontAwesomeIcon size={35} name={"cart-plus"} color={"#000"}/>
              </TouchableOpacity>
            </View>
          </View>
        );
      }
          }
        refreshing={this.state.refreshing}
        keyExtractor={({item: id}) => id}
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
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  miniHeader: {
    fontSize: 15,
    fontWeight: "bold",
  }
});

export default RestaurantView;
