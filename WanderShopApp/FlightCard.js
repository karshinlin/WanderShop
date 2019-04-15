import React, { Component } from 'react';
import {
    View, Platform, TouchableHighlight, Linking, Image, Text, StyleSheet } from 'react-native';
import { cDarkBlue, cLightBlue, cWhite } from "./App";
import CardRating from "./CardRating";
import BookButton from "./BookButton";
import AddButton from "./AddButton";
import RemoveButton from './RemoveButton';

const wrapperWidth = 410;

export default class FlightCard extends Component {
    render () {
        let {onPress, isRipple, rippleColor, children, style} = this.props;
        var numStopsTo = parseInt(this.props.numStopsTo);
		var stopStrTo = '';
		if (numStopsTo > 1) {
			stopStrTo = numStopsTo + ' Stops';
		} else if (numStopsTo == 1) {
			stopStrTo = numStopsTo + ' Stop';
		} else {
			stopStrTo = this.props.numStopsTo;
        }
        var numStopsBack = parseInt(this.props.numStopsBack);
		var stopStrBack = '';
		if (numStopsBack > 1) {
			stopStrBack = numStopsBack + ' Stops';
		} else if (numStopsBack == 1) {
			stopStrBack = numStopsBack + ' Stop';
		} else {
			stopStrBack = this.props.numStopsBack;
        }
        
        var addButton = <AddButton show={this.props.showAdd} style={{top: 0, right: 0, marginTop: 0, marginBottom: 0, position: "relative"}}
        onPress={this.props.showAdd == false ? function(){}: this.props.addAction}></AddButton>;
        console.log(this.props.showCheckout);
        if (this.props.showCheckout) {
            addButton = <BookButton  style={{top: 0, right: 0, marginTop: 0, marginBottom: 0, position: "relative"}} show={this.props.showCheckout} onPress={() => Linking.openURL(this.props.bookingUrl)} />
        } else if (!this.props.showAdd) {
            addButton = <RemoveButton style={{top: 0, right: 0, marginTop: 0, marginBottom: 0, position: "relative"}}
            onPress={this.props.showRemove == false ? function(){}: this.props.removeAction}></RemoveButton>;
        }
        return (
            <View style={[this.props.style, {justifyContent: "center", marginTop: 30}]}>
                <TouchableHighlight style={{}}
                    onPress={onPress}
                    underlayColor={cLightBlue}
                    >
                    <View style={{width: "100%", alignItems: "center"}}>
                        
                        <View style={styles.wrapper}>
                            
                            <View style={styles.flightRow}>
                                <View style={styles.endpoint}>
                                    <Text style={styles.time}>{this.props.first_dep_time}</Text>
                                    <Text style={styles.airport}>{this.props.first_dep_airport}</Text>
                                </View>
                                <View style={styles.connector}>
                                    <Text style={styles.duration}>{this.props.first_duration}</Text>
                                    <View style={styles.dot}></View>
                                </View>
                                <View style={styles.endpoint}>
                                    <Text style={styles.time}>{this.props.first_land_time}</Text>
                                    <Text style={styles.airport}>{this.props.first_land_airport}</Text>
                                </View>
                            </View>
                            <View style={styles.flightRow}>
                                <View style={styles.connector}>
                                    <Text style={styles.duration}>{this.props.aDepartDate}</Text>
                                </View>
                                <View style={styles.connector}>
                                    <Text style={styles.duration}>{stopStrTo}</Text>
                                </View>
                            </View>   
                             <View style={styles.flightRow}>
                                <View style={styles.endpoint}>
                                    <Text style={styles.time}>{this.props.second_dep_time}</Text>
                                    <Text style={styles.airport}>{this.props.second_dep_airport}</Text>
                                </View>
                                <View style={styles.connector}>
                                    <Text style={styles.duration}>{this.props.second_duration}</Text>
                                    <View style={styles.dot}></View>
                                </View>
                                <View style={styles.endpoint}>
                                    <Text style={styles.time}>{this.props.second_land_time}</Text>
                                    <Text style={styles.airport}>{this.props.second_land_airport}</Text>
                                </View>
                            </View> 
                            <View style={styles.flightRow}>
                                <View style={styles.connector}>
                                    <Text style={styles.duration}>{this.props.aReturnDate}</Text>
                                </View>
                                <View style={styles.connector}>
                                    <Text style={styles.duration}>{stopStrBack}</Text>
                                </View>
                            </View>   
                            <View style={styles.footer}>
                                <Text style={styles.airline}>{this.props.airline}</Text>
                                <Text style={styles.price}>{this.props.price}</Text>
                                {addButton}
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
        flexDirection: "column", 
        alignItems: 'center',
        backgroundColor: "white",
        paddingTop: 20,
        justifyContent: "center",
        position: "relative",
        width: Platform.OS === 'ios' ? '100%' : wrapperWidth,
        borderWidth: 2, 
        borderColor: "#E6E6E6", 
        borderRadius: 8
    },
    flightRow: {
        flexDirection: "row",
        paddingBottom: 10,
        justifyContent: "space-between",
        width: "100%",
        paddingHorizontal: 25
    },
    endpoint: {
        flexDirection: "column",
        justifyContent: "center",
        paddingTop: Platform.OS === 'ios' ? 20 : 0,
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
        width: Platform.OS === 'ios' ? 150 : 170,
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
        fontSize: 13
    },
    footer: {
        backgroundColor: "#F8F9F9",
        paddingVertical: 20,
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
        paddingHorizontal: 25,
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
        
    },
});