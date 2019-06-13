import {
  INCREMENT,
  DECREMENT,
  ADD_TO_CART,
  SUBTRACT_FROM_CART,
  DELETE_FROM_CART,
  ADD_REVIEW,
  LOAD_RESTAURANTS,
  LOAD_REVIEWS,
  LOAD_USERS,
  LOAD_DISHES,
  START,
  SUCCESS,
  FAIL,
  SEND_ORDER
} from "../constants";
import { cartSelector } from "../selectors";
import { push, replace } from "connected-react-router";

export const increase = () => ({
  type: INCREMENT
});
export const decrease = () => ({
  type: DECREMENT
});
export const increaseCart = id => ({
  type: ADD_TO_CART,
  payload: {
    id
  }
});
export const decreaseCart = id => ({
  type: SUBTRACT_FROM_CART,
  payload: {
    id
  }
});
export const deleteFromCart = id => ({
  type: DELETE_FROM_CART,
  payload: {
    id
  }
});
export const addReview = (userName, rating, text, restaurantId) => ({
  type: ADD_REVIEW,
  payload: {
    userName,
    rating,
    text,
    restaurantId
  },
  generateId: true,
  provideUserId: true
});

export const loadRestaurants = () => ({
  type: LOAD_RESTAURANTS,
  callAPI: "http://localhost:3001/api/restaurants"
});

export const loadReviews = () => ({
  type: LOAD_REVIEWS,
  callAPI: "http://localhost:3001/api/reviews"
});

export const loadUsers = () => ({
  type: LOAD_USERS,
  callAPI: "http://localhost:3001/api/users"
});

export const loadDishes = id => (dispatch, getState) => {
  const state = getState();
  if (!state.dishes.loaded && !state.dishes.loading) {
    dispatch({ type: LOAD_DISHES + START });
    fetch(`http://localhost:3001/api/dishes?id=${id}`)
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          dispatch({ type: LOAD_DISHES + FAIL, error: data.error });
          dispatch(replace("/error"));
        } else {
          dispatch({ type: LOAD_DISHES + SUCCESS, response: data });
        }
      })
      .catch(e => {
        dispatch({ type: LOAD_DISHES + FAIL, error: e });
      });
  }
};

export const loadAllDataForReviews = () => (dispatch, getState) => {
  const state = getState();

  if (!state.reviews.loaded && !state.reviews.loading) {
    dispatch({ type: LOAD_REVIEWS + START });
    fetch("http://localhost:3001/api/reviews")
      .then(res => res.json())
      .then(data => {
        dispatch({ type: LOAD_REVIEWS + SUCCESS, response: data });
      })
      .catch(e => dispatch({ type: LOAD_REVIEWS + FAIL, error: e }));
  }

  if (!state.users.loaded && !state.users.loading) {
    dispatch({ type: LOAD_USERS + START });
    fetch("http://localhost:3001/api/users")
      .then(res => res.json())
      .then(data => {
        dispatch({ type: LOAD_USERS + SUCCESS, response: data });
      })
      .catch(e => dispatch({ type: LOAD_USERS + FAIL, error: e }));
  }
};

export const sendOrder = order => (dispatch, getState) => {
  try {
    dispatch({
      type: SEND_ORDER,
      payload: {
        ...order,
        dishes: cartSelector(getState())
      }
    });
    dispatch(push("/order-complete"));
  } catch (e) {
    dispatch(push("/error"));
  }
};
