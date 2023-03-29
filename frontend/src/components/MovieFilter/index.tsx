import { ReactComponent as SearchIcon } from 'assets/image/search-icon.svg';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';
import { Genre } from 'type/genre';
import { requestBackend } from 'util/requests';

import './styles.css';

type MovieFilterData = {
  name: string;
  genre: Genre | null;
};


const MovieFilter = () => {

  const [selectGenre, setSelectGenre] = useState<Genre[]>([]);


  const {
    register,
    handleSubmit,
    control,
  } = useForm<MovieFilterData>();

  const onSubmit = (formData: MovieFilterData) => {
    console.log('Enviou', formData);
  };


  useEffect(() => {
    requestBackend({ url: '/genres', withCredentials:true }).then((response) => {
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
          <button className="movie-filter-search-icon">
            <SearchIcon />
          </button>
        </div>
        <div className="movie-filter-botton-container">
          <div className="movie-filter-range-container">
          <Controller
                    name="genre"                    
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={selectGenre}
                        isClearable
                        placeholder="Gêneros"
                        classNamePrefix="product-crud-select"
                        getOptionLabel={(genre: Genre) => genre.name}
                        getOptionValue={(genre: Genre) =>  String(genre.id)
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


