import { fromJS } from "immutable";

import * as types from './constants';

export const initialAppState = fromJS({
  loading: false,
  contentElements: null,
  contentError: '',
});

export default function appReducer(state = initialAppState, action) {
  switch (action.type) {
    case types.GET_CONTENT_BY_ID:
      return state
        .set('loading', true)
        .set('contentElements', null)
        .set('contentError', '');
    case types.GET_CONTENT_BY_ID_SUCCESS:
      return state
        .set('loading', false)
        .set('contentElements', fromJS(action.payload.elements));
    case types.GET_CONTENT_BY_ID_ERROR:
      return state
        .set('loading', false)
        .set('contentElements', null)
        .set('contentError', action.payload);
    case types.CLEAR_CONTENT_ERROR:
      return state.set('contentError', '');
    default:
      return state;
  }
}
