import React, { Component } from 'react';
import {
    View, Platform, TouchableHighlight, Image, Text, StyleSheet } from 'react-native';
import { cDarkBlue, cLightBlue, cWhite } from "./App";
import CardRating from "./CardRating"
import AddButton from "./AddButton"

const wrapperWidth = 405;
String.prototype.toTitleCase = function () {
    return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};
String.prototype.toSentenceCase = function () {
    return this.replace(/(?:^|(?:[.!?]\s))(\w+)/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};


export default class EventCard extends Component {
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
                            <View style={{width: Platform.OS === 'ios' ? '100%' : wrapperWidth}}>
                                <Image source={{uri: this.props.sourceURL}} style={styles.heroImg} />
                                <AddButton onPress={this.props.addAction}></AddButton>
                            </View>
                            <View style={styles.infoArea}>
                                <View style={styles.name_stars}>
                                    <Text style={styles.hotelName}>{this.props.name.toTitleCase()}</Text>
                                    <View style={{width: 200, marginVertical: Platform.OS === 'ios' ? 7 : 5}}>
                                        <Text>{this.props.eventLocation}</Text>
                                    </View>
                                        
                                </View>
                                <View style={styles.price_area}>
                                    <Text style={styles.fromText}>{this.props.price == '' ? '' : "from"}</Text>
                                    <Text style={styles.price}>{this.props.price == '' ? '' : "$"+Math.ceil(this.props.price)}</Text>
                                    
                                </View>
                            </View> 
                            <View style={{width: '100%'}}>
                                <Text numberOfLines={4} style={styles.address}>{typeof this.props.info != 'string' || this.props.info == "" ? '' : this.props.info.toLowerCase().toSentenceCase()}</Text>
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
        fontSize: 20,
        color: "#363636",
        maxWidth: 230,
        marginTop: 5
    },
    hotelStars: {

    },
    price: {
        fontSize: 25,
        fontFamily: "Arial",
        color: "#3EAAFA"
    },
    fromText: {
        alignSelf: "flex-end",
        marginTop: 3,
        fontSize: 13,
        opacity: 0.8,
        
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
/* import React, { Component } from 'react';
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
                                <Image source={source={uri: this.props.sourceURL}} style={styles.heroImg} />
                                <AddButton></AddButton>
                            </View>
                            <View style={styles.infoArea}>
                                <View style={styles.name_stars}>
                                    <Text style={styles.hotelName}>{this.props.name}</Text>
                                    <View style={{width: 140, marginVertical: 5}}>
                                        
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
        marginTop: -6,
    }
}); */