import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { createBrowserHistory } from "history";

// reducers
import { peopleReducer } from "./people";
import { userDetailsReducer } from "./peopleDetails";

export const history = createBrowserHistory();

const rootReducer = combineReducers({
  people: peopleReducer,
  peopleDetails: userDetailsReducer,
  router: connectRouter(history),
});

export default rootReducer;
