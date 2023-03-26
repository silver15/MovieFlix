
import { AxiosRequestConfig } from 'axios';
import MovieCard from 'components/MovieCard';
import MovieFilter from 'components/MovieFilter';
import Pagination from 'components/Pagination';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Movies } from 'type/movies';
import { SpringPage } from 'type/vendor/spring';
import { requestBackend } from 'util/requests';

import './styles.css';

const MovieCatalog = () => {
  const [page, setPage] = useState<SpringPage<Movies>>();

  useEffect(() => {
    getMovies(0);
  }, []);

  const getMovies = (pageNumber: number) => {
  const config: AxiosRequestConfig = {
    method: 'GET',
    url: '/movies',
    withCredentials: true,
    params: {
      page: pageNumber,
      size: 4,
    },
  };

  requestBackend(config).then((response) => {
    setPage(response.data);
  });
};

  return (
    <div className=" container my-4">
      <MovieFilter />
      <div className="row">
        {page?.content.map((movies) => (
        
          <div key={movies.id} className="col-sm-6 col-lg-4 col-xl-3">
            <Link to={`/movies/${movies.id}`}>
            <MovieCard movies={movies} />
            </Link>
          </div>
        ))}
      </div>

      <div className="row">
        <Pagination 
        pageCount={(page) ? page.totalPages : 0}
        range={3}
        onChange={getMovies}
        />
      </div>
    </div>
  );
};

export default MovieCatalog;
