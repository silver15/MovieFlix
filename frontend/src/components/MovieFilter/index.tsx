import { ReactComponent as SearchIcon } from 'assets/image/search-icon.svg';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';
import { Genre } from 'type/genres';
import { requestBackend } from 'util/requests';

import './styles.css';

const MovieFilter = () => {

  const [selectGenre, setSelectGenre] = useState<Genre[]>([]);

  type MovieFilterData = {
    name: string;
    genres: Genre;
  };

  const {
    register,
    handleSubmit,
    control,
  } = useForm<MovieFilterData>();

  const onSubmit = (formData: MovieFilterData) => {
    console.log('Enviou', formData);
  };

  useEffect(() => {
    requestBackend({ url: '/genres' }).then((response) => {
      setSelectGenre(response.data.content);
    });
  }, []);

  return (
    <div className=" base-card movie-filter-container">
      <form onSubmit={handleSubmit(onSubmit)} className="movie-filter-form">
        <div className="movie-filter-name-container">
          <input
            {...register('name')}
            type="text"
            className="form-control"
            placeholder="Nome do Filme"
            name="name"
          />
          <button>
            <SearchIcon />
          </button>
        </div>
        <div className="movie-filter-botton-container">
          <div className="movie-filter-range-container">
          <Controller
                    name="genres"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={selectGenre}
                        isClearable
                        classNamePrefix="product-crud-select"
                        getOptionLabel={(genres: Genre) => genres.name}
                        getOptionValue={(genres:Genre) =>  String(genres.id)
                        }
                      />
                    )}
                  />
          </div>
          <button className="btn btn-outline-primary">Limpar</button>
        </div>
      </form>
    </div>
  );
};
export default MovieFilter;
