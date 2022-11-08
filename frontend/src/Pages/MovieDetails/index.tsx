import { AxiosRequestConfig } from 'axios';
import ReviewForm from 'components/ReviewForm';
import ReviewFormListing from 'components/ReviewFormListing';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Review } from 'type/review';
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

  return (
    <div className="container">
      <h1>Tela Listagem de filme id: {movieId}</h1>
      {hasAnyRoles(['ROLE_MEMBER']) && (
      <ReviewForm movieId={movieId} />
      )}
      <ReviewFormListing reviews ="" />

    </div>
  );
};

export default MoviesDetails;
