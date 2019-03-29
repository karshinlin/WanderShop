import StarRating from 'react-native-star-rating';
import React, { Component } from 'react';
import {
    View, TouchableHighlight, Image, Text, StyleSheet } from 'react-native';
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
        starSize={25}
        starStyle={{marginLeft: 1, marginRight: 1, paddingRight: 0, paddingHorizontal: 0, marginHorizontal: 0}}
        emptyStarColor={"white"}
        fullStarColor={"#FAA916"}
        rating={this.props.rating}
        
      />
    );
  }
}

export default CardRating