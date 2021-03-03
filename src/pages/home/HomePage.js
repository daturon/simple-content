import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import PropTypes from "prop-types";

import Loader from "../../components/Loader";
import Article from "./components/Article";

function HomePage(props) {
  const {
    contentElements,
    loading,
    contentError,
    getContentById,
    clearContentError,
  } = props;

  useEffect(() => {
    getContentById("db4930e9-7504-4d9d-ae6c-33facca754d1");
  }, [getContentById]);

  useEffect(() => {
    if (contentError.length) {
      toast.error(contentError, {
        onClose: clearContentError,
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
      });
    }

    return () => {
      if (contentError.length > 0) {
        clearContentError();
      }
    };
  }, [contentError, clearContentError]);

  return (
    <div className="home-page-content">
      {loading && <Loader />}
      {!loading && contentElements && <Article elements={contentElements} />}
      <ToastContainer />
    </div>
  );
}

HomePage.propTypes = {
  loading: PropTypes.bool.isRequired,
  contentError: PropTypes.string.isRequired,
  getContentById: PropTypes.func.isRequired,
  clearContentError: PropTypes.func.isRequired,
  contentElements: PropTypes.object,
};

HomePage.defaultProps = {
  contentElements: null,
};

export default HomePage;
