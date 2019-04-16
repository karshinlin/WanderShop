import React, { Component } from 'react';
import {
    View, Platform, TouchableHighlight, Image, Text, StyleSheet } from 'react-native';
import { cDarkBlue, cLightBlue, cWhite } from "./App";

export default class TripCard extends Component {
    render () {
        let {onPress, isRipple, rippleColor, children, style, trip} = this.props;
        let { destination, startDate, endDate, events, food, hotels, flights, numDays, totalCost } = trip;
        let eventNum = events.length;
        let foodNum = food.length;
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