import React, { useState, useEffect, useMemo } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useMovieContext } from "../components/MovieContext";
import { API_URL } from "../support/api";

const DetailMovie = () => {
  const [detail, setDetail] = useState(null);
  const { id } = useParams();
  
  // Context
  const movieContext = useMovieContext();
  const movieProps = useMemo(() => {
    return {
      setIsDetail : movieContext.setIsDetail
    };
  }, [movieContext]);

  let {setIsDetail} = movieProps;

  useEffect(() => {
    axios.get(`${API_URL}&i=${id}&plot=full`)
    .then(resp => {
      setDetail(resp.data);
    })
    .catch(err => window.alert(err));

    setIsDetail(true);
  }, []);
  

  if (!detail) {
    return (
      <div className='container d-flex justify-content-center align-items-center' style={{ minHeight: '30rem' }}>
        <div className="spinner-border text-primary " role="status" style={{ width: '10rem', height: '10rem' }} />
      </div>
    );
  }
  return (
    <div className="app-container">
      <div className="container">
        <div className="row">
          <div className="col-md-4 col-sm-12">
            <img
              className="poster-detail"
              src={detail.Poster}
              alt={detail.Title}
            />
          </div>
          <div className="col-md-8 col-sm-12">
            <div className="card">
              <ul className="list-group">
                <li className="list-group-item d-flex flex-row">
                  <strong>Genre </strong> :
                  {detail.Genre.split(",").map((el) => (
                    <h5 className="ml-3">
                      <span className="badge badge-warning">{el}</span>
                    </h5>
                  ))}
                </li>
                <li className="list-group-item">
                  <strong>{detail.Title}</strong> ({`${detail.Year}`})
                </li>
                <li className="list-group-item"><i>{detail.Plot}</i></li>

                <li className="list-group-item">
                  <strong>Director</strong> : {detail.Director}
                </li>
                <li className="list-group-item">
                  <strong>Actors</strong> : {detail.Actors}
                </li>
                <li className="list-group-item">
                  <strong>Writer</strong> : {detail.Writer}
                </li>
                <li className="list-group-item">
                  <strong>Production</strong> : {detail.Production}
                </li>
                <li className="list-group-item">
                  <strong>Awards</strong> : {detail.Awards}
                </li>
                <li className="list-group-item">
                  <strong>Duration</strong> : {detail.Runtime}
                </li>
                <li className="list-group-item">
                  <strong>Country</strong> : {detail.Country}
                </li>
                <li className="list-group-item">
                  <strong>Rating IMDB</strong> : {detail.imdbRating}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailMovie;
