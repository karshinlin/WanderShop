import React, { Component } from 'react';
import {
    View, Platform, TouchableHighlight, Image, Text, StyleSheet } from 'react-native';
import { cDarkBlue, cLightBlue, cWhite } from "./App";

export default class ItineraryHotelElement extends Component {
    render () {
        let {onPress, isRipple, rippleColor, children, style} = this.props;
        
        return (
            <View style={styles.wrapper}>
                <Image source={require('./assets/img/hero_hotel.jpg')} style={{height: 50, width: 50, borderRadius: 10, }}/>
                <View style={styles.infoArea}>
                    <Text style={styles.title}>{"Check-in at " + this.props.name}</Text>
                    <Text style={styles.subtitle}>{this.props.address}</Text>
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: "row",
        alignItems: "center"
    },
    infoArea: {
        marginLeft: 20
    },
    title: {
        fontSize: 17,
        fontWeight: "bold"
    },
    subtitle: {
        fontSize: 14,
        opacity: 0.7,
        marginTop: 2
    }
});