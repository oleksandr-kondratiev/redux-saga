import { all, spawn } from "redux-saga/effects";
import { peopleSaga } from "./people";

export function* rootSaga() {
  const sagas = [peopleSaga];

  yield all(sagas.map((s) => spawn(s)));
}
