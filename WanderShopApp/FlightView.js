import React, { Component } from "react";
import { View, Platform, Text, TouchableOpacity, FlatList, StyleSheet, Linking, ActivityIndicator, Button, AsyncStorage } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome5";
import './global.js'
import FlightCard from "./FlightCard.js";

class FlightView extends Component {
  constructor(props) {
    super(props);
    this.state = {
        isLoading: true,
        currentCart: null,
        error: false,
        refreshing: false,
        time: 30,
    };
    this.fetchFlights = this.fetchFlights.bind(this);
    this.params = this.props.params;
    this.fetchFlights();
  }
  //flights?origin=ATL&dest=JFK&departDate=2019-09-23
  fetchFlights(){
    var url = global.url + 'flights?origin=' + this.params.origin + "&dest=" + this.params.destination + "&departDate=" + this.params.startDate + '&endDate=' + this.params.endDate;
    console.log(url)
    return fetch(url)
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

  async addToCart(flightObj) {
    await this.getCurrentCart();
    console.log(flightObj);
    if (this.state.currentCart) {
      var currentCart = this.state.currentCart;
      console.log(currentCart);
      var found = false;
      currentCart.forEach(element => {
        if (element.id == flightObj.id) {
          found = true;
        }
      });
      if (!found) {
        currentCart.push(flightObj);
        await this.setState({ currentCart: currentCart });
      }
    } else {
      const currentCart = [flightObj];
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
    // const { navigation } = this.props.navigation;
    // const startDate = navigation.state.getParam('startDate', '03-23-2019');
    // const endDate = navigation.state.getParam('endDate', '03-24-2019');
    // const origin = navigation.state.getParam('origin', 'ATL');
    // const destination = navigation.state.getParam('destination', 'NYC');
    return (
      <View style={{ flex: 1 }}>
        <FlatList
        data={this.state.data}
        renderItem={({ item: { tripId, departDate, returnDate, price, provider, segmentsTo, segmentsBack, bookingUrl } }) => {
          var diff = segmentsTo[segmentsTo.length-1]["arriveTimeUnix"] - segmentsTo[0]["departTimeUnix"];
          var hours_diff = Math.floor(diff/3600);
          var mins_diff = Math.floor((diff % 3600)/60);
          var durationTo = hours_diff + "h " + mins_diff + "m ";
          
          diff = segmentsBack[segmentsBack.length-1]["arriveTimeUnix"] - segmentsBack[0]["departTimeUnix"];
          hours_diff = Math.floor(diff/3600);
          mins_diff = Math.floor((diff % 3600)/60);
          var durationBack = hours_diff + "h " + mins_diff + "m ";
          return (
            <View style={Platform.OS === 'ios' ? {paddingHorizontal: 20} : {}}>
                <FlightCard 
                  showAdd={true}
                  first_dep_time={segmentsTo[0]["departTime"]}
                  first_dep_airport={segmentsTo[0].originAirportCode}
                  first_duration={durationTo}
                  first_land_time={segmentsTo[segmentsTo.length-1]["arriveTime"]}
                  first_land_airport={segmentsTo[segmentsTo.length-1].destinationAirportCode}
                  aDepartDate={departDate}
                  numStopsTo={segmentsTo.length}
                  
                  second_dep_time={segmentsBack[0]["departTime"]}
                  second_dep_airport={segmentsBack[0].originAirportCode}
                  second_duration={durationBack}
                  second_land_time={segmentsBack[segmentsBack.length-1]["arriveTime"]}
                  second_land_airport={segmentsBack[segmentsBack.length-1].destinationAirportCode}
                  aReturnDate={returnDate}
                  numStopsBack={segmentsBack.length}
                  airline={provider}
                  price={price == "Not Available" ? "" : price}
                  addAction={() => {
                    this.addToCart({category: "flight", id: tripId, departDate, returnDate, price, provider, segmentsTo, segmentsBack, bookingUrl});
                    }}
                  >
              </FlightCard> 
            </View>
            
            // <View style={{ margin: 15, borderBottomColor: "#000", borderBottomWidth: 2 }}>
            //   <Text style={styles.centerTitle}>{provider}</Text>
            //   <Text style={styles.miniHeader}>Price: <Text style={styles.regularText}>{price}</Text></Text>
            //   <Text style={styles.miniHeader}>Depart Date: <Text style={styles.regularText}>{departDate}</Text></Text>
            //   <Text style={styles.miniHeader}>Number of Stops: <Text style={styles.regularText}>{segments.length}</Text></Text>
            //   <Text style={styles.link} onPress={() => { Linking.openURL(`tel:${bookingUrl}`); }}>Book Now!</Text>
            //   <View style={{ margin: 15, flex: 1, justifyContent: "center", alignSelf: "center" }}>
            //     <TouchableOpacity onPress={() => {
            //       this.addToCart({category: "flight", tripId, departDate, price, provider, segments, bookingUrl});
            //     }}>
            //       <FontAwesomeIcon size={35} name={"cart-plus"} color={"#000"}/>
            //     </TouchableOpacity>
            //   </View>
            // </View>
          );
        }}
        refreshing={this.state.refreshing}
        keyExtractor={({item: tripid}) => tripid}
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

export default FlightView;
