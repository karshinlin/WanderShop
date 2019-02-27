import React, { Component } from "react";
import { View, Text, FlatList } from "react-native";

class RestaurantView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [{title:'Food 1'}, {title:'Food 2'}, {title: 'Food 3'}],
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

export default RestaurantView;
