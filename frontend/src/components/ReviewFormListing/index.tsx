import './styles.css';

    export type Props = {
      text: string;

    }

 
    const ReviewFormListing = ({ text} : Props) => {

        return(
            <div>
                <div>
                    <div>
                        <h3>Informações</h3>
                        <p><span style={{fontWeight: 'bold'}}> Nome: </span>{text}</p>
                    </div>
                </div>
            </div>
        )
    }

    export default ReviewFormListing;



