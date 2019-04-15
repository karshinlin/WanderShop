import React, { Component } from "react";
import { TouchableOpacity } from "react-native";
import { withNavigation } from "react-navigation";
import Icon from "react-native-vector-icons/FontAwesome";

class CartButton extends Component {
    constructor(props) {
        super(props);
    }

    onPressButton() {
        this.props.navigation.navigate('Cart');
    }

    render() {
        var that = this;

        return <TouchableOpacity style={{ marginRight: 35 }} onPress={that.onPressButton.bind(that)}>
                <Icon name="shopping-cart" size={30} color="white" />
            </TouchableOpacity>;
    }
}

export default withNavigation(CartButton);