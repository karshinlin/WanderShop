import React, { Component } from 'react';
import {
    View,
    TouchableHighlight
} from 'react-native';
import { cDarkBlue, cLightBlue } from "./App";

export default class StandardButton extends Component {
    render () {
        let {onPress, isRipple, rippleColor, children, style} = this.props;
        let btn_styles = {
            alignItems: 'center',
            borderRadius: 8,
            marginTop:18,
            marginBottom: 18,
            backgroundColor: cDarkBlue,
            height: 70, 
            padding: 10,
            justifyContent: "center"
        }
        return (
            <View>
                <TouchableHighlight style={[btn_styles, this.props.style]}
                    onPress={onPress}
                    underlayColor={cLightBlue}
                    >
                    <View style={[{alignItems: "center", justifyContent: "center", padding: 10}]}>
                        {children}
                    </View>
                </TouchableHighlight>
            </View>
        )
    }
}