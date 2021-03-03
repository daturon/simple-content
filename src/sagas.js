import { put, takeLatest } from "redux-saga/effects";

import * as types from "./constants";
import WchHelper from "./wchhelper";

function* getContentById(action) {
  const { contentId } = action.payload;
  const options = {
    url:
      "https://content-eu-4.content-cms.com/api/859f2008-a40a-4b92-afd0-24bb44d10124",
    debug: false,
  };
  const wchHelper = new WchHelper(options);

  try {
    const data = yield wchHelper
      .getDeliveryContentById(contentId)
      .then((content) => content)
      .catch((err) => {
        throw new Error(err);
      });

    yield put({ type: types.GET_CONTENT_BY_ID_SUCCESS, payload: { elements: data.elements || null } });
  } catch (err) {
    yield put({ type: types.GET_CONTENT_BY_ID_ERROR, payload: err.message });
  }
}

function* watchFetchData() {
  yield takeLatest(types.GET_CONTENT_BY_ID, getContentById);
}

export default watchFetchData;
