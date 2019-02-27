import React, { Component } from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

class FlightView extends Component {
  constructor(props) {
    super(props);

    this.state = {
        isLoading: true,
        error: false,
        data: [{title:'Flight 1'}, {title:'Flight 2'}, {title: 'Flight 3'}],
        refreshing: false,
        time: 30,
    };
  }

  fetchFlights(){
    return fetch('http://127.0.0.1:5000/getflights/')
        .then((response) => response.json())
        .then((response) => {
            this.setState({
                isLoading: false,
                error: false,
                data: response.flights,
                refreshing: false,
                time: 30,
            }, function () {

            });
        })
        .catch((error) => {
            this.setState({
                isLoading: false,
                error: true
            })
        });
    }
    componentDidMount() {
        //this.fetchFlights();
        this.setState({ isLoading: false });
    }

  render() {
    if (this.state.error) {
        return (
            <View style={{ flex: 1, paddingTop: 25, alignSelf: "center" }}>
                <Icon name="error" size={75} color="#F00" />
                <Text style={{ alignSelf: "center", color: "#F00" }}>Error</Text>
            </View>
            );
    }
    if (this.state.isLoading) {
        return (
            <View style={{ flex: 1, paddingTop: 25 }}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }
    return (
      <View style={{ flex: 1 }}>
        <FlatList
        data={this.state.data}
        renderItem={
          ({ item }) =>
            <Text style={{ padding: 15, width: '100%' }}>{item.title}</Text>
        }
        refreshing={this.state.refreshing}
        onRefresh={this.handleRefresh}
      />
      </View>
    );
  }
}

export default FlightView;
