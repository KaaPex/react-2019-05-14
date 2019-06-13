import React from "react";
import RestaurantsMap from "../restaurants-map";

function MapPage(props) {
  return (
    <RestaurantsMap
      id={
        props &&
        props.match &&
        props.match.params &&
        props.match.params.restaurantId
      }
    />
  );
}

export default MapPage;
