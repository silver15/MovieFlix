import ButtonIcon from 'components/ButtonIcon';
import { useForm } from 'react-hook-form';
import { requestBackendLogin } from 'requests';

import './styles.css';


type FormData = {
  username: string;
  password: string;
};

const Login = () => {
  const { register, handleSubmit, formState:{errors} } = useForm<FormData>();

  const onSubmit = (formData: FormData) => {
    requestBackendLogin(formData)
      .then((response) => {
        console.log('SUCESSO', response);
      })
      .catch((error) => {
        console.log('ERRO', error);
      });
  };

  return (
    <div className="base-card login-card">
      <h1>LOGIN</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <input
            {...register('username', {
              required: 'Campo obrigatório',
              pattern:{
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Email inválido'
              }
            })}
            type="text"
            className={`form-control base-input ${errors.username ? 'is-invalid' : ''}`}
            placeholder="Email"
            name="username"
          />
          <div className="invalid-feedback d-block" >{errors.username?.message}</div>
        </div>
        <div className="mb-2">
          <input
            {...register('password', {
              required: 'Campo obrigatório'
            })}
            type="password"
            className={`form-control base-input ${errors.password ? 'is-invalid' : ''}`}
            placeholder="Senha"
            name="password"
          />
          <div className="invalid-feedback d-block">{errors.password?.message}</div>
        </div>

        <div className="login-submit">
          <ButtonIcon text="Fazer login" />
        </div>
      </form>
    </div>
  );
};

export default Login;
