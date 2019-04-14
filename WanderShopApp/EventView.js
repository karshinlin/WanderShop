import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, ActivityIndicator, Button, AsyncStorage } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome5";
import './global.js'
import EventCard from './EventCard';

class EventView extends Component {
  constructor(props) {
    super(props);
    this.state = {
        isLoading: true,
        currentCart: null,
        error: false,
        refreshing: false,
        time: 30,
    };
    this.fetchEvents = this.fetchEvents.bind(this);
    this.params = this.props.params;
    this.fetchEvents();
  }
  //format: /activities/getByCity?dest=JFK&date=2019-08-23
  fetchEvents(){
    var url = global.url + 'activities/getByCity?dest=' + this.params.destination + "&date=" + this.params.startDate;
    return fetch(url)
        .then((response) => response.json())
        .then((response) => {
          console.log(response);
            this.setState({
                isLoading: false,
                error: false,
                data: response.events,
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

  async addToCart(eventObj) {
    await this.getCurrentCart();
    console.log(eventObj);
    if (this.state.currentCart) {
      var currentCart = this.state.currentCart;
      console.log(currentCart);
      currentCart.push(eventObj);
      await this.setState({ currentCart: currentCart });
    } else {
      const currentCart = [eventObj];
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
    console.log(this.state.currentCart);
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
        renderItem={({ item: { name, info, images, id, priceRanges, url, type, place, _embedded: { venues } } }) => (
          <EventCard showAdd={true} name={name} info={info} sourceURL={images[0].url} price={priceRanges && priceRanges.length > 0 ? `${priceRanges[0].min}` : ''} eventLocation={venues[0].name} addAction={() => {
            this.addToCart({ category: "event", name, info, images, id, priceRanges, url, type, place, _embedded: { venues } });
          }}/>
          // <View style={{ margin: 15, borderBottomColor: "#000", borderBottomWidth: 2 }}>
          //   <Image
          //     style={{width: 75, height: 75, alignSelf: "center" }}
          //     source={{uri: images[0].url}}
          //   />
          //   <Text style={styles.centerTitle}>{name}</Text>
              
          //   {venues && venues.length > 0 &&
          //   <View>
          //     <Text style={styles.miniHeader}>Location:</Text>
          //     <Text>{venues[0].name}</Text>
          //     <Text>{venues[0].address.line1}</Text><Text>{venues[0].city.name}, {venues[0].state && <Text>{venues[0].state.stateCode}</Text>} {venues[0].postalCode}</Text>
          //   </View>
          //   }
          //   {!(venues && venues.length < 0) && place && 
          //     <Text>Address: {place.address.line1} {place.city.name}, {place.state && <Text>{place.state.stateCode}</Text>} {place.postalCode}</Text>

          //   }
          //   {priceRanges && priceRanges.length > 0 &&
          //   <Text style={styles.miniHeader}>Cost: ${priceRanges[0].min} - ${priceRanges[0].max}</Text>
          //   }
          //   <Text style={styles.link} onPress={() => { Linking.openURL(url); }}>Take a Look!</Text>
          //   {info && <View><Text style={styles.miniHeader}>Extra Info:</Text><Text>{info}</Text></View>}
          //   <View style={{ margin: 15, flex: 1, justifyContent: "center", alignSelf: "center" }}>
          //     <TouchableOpacity onPress={() => {
          //       this.addToCart({ category: "event", name, info, images, id, priceRanges, url, type, place, _embedded: { venues } });
          //     }}>
          //       <FontAwesomeIcon size={35} name={"cart-plus"} color={"#000"}/>
          //     </TouchableOpacity>
          //   </View>
          // </View>
        )}
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
  }
});

export default EventView;
