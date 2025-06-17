import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_KEY = 'b0d2fcd6';

export const fetchMovies = createAsyncThunk(
  'movie/fetchMovies',
  async (searchTerm) => {
    const response = await axios.get(`https://www.omdbapi.com/`, {
      params: { apikey: API_KEY, s: searchTerm },
    });
    return response.data;
  }
);

const movieSlice = createSlice({
  name: 'movie',
  initialState: {
    movies: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload.Search || [];
        state.error = action.payload.Error || null;
      })
      .addCase(fetchMovies.rejected, (state) => {
        state.loading = false;
        state.error = 'Failed to fetch movies';
      });
  },
});

export default movieSlice.reducer;
