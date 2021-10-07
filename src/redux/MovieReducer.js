import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from '../support/api';

const initialState = {
  loading: false,
  movieDetails: null,
  error: ""
};

const { actions, reducer } = createSlice({
  name: 'MovieReducer',
  initialState,
  reducers: {
    startCall: (state) => {
      state.loading = true;
    },
    setMovieDetails: (state, action) => {
      state.error = initialState.error;
      state.loading = false;
      state.movieDetails = action.payload;
    },
    clearMovieDetails: (state) => {
      state.movieDetails = initialState.movieDetails;
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
  setMovieDetails,
  clearMovieDetails,
  catchError
} = actions;

export const getDetails = (id) => async (dispatch) => {
  dispatch(actions.startCall());
  try {
    let { data } = await axios.get(`${API_URL}&i=${id}&plot=full`);
    dispatch(actions.setMovieDetails(data));
  } catch (error) {
    dispatch(actions.catchError());
    window.alert(error);
  }
}