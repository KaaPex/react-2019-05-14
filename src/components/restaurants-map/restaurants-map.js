import React, { Component } from "react";
import Leaflet from "leaflet";
import "./restaurant-map.css";
import { connect } from "react-redux";
import {
  restaurantSelector,
  restaurantsLoadedSelector,
  restaurantsLoadingSelector,
  restaurantsSelector
} from "../../selectors";
import { loadRestaurants } from "../../ac";

class RestaurantsMap extends Component {
  render() {
    return <div ref={this.setEl} className="map" />;
  }
  setEl = ref => {
    this.div = ref;
  };
  componentDidMount() {
    if (!this.props.isRestaurantsLoading && !this.props.isRestaurantLoaded) {
      this.props.loadRestaurants();
    }
    this.map = Leaflet.map(this.div, {
      center: [51.51447684708113, -0.13799606534701844],
      zoom: 14
    });
    Leaflet.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
  }
  componentDidUpdate() {
    this.renderTiles();
  }
  renderTiles = () => {
    if (this.props.restaurant) {
      const {
        location: { lat, lng }
      } = this.props.restaurant;
      Leaflet.marker([lat, lng]).addTo(this.map);
    } else {
      this.props.restaurants.forEach(({ location: { lat, lng } }) => {
        Leaflet.marker([lat, lng]).addTo(this.map);
      });
    }
  };
}

export default connect(
  (state, ownProps) => ({
    restaurant: restaurantSelector(state, ownProps),
    restaurants: restaurantsSelector(state),
    isRestaurantsLoading: restaurantsLoadingSelector(state),
    isRestaurantsLoaded: restaurantsLoadedSelector(state)
  }),
  {
    loadRestaurants
  }
)(RestaurantsMap);
