import React, { Component } from "react";
import { View, Text, FlatList } from "react-native";

class EventView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [{title:'Event 1'}, {title:'Event 2'}, {title: 'Event 3'}],
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

export default EventView;
