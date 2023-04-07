
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';
import { Genre } from 'type/genre';
import { requestBackend } from 'util/requests';

import './styles.css';

export type MovieFilterData = {
  name: string;
  genre: Genre | null;
};

type Props = {
  onSubmitFilter : (data: MovieFilterData) => void;
}


const MovieFilter = ( {onSubmitFilter} : Props) => {

  const [selectGenre, setSelectGenre] = useState<Genre[]>([]);
 

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    control,
  } = useForm<MovieFilterData>();

  const onSubmit = (formData: MovieFilterData) => {
    onSubmitFilter(formData);
  };

  const handleFormClear = () =>{
    setValue('name', '');
    setValue('genre', null);
  }

  const handleChangeRange = (value: Genre) => {
    setValue('genre', value);

    const obj: MovieFilterData ={
      name: getValues('name'),
      genre: getValues('genre')
    }
    onSubmitFilter(obj);
  }

  useEffect(() => {
    requestBackend({ url: '/genres', withCredentials:true }).then((response) => {
      setSelectGenre(response.data);
    });
  }, []);

  return (
    <div className=" base-card movie-filter-container">
      <form onSubmit={handleSubmit(onSubmit)} className="movie-filter-form">
        
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
                        className="movie-selecect"
                       
                        onChange={value =>handleChangeRange(value as Genre)}
                        getOptionLabel={(genre: Genre) => genre.name}
                        getOptionValue={(genre: Genre) =>  String(genre.id)
                        }
                      />
                    )}
                  />
          </div>
          <button onClick={handleFormClear} className="btn btn-outline-primary">Limpar</button>
        </div>
      </form>
    </div>
  );
};
export default MovieFilter;


