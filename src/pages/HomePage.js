import React, {
  useState,
  useEffect,
  useMemo,
  useRef,
  useCallback,
} from "react";
// import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { MovieList } from "../components";
import axios from 'axios';
import { API_URL } from '../support/api';
import { useMovieContext } from "../components/MovieContext";
// import { fetchMovies } from '../redux/MovieReducer';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState('');
  // const [movieData, setMovieData] = useState([]);

  // const dispatch = useDispatch();

  // const { movies, hasMore } = useSelector(
  //   (state) => ({ 
  //     movies: state.movieReducer.movieList,
  //     hasMore: state.movieReducer.hasMore
  //   }),
  //   shallowEqual
  // );

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
      setIsDetail: movieContext.setIsDetail
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
    setIsDetail 
  } = movieProps;

  const observer = useRef();
  const lastMovieElementRef = useCallback((node) => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prevPage => prevPage + 1);
      }
    });
    if (node) {
      observer.current.observe(node);
    }
  }, [hasMore]);

  useEffect(() => {
    setIsDetail(false);
  }, []);

  useEffect(() => {
    if (!search) {
      setSearch('batman');
    }
    setMovies([]);
    setSuggestion([]);
  }, [search]);

  useEffect(() => {
    let cancel;
    axios({
      method: "GET",
      url: API_URL,
      params: { s: search, page },
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((resp) => {
        if (resp.data.Search) {
          setMovies(prevMovies => {
            return [...prevMovies, ...resp.data.Search.map(el => el)];
          });
          if (search && search !== 'batman' && page === 1) {
            setSuggestion(resp.data.Search);
          }
          setHasMore(resp.data.Search.length > 0);
        }
        if (resp.data.Error) {
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
    // dispatch(fetchMovies(search, page));
  }, [search, page]);
  
  return (
    <div className="app-container">
      <div className="d-flex flex-row flex-wrap justify-content-center align-items-center">
        {movies.length > 0 ? (
          <MovieList
            movies={movies}
            lastMovieElementRef={lastMovieElementRef}
          />
        ) : (
          <div style={{ height: "35rem" }}>
            <h3 style={{ color: "#fff" }}>{error}</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
