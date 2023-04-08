import { AxiosRequestConfig } from 'axios';
import Button from 'components/Button';
import { useForm } from 'react-hook-form';
import { Review } from 'type/reviews';
import { requestBackend } from 'util/requests';
import { toast } from 'react-toastify';

import './styles.css';

type Props = {
  movieId: string;
  onInsertReview: (review: Review) => void;
};

type FormData = {
  movieId: number;
  text: string;
};

const ReviewForm = ({ movieId, onInsertReview }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm<FormData>();

  const onSubmit = (formData: FormData) => {
    formData.movieId = parseInt(movieId);

    console.log(formData);

    const config: AxiosRequestConfig = {
      method: 'POST',
      url: '/reviews',
      data: formData,
      withCredentials: true,
    };

    requestBackend(config)
      .then((response) => {
        setValue('text', '')
        onInsertReview(response.data);
        toast.info('Avaliação realizado com sucesso');
      })
      .catch((error) => {
        console.log("error");
      });
  };

  return (
    <div className="base-card evaluation-card">
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <input
              {...register('text', {
                required: 'Campo obrigatório',

              })}
              type="text"
              name="text"
              className="form-control evaluation-input base-input"
              placeholder="Deixe sua avaliação aqui"
            />
            <div>{errors.text?.message}</div>
          </div>
          <div className="evaluation-submit">
            <Button text="Salvar Avaliação" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewForm;
