
import { AxiosRequestConfig } from 'axios';
import MovieCard from 'components/MovieCard';
import MovieFilter, { MovieFilterData } from 'components/MovieFilter';
import Pagination from 'components/Pagination';
import { useEffect, useState, useCallback} from 'react';
import { Link } from 'react-router-dom';
import { Movies } from 'type/movies';
import { SpringPage } from 'type/vendor/spring';
import { requestBackend } from 'util/requests';

import './styles.css';

type ControlComponentsData = {
  activePage: number;
  filterData: MovieFilterData;
}

const MovieCatalog = () => {
  const [page, setPage] = useState<SpringPage<Movies>>();

  const [controlComponentsData, setControlComponentsData] = useState<ControlComponentsData>(
    {
      activePage: 0,
      filterData: {name: "", genre: null}
    }

  );

  const handlePageChange = (pageNumber: number) => {
    setControlComponentsData({ activePage: pageNumber, filterData: controlComponentsData.filterData});
  };

  const handSubmitFilter = (data: MovieFilterData) => {
    setControlComponentsData({ activePage: 0, filterData: data});
  };

  const getMovies = useCallback(() => {
    const config: AxiosRequestConfig = {
      method: 'GET',
      url: '/movies',
      withCredentials: true,
      params: {
        page: controlComponentsData.activePage,
        size: 3,
        name: controlComponentsData.filterData.name,
        genreId: controlComponentsData.filterData.genre?.id

      },
    };

    requestBackend(config).then((response) => {
      setPage(response.data);
    });

  }, [controlComponentsData]);

  useEffect(() => {
    getMovies();
  }, [getMovies]);




  return (
    <div className=" container my-4">
      <MovieFilter onSubmitFilter={handSubmitFilter} />
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
          forcePage={page?.number}
          pageCount={(page) ? page.totalPages : 0}
          range={3}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default MovieCatalog;
