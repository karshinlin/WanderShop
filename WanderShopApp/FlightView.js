import React, { Component } from "react";
import { View, Text, FlatList } from "react-native";

class FlightView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [{title:'Flight 1'}, {title:'Flight 2'}, {title: 'Flight 3'}],
    };
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <FlatList
        data={this.state.data}
        renderItem={
          ({ item }) =>
            <Text style={{ padding: 15, width: '100%' }}>{item.title}</Text>
        }
      />
      </View>
    );
  }
}

export default FlightView;
