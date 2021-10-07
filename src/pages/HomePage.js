import React, {
  useState,
  useEffect,
  useMemo,
  useRef,
  useCallback,
} from "react";
import { MovieList } from "../components";
import axios from "axios";
import { API_URL } from "../support/api";
import { useMovieContext } from "../components/MovieContext";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");
  const [movieData, setMovieData] = useState([]);

  // Context
  const movieContext = useMovieContext();
  const movieProps = useMemo(() => {
    return {
      search: movieContext.search,
      setSearch: movieContext.setSearch,
      page: movieContext.page,
      hasMore: movieContext.hasMore,
      setHasMore: movieContext.setHasMore,
      setPage: movieContext.setPage,
      suggestion: movieContext.suggestion,
      setSuggestion: movieContext.setSuggestion,
      setIsDetail: movieContext.setIsDetail,
    };
  }, [movieContext]);

  let {
    search,
    page,
    setHasMore,
    hasMore,
    setPage,
    setSearch,
    setSuggestion,
    setIsDetail,
  } = movieProps;

  const observer = useRef();
  const lastMovieElementRef = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) {
        observer.current.observe(node);
      }
    },
    [hasMore]
  );

  useEffect(() => {
    setIsDetail(false);
  }, []);

  useEffect(() => {
    if (movies.length > 0) {
      setMovieData(movies);
    }
  }, [movies]);

  useEffect(() => {
    if (!search) {
      setSearch("batman");
    }
    setMovies([]);
    setSuggestion([]);
  }, [search]);
  
  useEffect(() => {
    let cancel;
    setError("");
    axios({
      method: "GET",
      url: API_URL,
      params: { s: search, page },
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((resp) => {
        if (resp.data.Search && !error) {
          setMovies((prevMovies) => {
            return [...prevMovies, ...resp.data.Search.map((el) => el)];
          });
          if (search && search !== "batman" && page === 1) {
            setSuggestion(resp.data.Search);
          }
          setHasMore(resp.data.Search.length > 0);
        }
        if (resp.data.Error) {
          setMovieData([]);
          setMovies([]);
          setError(resp.data.Error);
        }
      })
      .catch((err) => {
        if (axios.isCancel(err)) {
          return;
        }
        return window.alert(err);
      });
    return () => cancel();
  }, [search, page]);

  return (
    <div className="app-container">
      <div className="d-flex flex-row flex-wrap justify-content-center align-items-center">
        {movieData.length > 0 && (
          <MovieList
            movies={movieData}
            lastMovieElementRef={lastMovieElementRef}
          />
        )}
        {error && (
          <div style={{ height: "35rem" }}>
            <h3 style={{ color: "#fff" }}>{error}</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
