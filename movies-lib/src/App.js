import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies } from './components/moveSlice';
import { useState } from 'react';
import Header from './components/Header';

function App() {
  const dispatch = useDispatch();
  const { movies, loading, error } = useSelector((state) => state.movie);
  const [search, setSearch] = useState('');

  const handleSearch = () => {
    if (search.trim()) {
      dispatch(fetchMovies(search));
    }
  };

  return (
    <div className="container">
      <Header />

      <div className="search">
        <input
          type="text"
          placeholder="Search movies..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {loading && <p className="info">Loading...</p>}
      {error && <p className="error">{error}</p>}

      <div className="movie-grid">
        {movies.map((movie) => (
          <div key={movie.imdbID} className="movie-card">
            <img
              src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/150'}
              alt={movie.Title}
            />
            <h3>{movie.Title}</h3>
            <p>{movie.Year}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
