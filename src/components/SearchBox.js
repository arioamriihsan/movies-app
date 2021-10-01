import React, { useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { useMovieContext } from './MovieContext';

const SearchBox = () => {

  const history = useHistory();

  // Context 
  const movieContext = useMovieContext();
  const movieProps = useMemo(() => {
    return {
      search: movieContext.search,
      setSearch: movieContext.setSearch,
      setPage: movieContext.setPage,
      suggestion: movieContext.suggestion,
      setSuggestion: movieContext.setSuggestion
    }
  }, [movieContext]);

  const { search, setPage, setSearch, suggestion, setSuggestion } = movieProps;

  const handleChange = event => {
    setSearch(event.target.value);
    setPage(1);
  }

  const handleClick = (id) => {
    setSuggestion([]);
    setSearch('');
    history.push(`/detail/${id}`);
  }
  
  return (
    <>
    <div 
      className="search-box input-group"
      onBlur={() => {
        setTimeout(() => {
          setSuggestion([]);
        }, 300);
      }}
    >
      <input 
        onChange={handleChange}
        className="form-control"
        type="text" 
        placeholder="Please type movie's title" 
      />
      <div className="input-group-prepend">
        <span className="input-group-text" id="basic-addon1">
          <i className="fa fa-search" />
        </span>
      </div>
    </div>
    <div className='suggestion-search'>
        {suggestion.length > 0 && suggestion.map((sugg, idx) => {
          return (
            <div 
              key={`${sugg}-${idx}`} 
              className='movie-suggest' 
              onClick={() => handleClick(sugg.imdbID)}
            >
              {sugg.Title}
            </div>
          )
        })}
      </div>
    </>
  );
}

export default SearchBox;