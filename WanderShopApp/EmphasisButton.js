import React, { Component } from 'react';
import {
    View,
    TouchableNativeFeedback
} from 'react-native';
import { cDarkBlue, cLightBlue } from "./App";

export default class EmphasisButton extends Component {
    render () {
        let {onPress, isRipple, rippleColor, children, style} = this.props;
        let btn_styles = {
            alignItems: 'center',
            borderRadius: 10,
            margin: 18,
            backgroundColor: cLightBlue,
            width: 271, 
            height: 75, 
            padding: 10,
            justifyContent: "center"
        }
        return (
            <View>
                <TouchableNativeFeedback style={btn_styles}
                    onPress={onPress}
                    background={isRipple ? TouchableNativeFeedback.Ripple(rippleColor || "#000000") : cDarkBlue}>
                    <View style={[btn_styles, style]}>
                        {children}
                    </View>
                </TouchableNativeFeedback>
            </View>
        )
    }
}