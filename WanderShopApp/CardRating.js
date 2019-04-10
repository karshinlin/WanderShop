import StarRating from 'react-native-star-rating';
import React, { Component } from 'react';
import {
    View, Platform, TouchableHighlight, Image, Text, StyleSheet } from 'react-native';
import { cDarkBlue, cLightBlue, cWhite } from "./App";

class CardRating extends Component {

  constructor(props) {
    super(props);
    this.state = {
      starCount: 3.5
    };
  }

  onStarRatingPress(rating) {
    this.setState({
      starCount: rating
    });
  }

  render() {
    return (
      <StarRating
        disabled={true}
        maxStars={5}
        starSize={Platform.OS === 'ios' ? 20 : 25}
        starStyle={{marginHorizontal: Platform.OS === 'ios' ? 0: 1, paddingHorizontal: Platform.OS === 'ios' ? -5: 0}}
        emptyStarColor={"white"}
        fullStarColor={"#FAA916"}
        rating={this.props.rating}
        
      />
    );
  }
}

export default CardRating