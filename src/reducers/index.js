import { combineReducers } from "redux";
import counterReducer from "./counter";
import cartReducer from "./cart";
import restaurantsReducer from "./restaurants";
import dishesReducer from "./dishes";
import reviewsReducer from "./reviews";
import usersReducer from "./users";
import { connectRouter } from "connected-react-router";
import { history } from "../history";

export default combineReducers({
  router: connectRouter(history),
  count: counterReducer,
  restaurants: restaurantsReducer,
  cart: cartReducer,
  dishes: dishesReducer,
  reviews: reviewsReducer,
  users: usersReducer
});
