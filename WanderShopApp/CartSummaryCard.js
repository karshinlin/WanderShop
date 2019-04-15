import React, { Component } from 'react';
import {
    View, Platform, TouchableHighlight, Alert, Button, Text, StyleSheet } from 'react-native';
import { withNavigation } from 'react-navigation';

import { cDarkBlue, cLightBlue, cWhite } from "./App";

const wrapperWidth = 410;

class CartSummaryCard extends Component {
    constructor(props) {
        super(props);
    }

    checkoutFunction() {
        var flights = this.props.flights ? this.props.flights : [];
        var hotels = this.props.hotels ? this.props.hotels : [];
        var food = this.props.food ? this.props.food : [];
        var events = this.props.events ? this.props.events : [];
        if (flights.length > 0 && hotels.length > 0) {
          if (food.length == 0 || events.length == 0) {
            Alert.alert(
              'Are you sure?',
              'Do you want to add events or food to your cart first?',
              [
                {
                  text: 'Cancel',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
                //navigate to checkout page
                {text: 'Continue', onPress: () => this.props.setCheckoutState()},
              ],
            );
          } else {
            // Navigate to Checkout page
            this.props.setCheckoutState();
        }
        }
      }

    render () {
        return (
            <View style={[this.props.style, {justifyContent: "center", marginTop: 0}]}>
                <View style={{width: "100%", alignItems: "center"}}>
                        
                        <View style={styles.wrapper}>
                            
                            <View style={styles.infoRow}>
                                <View style={styles.endpoint}>
                                    <Text style={styles.time}>{global.startDate}</Text>
                                    <Text style={styles.airport}>{global.origin}</Text>
                                </View>
                                <View style={styles.connector}>
                                    <Text style={styles.duration}>{global.numDays + ' Days'}</Text>
                                    <View style={styles.dot}></View>
                                </View>
                                <View style={styles.endpoint}>
                                    <Text style={styles.time}>{global.endDate}</Text>
                                    <Text style={styles.airport}>{global.destination}</Text>
                                </View>
                            </View>
                            <View style={styles.footer}>
                                <Text style={styles.price}>{'$' + this.props.price}</Text>
								<Button title="Checkout" style={{top: 0, right: 0, marginTop: 0, marginBottom: 0, position: "relative", paddingLeft: 20}}
                                    onPress={() => this.checkoutFunction()}></Button>  
                            </View>            
                        </View>
                    </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: "column", 
        alignItems: 'center',
        backgroundColor: "white",
        paddingTop: 5,
        justifyContent: "center",
        position: "relative",
        width: Platform.OS === 'ios' ? '100%' : wrapperWidth,
        borderWidth: 2, 
        borderColor: "#E6E6E6", 
        borderRadius: 8
    },
    infoRow: {
        flexDirection: "row",
        paddingBottom: 10,
        justifyContent: "space-between",
        width: "100%",
        paddingHorizontal: 25
    },
    endpoint: {
        flexDirection: "column",
		justifyContent: "center",
		alignItems: 'center',
        paddingTop: Platform.OS === 'ios' ? 10 : 0,
    },
    time: {
        fontFamily: "Arial",
        color: "black",
        fontSize: 20
    },
    connector: {
        justifyContent: "center",
        borderBottomWidth: 1,
        borderColor: "#C9C9DA",
        position: 'relative',
        width: Platform.OS === 'ios' ? 100 : 120,
        alignItems: "center",
        height: 43,
        
    },
    dot: {
        backgroundColor: "#3EAAFA",
        height: 10,
        width: 10,
        borderRadius: 5,
        position: "absolute",
        bottom: -5,
        left: "50%",
        opacity: 0.7
    },
    airport: {
        color: "#A9A9BA",
		fontSize: 13,
    },
    footer: {
		backgroundColor: 'rgba(173, 175, 178, 0.2)',
		opacity: 20,
        paddingVertical: 5,
        flexDirection: "row",
        width: "100%",
        justifyContent: "center",
        paddingHorizontal: 5,
        alignItems: "center",
        marginTop: 0

    },
    duration: {
        fontSize: 15
    },
    airline: {
        fontSize: 20
    },
    price: {
        fontSize: Platform.OS === 'ios' ? 23 : 27,
        fontFamily: "Arial",
		color: "black",
		alignItems: 'center',
		paddingRight: 20
        
    },
});

export default withNavigation(CartSummaryCard);
