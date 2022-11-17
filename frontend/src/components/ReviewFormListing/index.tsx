import './styles.css';

export type Props = {
  text: string;
  name: string;
};

const ReviewFormListing = ({ text, name }: Props) => {
  return (
    <div className="comment-details-container">
      <div className="comment-details-header">
        <h1>{name}</h1>
      </div>
      <div className="comment-details-card">
        <p>{text}</p>
      </div>
    </div>
  );
};

export default ReviewFormListing;
