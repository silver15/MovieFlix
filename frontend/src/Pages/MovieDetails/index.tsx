import { AxiosRequestConfig } from 'axios';
import DetalhesFilme from 'components/DetalhesFilme';
import ReviewForm from 'components/ReviewForm';
import ReviewFormListing from 'components/ReviewFormListing';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Review } from 'type/reviews';
import { hasAnyRoles, requestBackend } from 'util/requests';

import './styles.css';

type urlParams = {
  moviesId: string;
};

const MoviesDetails = () => {
  const { moviesId } = useParams<urlParams>();

  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const config: AxiosRequestConfig = {
      method: 'GET',
      url: `/movies/${moviesId}/reviews`,
      withCredentials: true,
    };
    requestBackend(config).then((response) => {
      setReviews(response.data);
    });
  }, [moviesId]);

  const handleInsertReview = (review: Review) => {
    const clone = [...reviews];
    clone.push(review);
    setReviews(clone);
  };

  return (
    <>
      <DetalhesFilme />

      <div className="container">
      
        {hasAnyRoles(['ROLE_MEMBER']) && (
          <ReviewForm movieId={moviesId} onInsertReview={handleInsertReview} />
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
