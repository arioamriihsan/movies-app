import React, { createContext, useContext, useState } from "react";

const MovieContext = createContext();

export const useMovieContext = () => useContext(MovieContext);

export const MovieConsumer = () => MovieContext.Consumer;

export const MovieProvider = ({ children }) => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [suggestion, setSuggestion] = useState([]);
  const [isDetail, setIsDetail] = useState(false);
  
  const value = {
    search,
    page,
    hasMore,
    suggestion,
    isDetail,
    setSearch,
    setPage,
    setHasMore,
    setSuggestion,
    setIsDetail
  };

  return (
    <MovieContext.Provider value={value}>
      {children}
    </MovieContext.Provider>
  );
};