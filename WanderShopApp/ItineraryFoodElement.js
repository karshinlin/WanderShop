import React, { Component } from 'react';
import {
    View, Platform, TouchableHighlight, Image, Text, StyleSheet } from 'react-native';
import { cDarkBlue, cLightBlue, cWhite } from "./App";

export default class ItineraryFoodElement extends Component {
    render () {
        let {onPress, isRipple, rippleColor, children, style} = this.props;
        
        return (
            <View style={styles.wrapper}>
                <Image source={require('./assets/img/restaurant.png')} style={{height: 30, width: 30,  marginLeft: 10, marginRight: 10 }}/>
                <View style={styles.infoArea}>
                    <Text style={styles.title}>{"Food"}</Text>
                    <Text style={styles.subtitle}>{"You picked these " + this.props.numRestaurants + " restaurants"}</Text>
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10
    },
    infoArea: {
        marginLeft: 10
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