
import { AxiosRequestConfig } from 'axios';
import MovieCard from 'components/MovieCard';
import Pagination from 'components/Pagination';
import { useEffect, useState } from 'react';
import { Movies } from 'type/movies';
import { SpringPage } from 'type/vendor/spring';
import { requestBackend } from 'util/requests';

import './styles.css';

const MovieCatalog = () => {
  const [page, setPage] = useState<SpringPage<Movies>>();

  useEffect(() => {
    const config: AxiosRequestConfig = {
      method: 'GET',
      url: '/movies',
      params: {
        page: 0,
        size: 3,
      },
    };

    requestBackend(config).then((response) => {
      setPage(response.data);
    });
  }, []);

  return (
    <div className=" container my-4">
      <div className="base-card movie-filter-container">Seach bar</div>
      <div className="row">
        {page?.content.map((movies) => (
          <div key={movies.id} className="col-sm-6 col-lg-4 col-xl-3">
            <MovieCard movies={movies} />
          </div>
        ))}
      </div>

      <div className="row">
        <Pagination />
      </div>
    </div>
  );
};

export default MovieCatalog;
