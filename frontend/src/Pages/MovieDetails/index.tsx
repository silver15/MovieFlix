
import { AxiosRequestConfig } from 'axios';
import ReviewForm from 'components/ReviewForm';
import ReviewFormListing from 'components/ReviewFormListing';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Review } from 'type/reviews';
import { hasAnyRoles, requestBackend } from 'util/requests';

import './styles.css';

type urlParams = {
  movieId: string;
};

const MoviesDetails = () => {


  

  const { movieId } = useParams<urlParams>();

  const [reviews, setReviews] = useState<Review[]>([]);


  useEffect(() => {
    const config: AxiosRequestConfig = {
      method: 'GET',
      url: `/movies/${movieId}/reviews`,
      withCredentials: true,
    };
    requestBackend(config).then((response) => {
      setReviews(response.data);
    });
  }, [movieId]);

  const handleInsertReview = (review: Review) => {
    const clone = [...reviews];
    clone.push(review);
    setReviews(clone);
  };



  return (
    <>
   <div className="movie-details-container">
      <div className="base-card movie-details-card">
        <div className="row">
          <div className="col-xl-6">
            <div className="img-container">
                <img src="https://image.tmdb.org/t/p/w533_and_h300_bestv2/wu1uilmhM4TdluKi2ytfz8gidHf.jpg" alt="Nome do filme" />
            </div>
          </div>
          <div className="col-xl-6">
            <div className="name-movie">
                <h6>O Retorno do Rei</h6>
                <p>2013</p>
                <div className="subtitulo-descrition">
                <p >O olho do inimigo está se movendo.</p>
                </div>
               
            </div>
            <div className="description-container">
                <p>Onde está Gary? Segundo Bob Esponja, Gary foi 
                    \"caracolstrado\" pelo temível Rei Poseidon e 
                    levado para a cidade perdida de Atlantic City. 
                    Junto a Patrick Estrela, ele sai em uma missão 
                    de resgate ao querido amigo, e nesta jornada os 
                    dois vão conhecer novos personagens e viver 
                    inimagináveis aventuras."</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  


      <div className="container">
        <h1>Tela Listagem de filme id: {movieId}</h1>
        {hasAnyRoles(['ROLE_MEMBER']) && (
          <ReviewForm movieId={movieId} onInsertReview={handleInsertReview} />
        )}
        {reviews?.map((item) => (
          <div key={item.id}>
            <ReviewFormListing name={item.user.name} text={item.text} />
          </div>
        ))}
      </div>
    </>
  );
};

export default MoviesDetails;
