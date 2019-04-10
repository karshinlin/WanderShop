import React, { Component } from 'react';
import {
    View, Platform, TouchableHighlight, Image, Text, StyleSheet } from 'react-native';
import { cDarkBlue, cLightBlue, cWhite } from "./App";

export default class TripCard extends Component {
    render () {
        let {onPress, isRipple, rippleColor, children, style} = this.props;
        
        return (
            <View style={{}}>
                <TouchableHighlight style={{borderRadius: 15}}
                    onPress={onPress}
                    underlayColor={cDarkBlue}
                    >
                    <View style={{width: "100%", alignItems: "center"}}>
                        <View style={styles.wrapper}>
                            <View style={styles.details}>
                                <Text style={styles.city}>Seattle</Text>
                                <Text style={styles.dates}>March 3 - March 6</Text>
                                <Text style={styles.detail}>3 nights &middot; 1 event &middot; 2 restaurants</Text>
                                

                            </View>   
                            <View style={styles.priceArea}>
                                <Text style={styles.price}>$290</Text>
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