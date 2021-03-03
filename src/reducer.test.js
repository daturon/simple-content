import { fromJS } from "immutable";

import * as actions from "./constants";
import appReducer, { initialAppState } from "./reducer";

describe("appReducer", () => {
  it("should return the initial state", () => {
    const initialState = fromJS({ loading: false });
    expect(appReducer(initialState, { type: "unknown_action_type" })).toEqual(
      initialState
    );
  });

  it("should handle GET_CONTENT_BY_ID", () => {
    const action = {
      type: actions.GET_CONTENT_BY_ID,
      payload: { contentId: "contentId" },
    };
    const expected = initialAppState.set("loading", true);

    expect(appReducer(initialAppState, action)).toEqual(expected);
  });

  it("should handle GET_CONTENT_BY_ID_SUCCESS", () => {
    const elementsData = { data: 'some data' };
    const action = {
      type: actions.GET_CONTENT_BY_ID_SUCCESS,
      payload: { elements: elementsData },
    };
    const expected = initialAppState.set("contentElements", fromJS(elementsData));

    expect(appReducer(initialAppState, action)).toEqual(expected);
  });

  it("should handle GET_CONTENT_BY_ID_ERROR", () => {
    const errorMessage = "Some error";
    const action = {
      type: actions.GET_CONTENT_BY_ID_ERROR,
      payload: errorMessage,
    };
    const expected = initialAppState.set("contentError", errorMessage);

    expect(appReducer(initialAppState, action)).toEqual(expected);
  });

  it("should handle CLEAR_CONTENT_ERROR", () => {
    const action = {
      type: actions.CLEAR_CONTENT_ERROR,
    };
    const expected = initialAppState.set("contentError", '');

    expect(appReducer(initialAppState.set('contentError', 'someError'), action)).toEqual(expected);
  });
});
