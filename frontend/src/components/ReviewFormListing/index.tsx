import './styles.css';

    type Props = {
       reviews: string;
    }

    const ReviewFormListing = ({ reviews} : Props) => {

        return(
            <div>
                <p>titulo: {reviews}</p>
            </div>
        )
    }

    export default ReviewFormListing;



