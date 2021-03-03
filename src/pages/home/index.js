import { connect } from 'react-redux';

import { clearContentError, getContentById } from '../../actions';
import HomePage from './HomePage';

export function mapStateToProps(state, ownProps) {
  return {
    loading: state.get('loading'),
    contentElements: state.get('contentElements'),
    contentError: state.get('contentError'),
  };
}

export function mapDispatchToProps(dispatch) {
  return {
    getContentById: (contentId) => { dispatch(getContentById(contentId)); },
    clearContentError: () => { dispatch(clearContentError()) },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
