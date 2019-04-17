import React, { Component } from "react";
import { TouchableOpacity, Text, AsyncStorage} from "react-native";
import { withNavigation } from "react-navigation";
import Icon from "react-native-vector-icons/FontAwesome";

class SaveButton extends React.Component {
  constructor(props) {
    super(props);
}
  async saveItinerary() {
    try {
	  const finalValue = await AsyncStorage.getItem('itinerary');
	  var info = JSON.parse(finalValue)["tripInfo"];
      console.log(finalValue);
      fetch(global.url + 'addTrip/', {
		method: 'POST',
        headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		  },
  
		  body: JSON.stringify({
			email: global.email,
			trip: finalValue,
			startDate: info[2],
		  }),
      })
      .then((response) => response.json())
      .then((responseJSON) => {
        if (responseJSON['success'] == 1) {
          console.log(responseJSON)
          this.props.navigation.navigate('HomePage');
        } else {
          console.log(responseJSON)
          console.log("Save trip failed");
        }
      }).catch(function(error) {
        console.log('There has been a problem with your fetch operation: ' + error.message);
         // ADD THIS THROW error
          throw error;
      });
    } catch (error) {
      console.error(error);
    }
  }
  
  render() {
    var that = this;
    return (
      <Text style={{color: "#FFFFFF", fontFamily: "Arial", fontSize: 19, marginRight: 30}} onPress={that.saveItinerary.bind(that)}>Save</Text>
    );
  }
}
export default withNavigation(SaveButton);