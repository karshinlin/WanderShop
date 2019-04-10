import React, { Component } from 'react';
import {
    View,
    TouchableHighlight,
    Platform
} from 'react-native';
import { cDarkBlue, cLightBlue } from "./App";

export default class EmphasisButton extends Component {
    render () {
        let {onPress, isRipple, rippleColor, children, style} = this.props;
        let btn_styles = {
            alignItems: 'center',
            borderRadius: 14,
            margin: Platform.OS === 'ios' ? 9 : 18,
            
            backgroundColor: cLightBlue,
            width: Platform.OS === 'ios' ? 230 : 271, 
            height: Platform.OS === 'ios' ? 65 : 75, 
            padding: 10,
            justifyContent: "center"
        }
        return (
            <View>
                <TouchableHighlight style={btn_styles}
                    onPress={onPress}
                    underlayColor={cDarkBlue}>
                    <View style={[btn_styles, style]}>
                        {children}
                    </View>
                </TouchableHighlight>
            </View>
        )
    }
}