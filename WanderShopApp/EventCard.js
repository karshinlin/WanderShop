import React, { Component } from 'react';
import {
    View, TouchableHighlight, Image, Text, StyleSheet } from 'react-native';
import { cDarkBlue, cLightBlue, cWhite } from "./App";
import CardRating from "./CardRating"
import AddButton from "./AddButton"

const wrapperWidth = 405;

export default class RestaurantCard extends Component {
    render () {
        let {onPress, isRipple, rippleColor, children, style} = this.props;
        
        return (
            <View style={[this.props.style, {borderBottomWidth: 10, borderBottomColor: "#F4F4F4"}]}>
                <TouchableHighlight style={{}}
                    onPress={onPress}
                    underlayColor={cLightBlue}
                    >
                    <View style={{width: "100%"}}>
                        <View style={styles.wrapper}>
                            <View style={{width: wrapperWidth}}>
                                <Image source={require('./assets/img/hero_hotel.jpg')} style={styles.heroImg} />
                                <AddButton></AddButton>
                            </View>
                            <View style={styles.infoArea}>
                                <View style={styles.name_stars}>
                                    <Text style={styles.hotelName}>{this.props.name}</Text>
                                    <View style={{width: 140, marginVertical: 5}}>
                                        <CardRating rating={this.props.rating}></CardRating>
                                    </View>
                                        
                                </View>
                                <View style={styles.price_area}>
                                    <Text style={styles.price}>{"$"+this.props.price}</Text>
                                </View>
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
        padding: 30,
        justifyContent: "center",
        position: "relative"
    },
    heroImg: {
        width: "100%",
        height: 195,
        borderRadius: 13,
    },
    infoArea: {
        flexDirection: "row",
        width: wrapperWidth,
        justifyContent: "space-between",
        marginTop: 7,
        padding: 5
    },
    name_stars: {
        flexDirection: "column"
    },
    price_area: {
        flexDirection: "column",
        justifyContent: "center"
    },
    hotelName: {
        fontFamily: "RobotoBold",
        fontSize: 26,
        color: "#363636",
    },
    hotelStars: {

    },
    price: {
        fontSize: 27,
        fontFamily: "RobotoMedium",
        color: "#3EAAFA"
    },
    nightText: {
        alignSelf: "flex-end",
        marginTop: -6,
    }
});