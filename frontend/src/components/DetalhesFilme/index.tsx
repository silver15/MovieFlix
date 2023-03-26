import { AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Movies } from 'type/movies';
import { requestBackend } from 'util/requests';

import './styles.css';

type UrlParams = {
  moviesId: string;
};

const DetalhesFilme = () => {
  const { moviesId } = useParams<UrlParams>();

  const [movies, setMovies] = useState<Movies>();

  useEffect(() => {
    const config: AxiosRequestConfig = {
      method: 'GET',
      url: `/movies/${moviesId}`,
      withCredentials: true,
      
    };

    requestBackend(config).then((response) => {
      setMovies(response.data);
    });
    
  }, [moviesId]);

  return (
    <>
      <div className="movie-details-container">
        <div className="base-card movie-details-card">
          <div className="row">
            <div className="col-xl-6">
              <div className="img-container">
                <img src={movies?.imgUrl} alt={movies?.imgUrl} />
              </div>
            </div>
            <div className="col-xl-6">
              <div className="name-movie">
                <h6>{movies?.subTitle}</h6>
                <p>{movies?.year}</p>
                <div className="subtitulo-descrition">
                  <p>{movies?.subTitle}</p>
                </div>
              </div>
              <div className="description-container">
                <p>{movies?.synopsis}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetalhesFilme;
