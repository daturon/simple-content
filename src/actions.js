import * as types from "./constants";

export function getContentById(contentId) {
  return {
    type: types.GET_CONTENT_BY_ID,
    payload: {
      contentId,
    },
  };
}

export function clearContentError() {
  return {
    type: types.CLEAR_CONTENT_ERROR,
  };
}
