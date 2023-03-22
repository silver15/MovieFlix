import "./styles.css";
import { Movies } from "type/movies";

type Props = {
  movies: Movies;
}

const MovieCard = ( {movies } : Props) => {
  return (
    <div className="base-card movie-card">
      <div className="card-top-container">
        <img src={movies.imgUrl} alt="Nome do Filme" />
      </div>
      <div className="card-bottom-container">
        <h6>{movies.title}</h6>
        <p>{movies.year}</p>
        <div className="card-subtitulo">
        <p>{movies.subTitle}</p>
        </div>
       
      </div>
    </div>
  );
};

export default MovieCard;
