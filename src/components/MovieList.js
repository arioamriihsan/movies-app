import React, { useState } from 'react';
import ModalImage from './ModalImage';

const MovieList = ({ movies, lastMovieElementRef }) => {

  const [showModal, setShowModal] = useState(false);
  const [selectedImg, setSelectedImg] = useState('');
  const [selectedTitle, setSelectedTitle] = useState('');

  const handleClick = (img, title) => {
    setShowModal(true);
    setSelectedImg(img);
    setSelectedTitle(title);
  }

  return (
    <>
      {movies.map((movie, index) => {
        if (movies.length === index + 1) {
          return (
            <div className='card movie-card' ref={lastMovieElementRef} key={`${movie}-${index}`}>
              <img className='movie-image card-img-top' src={movie.Poster} alt="Poster" onClick={() => handleClick(movie.Poster, movie.Title)} />
              <div className='card-body'>
                <h5 className='card-title' style={{ height: '3.5rem' }}>{`${movie.Title} (${movie.Year})`}</h5>
                {/* <p className='card-text'>{movie.Plot}</p> */}
                <a href={`/detail/${movie.imdbID}`} className='btn btn-primary'>Detail</a>
              </div>
            </div>
          );
        }
        return (
          <div className='card movie-card' key={`${movie}-${index}`}>
            <img className='movie-image card-img-top' src={movie.Poster} alt="Poster" onClick={() => handleClick(movie.Poster, movie.Title)} />
            <div className='card-body'>
              <h5 className='card-title' style={{ height: '3.5rem' }}>{`${movie.Title} (${movie.Year})`}</h5>
              {/* <p className='card-text'>{movie.Plot}</p> */}
              <a href={`/detail/${movie.imdbID}`} className='btn btn-primary'>Detail</a>
            </div>
          </div>
        );
      })}

      {showModal && (
        <ModalImage 
          show={showModal}
          onHide={() => setShowModal(false)}
          image={selectedImg}
          title={selectedTitle}
        />
      )}
    </>
  );
}

export default MovieList;
