import React, { Component } from 'react';
import {
    View, Platform, TouchableHighlight, Image, Text, Linking, StyleSheet } from 'react-native';
import { cDarkBlue, cLightBlue, cWhite } from "./App";
import CardRating from "./CardRating"
import AddButton from "./AddButton"
import RemoveButton from "./RemoveButton"
import CallButton from "./CallButton"

const wrapperWidth = 405;

export default class RestaurantCard extends Component {
    render () {
        let {onPress, isRipple, rippleColor, children, style} = this.props;
        var addButton = <AddButton show={this.props.showAdd} onPress={this.props.showAdd == false ? function(){}: this.props.addAction}></AddButton>
        if (this.props.showCheckout) {
            addButton = <CallButton  show={this.props.showCheckout} onPress={() => Linking.openURL(`tel:${this.props.phone}`)} />
        } else if (!this.props.showAdd) {
            addButton = <RemoveButton onPress={this.props.showRemove == false ? function(){}: this.props.removeAction}></RemoveButton>;
        }
        return (
            <View style={[this.props.style, {borderBottomWidth: 10, borderBottomColor: "#F4F4F4"}]}>
                <TouchableHighlight style={{}}
                    onPress={onPress}
                    underlayColor={cLightBlue}
                    >
                    <View style={{width: "100%"}}>
                        <View style={styles.wrapper}>
                            <View style={{width: Platform.OS === 'ios' ? '100%' : wrapperWidth}}>
                                <Image source={{uri: this.props.sourceURL}} style={styles.heroImg} />
                                {addButton}
                            </View>
                            <View style={styles.infoArea}>
                                <View style={styles.name_stars}>
                                    <Text style={styles.hotelName}>{this.props.name}</Text>
                                    <View style={{width: Platform.OS === 'ios' ? 110 : 140, marginVertical: Platform.OS === 'ios' ? 7 : 5}}>
                                        <CardRating rating={this.props.rating}></CardRating>
                                    </View>
                                        
                                </View>
                                <View style={styles.price_area}>
                                    <Text style={styles.price}>{"$".repeat(this.props.price)}</Text>
                                    
                                </View>
                            </View> 
                            <View style={{width: '100%'}}>
                                <Text style={styles.address}>{this.props.address}</Text>
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
        ...Platform.select({
            ios: {
              
              
              
            },
            android: {
              
            },
          }),
    },
    heroImg: {
        width: Platform.OS === 'ios' ? '100%' : "100%",
        height: 195,
        borderRadius: 13,
    },
    infoArea: {
        flexDirection: "row",
        width: Platform.OS === 'ios' ? '100%' : wrapperWidth,
        justifyContent: "space-between",
        marginTop: 10,
        padding: 5
    },
    name_stars: {
        flexDirection: "column"
    },
    price_area: {
        flexDirection: "column",
        justifyContent: "center",
        alignSelf: "flex-start",
        marginTop: 5
    },
    hotelName: {
        fontFamily: "Arial",
        fontSize: 26,
        color: "#363636",
    },
    hotelStars: {

    },
    price: {
        fontSize: 27,
        fontFamily: "Arial",
        color: "#3EAAFA"
    },
    nightText: {
        alignSelf: "flex-end",
        marginTop: Platform.OS === 'ios' ? -2 : -6,
        fontSize: 13,
        opacity: 0.8
    },
    address: {
        textAlign: "left",
        fontSize: 16,
        marginTop: -1,
        width: '100%',
        opacity: 0.7,
        marginBottom: 5,
        marginLeft: 5,
    }
});