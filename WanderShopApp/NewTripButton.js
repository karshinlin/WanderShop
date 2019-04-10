import React, { Component } from 'react';
import {
    View, Platform, TouchableHighlight, Image, Text, StyleSheet } from 'react-native';
import { cDarkBlue, cLightBlue, cWhite } from "./App";

export default class NewTripButton extends Component {
    render () {
        let {onPress, isRipple, rippleColor, children, style} = this.props;
        
        return (
            <View style={this.props.style}>
                <TouchableHighlight style={{borderRadius: 15}}
                    onPress={onPress}
                    underlayColor={cDarkBlue}
                    >
                    <View style={{}}>
                        <View style={styles.wrapper}>
                            <View style={{flex: 0.17}}>
                                <Image source={require('./assets/img/trip_icon.png')} style={styles.tripIcon} />
                            </View>
                            <View style={styles.textHolder}>
                                <Text style={styles.btnTitle}>Start a new trip</Text>
                                <Text style={styles.btnSubtitle}>{Platform.OS === 'ios' ? "Book flights, hotels, events and restaurants in your trip": "Book and track your budget for flights, hotels, events and restaurants in your trip" }</Text>
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
        alignItems: 'center',
        borderRadius:15,
        backgroundColor: "#EDF7FF",
        height: Platform.OS === 'ios' ? "auto" : 130, 
        padding: 20,
        paddingVertical: Platform.OS === 'ios' ? 23 : 20,
        paddingLeft: 17,
        justifyContent: "flex-start",
        borderWidth: 1.5,
        borderColor: "#3EAAFA",
        marginBottom: 5
    },
    tripIcon: {
        height: Platform.OS === 'ios' ? 53 : 65,
        width: Platform.OS === 'ios' ? 53 : 65,
    },
    textHolder: {
        flex: 0.87,
        flexDirection: "column", 
        marginLeft: 25,
      
    },
    btnTitle: {
        fontFamily: "Arial",
        fontSize: Platform.OS === 'ios' ? 20 : 23,
        color: "#3EAAFA",
        fontWeight: "bold"
    },
    btnSubtitle: {
        fontFamily: "Arial",
        fontSize: Platform.OS === 'ios' ? 15 : 16,
        lineHeight: Platform.OS === 'ios' ? 18 : 21,
        marginTop: 3,
        color: "#3F4040",
    }
});