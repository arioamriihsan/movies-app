import React, { useMemo } from "react";
import { useHistory } from "react-router-dom";
import SearchBox from "./SearchBox";
import { useMovieContext } from "./MovieContext";

const Header = () => {
  const history = useHistory();
  // Context
  const movieContext = useMovieContext();
  const movieProps = useMemo(() => {
    return {
      isDetail: movieContext.isDetail,
    };
  }, [movieContext]);

  const { isDetail } = movieProps;

  return (
    <div className="nav-header">
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-md-6">
            <h1 className="ml-3">Movies App</h1>
          </div>
          <div className="col-6 align-self-center">
            {isDetail ? (
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => history.push("/")}
              >
                <i className="fa fa-home" />
                <span className='ml-2'>Back to Home</span>
              </button>
            ) : (
              <SearchBox />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
