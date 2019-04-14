import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableHighlight,
	Platform,
	Image
} from 'react-native';
import { cDarkBlue, cLightBlue } from "./App";

export default class RemoveButton extends Component {
    render () {
        let {onPress, isRipple, rippleColor, children, style} = this.props;
        let btn_styles = {
            alignItems: 'center',
            borderRadius: 20,
            marginTop:18,
            marginBottom: 18,
            backgroundColor: cDarkBlue,
            height: 45,
            width: Platform.OS === 'ios' ? 30 : 45,
            borderColor: "#2268D4",
            borderWidth: 1,
            paddingVertical: Platform.OS === 'ios' ? 0 : 6,
            justifyContent: "center",
            position: "absolute",
            top: -195,
            right: 15,
            
        }
        return (
            <View style={{}}>
                <TouchableHighlight style={[this.props.style]}
                    onPress={onPress}
                    underlayColor={cLightBlue}
                    >
                    <View style={[{alignItems: "center", justifyContent: "center", padding: 10}]}>
						<Image style={{width: 30, height: 30}} source={require('./assets/img/trashcan_icon.png')} />
                    </View>
                </TouchableHighlight>
            </View>
        )
    }
}