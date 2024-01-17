import {
  call,
  takeEvery,
  put,
  apply,
  take,
  select,
  fork,
} from "redux-saga/effects";
import { LOCATION_CHANGE } from "connected-react-router";
import { matchPath } from "react-router";

// actions
import { LOAD_USERS, LOAD_USERS_SUCCESS } from "../../reducers/people/actions";
import { getRouteConfig, MAIN_ROUTE, PEOPLE_ROUTE } from "../../../routes";
import {
  LOAD_USER_DETAILS,
  LOAD_USER_DETAILS_FAILURE,
  LOAD_USER_DETAILS_SUCCESS,
} from "../../reducers/peopleDetails/actions";

// constants
import { BASE_URL } from "../../../constants/api.constants";

export function* loadPeopleDetails({ payload }) {
  const { id } = payload;

  try {
    const request = yield call(fetch, `${BASE_URL}/${id}`);
    const data = yield apply(request, request.json);

    yield put({ type: LOAD_USER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: LOAD_USER_DETAILS_FAILURE, payload: error });
  }
}

export function* loadPeopleList({ payload }) {
  const { page, search } = payload;
  const request = yield call(
    fetch,
    `${BASE_URL}?page=${page}&search=${search}`
  );
  const data = yield apply(request, request.json);

  yield put({ type: LOAD_USERS_SUCCESS, payload: data });
}

export function* routeChangeSaga() {
  while (true) {
    const action = yield take(LOCATION_CHANGE);

    if (
      matchPath(action.payload.location.pathname, getRouteConfig(MAIN_ROUTE))
    ) {
      const state = yield select((state) => state.people);
      const { page, search } = state;

      yield put({ type: LOAD_USERS, payload: { page, search } });
    }

    const detailsPage = matchPath(
      action.payload.location.pathname,
      getRouteConfig(PEOPLE_ROUTE)
    );

    if (detailsPage) {
      const { id } = detailsPage.params;

      if (id) {
        yield put({ type: LOAD_USER_DETAILS, payload: { id } });
      }
    }
  }
}

export function* peopleSaga() {
  yield fork(routeChangeSaga);

  yield takeEvery(LOAD_USERS, loadPeopleList);
  yield takeEvery(LOAD_USER_DETAILS, loadPeopleDetails);
}
