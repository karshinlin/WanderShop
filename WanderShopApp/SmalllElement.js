import React, { Component } from 'react';
import {
    View, Platform, TouchableHighlight, Image, Text, StyleSheet } from 'react-native';
import { cDarkBlue, cLightBlue, cWhite } from "./App";
import SmallRating from "./SmallRating"

export default class SmallElement extends Component {
    render () {
        let {onPress, isRipple, rippleColor, children, style} = this.props;
        
        return (
            <View style={styles.wrapper}>
                <Image source={{uri: this.props.picUrl}} style={{height: 40, width: 40,  marginLeft: 0, borderRadius: 10,  marginRight: 10 }}/>
                <View style={styles.infoArea}>
                    <View style={{flexDirection: "row"}}>
                        <Text style={styles.title}>{this.props.title}</Text>
                        <View style={{width: 40}}><SmallRating rating={this.props.rating}/></View>
                    </View>
                    
                    <Text style={styles.subtitle}>{this.props.address}</Text>

                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: "row",
        alignItems: "center",
        marginLeft: 25,
        borderLeftWidth: 1,
        paddingVertical: 7,
        paddingLeft: 35,
        borderColor: "#BBBBBB"
    },
    infoArea: {
        marginLeft: 5,
        maxWidth: 200
    },
    title: {
        fontSize: 15,
        fontWeight: "bold",
        marginRight: 8,
        maxWidth: 130
    },
    subtitle: {
        fontSize: 13,
        opacity: 0.7,
        marginTop: 2,
        maxWidth: 200
    }
});