import React, { Component } from "react";
import { TouchableOpacity } from "react-native";
import { withNavigation } from "react-navigation";
import Icon from "react-native-vector-icons/FontAwesome";

class CartButton extends Component {
    constructor(props) {
        super(props);
    }

    onPressButton() {
        this.props;
        this.props.navigation;
        this.props.navigation.navigate('Cart');
    }

    render() {
        var that = this;

        return <TouchableOpacity style={{ marginRight: 10 }} onPress={that.onPressButton.bind(that)}>
                <Icon name="shopping-cart" size={25} color="#42cef4" />
            </TouchableOpacity>;
    }
}

export default withNavigation(CartButton);