import React, { Component } from 'react';
import {
    View, Platform, TouchableHighlight, Image, Text, StyleSheet } from 'react-native';
import { cDarkBlue, cLightBlue, cWhite } from "./App";

export default class ItineraryFlightElement extends Component {
    render () {
        let {onPress, isRipple, rippleColor, children, style} = this.props;
        
        return (
            <View style={styles.wrapper}>
                <Image source={require('./assets/img/plane.png')} style={{height: 30, width: 30,  marginLeft: 10, marginRight: 10 }}/>
                <View style={styles.infoArea}>
                    <Text style={styles.title}>{"Arrive at " + this.props.airport + " airport"}</Text>
                    <Text style={styles.subtitle}>{this.props.date + " " + this.props.time}</Text>
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