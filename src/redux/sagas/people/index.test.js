import { call } from "redux-saga/effects";
import { expectSaga, testSaga } from "redux-saga-test-plan";
import { BASE_URL } from "../../../constants/api.constants";
import {
  loadPeopleDetails,
  loadPeopleList,
  peopleSaga,
  routeChangeSaga,
} from ".";
import {
  loadPeopleDetailsMockData,
  loadPeopleListMockData,
} from "./index.mockdata";
import { LOCATION_CHANGE } from "connected-react-router";
import { MAIN_ROUTE, getRouteConfig } from "../../../routes";
import { LOAD_USERS } from "../../reducers/people/actions";
import { LOAD_USER_DETAILS } from "../../reducers/peopleDetails/actions";

describe("loadPeopleDetails saga", () => {
  it("should handle success", () => {
    const id = 4;
    const action = { payload: { id } };

    return expectSaga(loadPeopleDetails, action)
      .provide([
        [
          call(fetch, `${BASE_URL}/${id}`),
          { json: () => loadPeopleDetailsMockData },
        ],
      ])
      .put({
        type: "LOAD_USER_DETAILS_SUCCESS",
        payload: loadPeopleDetailsMockData,
      })
      .run();
  });

  it("should handle failure", () => {
    const id = 4;
    const action = { payload: { id } };
    const error = new Error("Something went wrong");

    return expectSaga(loadPeopleDetails, action)
      .provide([[call(fetch, `${BASE_URL}/${id}`), Promise.reject(error)]])
      .put({ type: "LOAD_USER_DETAILS_FAILURE", payload: error })
      .run();
  });
});

describe("loadPeopleList saga", () => {
  it("should fetch people list and handle success", () => {
    const page = 1;
    const search = "";
    const action = { payload: { page, search } };

    return expectSaga(loadPeopleList, action)
      .provide([
        [
          call(fetch, `${BASE_URL}?page=${page}&search=${search}`),
          { json: () => loadPeopleListMockData },
        ],
      ])
      .put({ type: "LOAD_USERS_SUCCESS", payload: loadPeopleListMockData })
      .run();
  });
});

describe("routeChangeSaga", () => {
  it("should dispatch LOAD_USERS when location changes to MAIN_ROUTE", () => {
    const action = {
      type: LOCATION_CHANGE,
      payload: {
        location: {
          pathname: getRouteConfig(MAIN_ROUTE).path,
        },
      },
    };

    const state = {
      people: {
        page: 1,
        search: "",
      },
    };

    testSaga(routeChangeSaga)
      .next()
      .take(LOCATION_CHANGE)
      .next(action)
      .next(state.people)
      .put({ type: LOAD_USERS, payload: state.people });
  });
});

describe("peopleSaga", () => {
  it("should fork routeChangeSaga and take every LOAD_USERS and LOAD_USER_DETAILS actions", () => {
    testSaga(peopleSaga)
      .next()
      .fork(routeChangeSaga)
      .next()
      .takeEvery(LOAD_USERS, loadPeopleList)
      .next()
      .takeEvery(LOAD_USER_DETAILS, loadPeopleDetails)
      .next()
      .isDone();
  });
});
