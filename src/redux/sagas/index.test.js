import { spawn } from "redux-saga/effects";
import { testSaga } from "redux-saga-test-plan";
import { rootSaga } from ".";
import { peopleSaga } from "./people";

describe("rootSaga", () => {
  it("should spawn the peopleSaga", () => {
    testSaga(rootSaga)
      .next()
      .all([spawn(peopleSaga)])
      .next()
      .isDone();
  });
});
