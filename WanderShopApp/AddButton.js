import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableHighlight,
    Platform
} from 'react-native';
import { cDarkBlue, cLightBlue } from "./App";

export default class AddButton extends Component {
    render () {
        let {onPress, isRipple, rippleColor, children, style} = this.props;
        let btn_styles = {
            alignItems: 'center',
            borderRadius: 20,
            marginTop:18,
            marginBottom: 18,
            backgroundColor: cDarkBlue,
            height: 38,
            width: Platform.OS === 'ios' ? 70 : 85,
            borderColor: "#2268D4",
            borderWidth: 1,
            paddingVertical: Platform.OS === 'ios' ? 0 : 6,
            justifyContent: "center",
            position: "absolute",
            top: -195,
            right: 15,
            
        }
        return (
            <View>
                <TouchableHighlight style={[btn_styles, this.props.style]}
                    onPress={onPress}
                    underlayColor={cLightBlue}
                    >
                    <View style={[{alignItems: "center", justifyContent: "center", padding: 10}]}>
                        <Text style={{fontSize: Platform.OS === 'ios' ? 16 : 20, fontFamily: "Arial", color: "white", fontWeight: Platform.OS === 'ios' ? 'bold' : 'regular'}}>+ADD</Text>
                    </View>
                </TouchableHighlight>
            </View>
        )
    }
}