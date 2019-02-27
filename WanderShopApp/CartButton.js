import React, { Component } from "react";
import { TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

class CartButton extends Component {


    onPressButton() {
        console.log("PRESSEd")
    }

    render() {

        return <TouchableOpacity style={{ marginRight: 10 }} onPress={this.onPressButton}>
                <Icon name="shopping-cart" size={25} color="#42cef4" />
            </TouchableOpacity>;
    }
}

export default CartButton;