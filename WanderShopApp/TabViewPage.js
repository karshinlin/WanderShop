import * as React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import FlightView from './FlightView'; 
import HotelView from './HotelView';
import EventView from './EventView';
import RestaurantView from './RestaurantView';

export default class TabViewPage extends React.Component {
  state = {
    index: 0,
    routes: [
      { key: 'first', title: 'Flights' },
      { key: 'second', title: 'Hotels' },
      { key: 'third', title: 'Events' },
      { key: 'fourth', title: 'Food' },
    ],
  };
 
  render() {
    return (
      <TabView
        style={{ backgroundColor: "#42cef4" }}
        navigationState={this.state}
        renderScene={SceneMap({
          first: FlightView,
          second: HotelView,
          third: EventView,
          fourth: RestaurantView,
        })}
        onIndexChange={index => this.setState({ index })}
        initialLayout={{ width: Dimensions.get('window').width }}
      />
    );
  }
}
 
const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
});