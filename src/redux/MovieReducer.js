import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from '../support/api';

const initialState = {
  loading: false,
  movieList: [],
  suggestion: [],
  hasMore: false,
  error: ''
};

const { actions, reducer } = createSlice({
  name: 'MovieReducer',
  initialState,
  reducers: {
    startCall: (state) => {
      state.loading = true;
    },
    moviesFetched: (state, action) => {
      state.loading = false;
      state.movieList = action.payload;
    },
    suggestionFetched: (state, action) => {
      state.loading = false;
      state.suggestion = [action.payload];
    },
    hasMoreList: (state) => {
      state.hasMore = true
    },
    clearMovieList: (state) => {
      state.movieList = initialState.movieList;
    },
    clearMovieSuggestion: (state) => {
      state.suggestion = initialState.suggestion;
    },
    catchError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
  }
});

export default reducer;

export const { 
  startCall,
  moviesFetched,
  suggestionFetched,
  hasMoreList,
  clearMovieList,
  clearMovieSuggestion,
  catchError
} = actions;

export const fetchMovies = (search, page) => async (dispatch) => {
  dispatch(actions.startCall());
  try {
    let cancel;
    let { data } = await axios({
      method: 'GET',
      url: API_URL,
      params: { s: search, page },
      cancelToken: new axios.CancelToken((c) => (cancel = c))
    });
    
    if (data.Search) {
      dispatch(actions.moviesFetched(data.Search));
      
      if (search && search !== 'batman') {
        dispatch(actions.suggestionFetched(data.Search));
      }
      dispatch(actions.hasMoreList(data.Search.length > 0));
    }

    if(data.Error) {
      dispatch(actions.catchError(data.Error));
    }
    return () => cancel();
  } catch (err) {
    if (axios.isCancel(err)) {
      return;
    }
    return window.alert(err);
  }
}