import React, { Component } from 'react';
import {
    View, Platform, TouchableHighlight, Image, Text, StyleSheet } from 'react-native';
import { cDarkBlue, cLightBlue, cWhite } from "./App";
import moment from "moment";

export default class TripCard extends Component {
    constructor(props) {
        super(props);
        this.processCart.bind(this);
    }
    processCart(cart) {
        if (cart !== null) {
            // We have data!!
            //const cart = JSON.parse(acart);
            // console.log(cart);
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
            var retVal = [ flights, events, food, hotels ];
            // console.log(retVal);
            return retVal;
          } else {
              console.log("NULLL");
              return null;
          }
    }
    render () {
        console.log(this.props);
        let {onPress, isRipple, rippleColor, children, style, trip} = this.props;
        // tripInfo format: [origin, destination, startDate, endDate, price]
        console.log(trip);
        let {tripInfo, cart } = JSON.parse(trip);
        let destination = tripInfo[1];
        let totalCost = tripInfo[4];
        let numDays = moment(tripInfo[3]).diff(tripInfo[2], 'days');
        let details = this.processCart(cart);

        //let { destination, startDate, endDate, events, food, hotels, flights, numDays, totalCost } = trip;
        let eventNum = details[1].length;
        let foodNum = details[2].length;
        return (
            <View style={{}}>
                <TouchableHighlight style={{borderRadius: 15}}
                    onPress={onPress}
                    underlayColor={cDarkBlue}
                    >
                    <View style={{width: "100%", alignItems: "center"}}>
                        <View style={styles.wrapper}>
                            <View style={styles.details}>
                                <Text style={styles.city}>{destination}</Text>
                                <Text style={styles.dates}>{startDate} - {endDate}</Text>
                                <Text style={styles.detail}>{numDays} {numDays != 1 ? 'nights' : 'night'} &middot; {eventNum} {eventNum != 1 ? 'events' : 'event'} &middot; {foodNum} {foodNum != 1 ? 'restaurants' : 'restaurant'}</Text>
                            </View>   
                            <View style={styles.priceArea}>
                                <Text style={styles.price}>${totalCost}</Text>
                            </View>                  
                        </View>
                    </View>
                    
                </TouchableHighlight>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: "row", 
        alignItems: 'flex-start',
        borderRadius:15,
        backgroundColor: "#F1F1F1", 
        paddingHorizontal: Platform.OS === 'ios' ? 20 : 29,
        paddingVertical: 20,
        justifyContent: "space-between",
        marginBottom: 15,
        width: Platform.OS === 'ios' ? 320 : 410
    },
    city: {
        fontFamily: "Arial",
        color: "black",
        fontSize: Platform.OS === 'ios' ? 23 : 25
    },
    detail: {
        fontFamily: "Arial",
        fontSize: Platform.OS === 'ios' ? 16 : 18,
        color: "black",
        opacity: 0.6
    },
    details: {
        flexDirection: "column",       
    },
    dates: {
        marginBottom: 2,
        fontSize: Platform.OS === 'ios' ? 16 : 18,
        fontFamily: "Arial",
        color: "#3EAAFA"
    },
    priceArea: {
        justifyContent: "flex-start",
        alignItems: "flex-start",
        
    },
    price: {
        fontFamily: "Arial",
        fontSize: Platform.OS === 'ios' ? 24 : 26,
        color: "black",
        
    }
});