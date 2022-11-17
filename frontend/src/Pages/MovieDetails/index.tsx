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
  }

  return (
    <div className="container">
      <h1>Tela Listagem de filme id: {movieId}</h1>
      {hasAnyRoles(['ROLE_MEMBER']) && <ReviewForm movieId={movieId} onInsertReview={handleInsertReview} />}
      {reviews?.map((item) => (
        <div key={item.id}>
          <ReviewFormListing name={item.user.name} text={item.text} />
        </div>
      ))}
    </div>
  );
};

export default MoviesDetails;
