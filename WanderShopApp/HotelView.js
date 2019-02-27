import React, { Component } from "react";
import { View, Text, FlatList } from "react-native";

class HotelView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [{title:'Hotel 1'}, {title:'Hotel 2'}, {title: 'Hotel 3'}],
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

export default HotelView;
