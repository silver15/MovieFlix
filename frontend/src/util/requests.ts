import axios from 'axios';
import qs from 'qs';
import history from './history';
import jwtDecode from 'jwt-decode';

type Role = 'ROLE_VISITOR' | 'ROLE_MEMBER';

export type TokenData = {
  exp: number;
  user_name: string;
  authorities: Role[];

}

type LoginResponse = {
  access_token: string;
  expires_in: number;
  scope: string;
  token_type: string;
  userFirstName: string;
  userId: number;
};

export const BASE_URL =
  process.env.REACT_APP_BACKEND_URL ??
  'https://movieflix-devsuperior.herokuapp.com';

const tokenKey = 'authData';

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID ?? 'myclientid';
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET ?? 'myclientsecret';

type LoginData = {
  username: string;
  password: string;
};

export const requestBackendLogin = (loginData: LoginData) => {
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    Authorization: 'Basic ' + window.btoa(CLIENT_ID + ':' + CLIENT_SECRET),
  };

  const data = qs.stringify({
    ...loginData,
    grant_type: 'password',
  });

  return axios({
    method: 'POST',
    baseURL: BASE_URL,
    url: '/oauth/token',
    data,
    headers,
  });
};

export const saveAuthData = (obj: LoginResponse) => {
  localStorage.setItem(tokenKey, JSON.stringify(obj));
};

export const getAuthData = () => {
  const str = localStorage.getItem(tokenKey) ?? '{}';
  return JSON.parse(str) as LoginResponse;
};

export const removeAuthData = () => {
  localStorage.removeItem(tokenKey);
};

axios.interceptors.request.use(function (config) {
  console.log("INTERCEPTOR ANTES DA REQUISIÇÃO");
  return config;
}, function (error) {
  console.log("INTERCEPTOR ERRO NA REQUISIÇÃO");
  return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
  console.log("INTERCEPTOR RESPOSTA COM SUCESSO");
  return response;
}, function (error) {
  if (error.response.status === 401 || error.response.status === 403){
    history.push('/auth');
  }
  console.log("INTERCEPTOR RESPOSTA COM ERRO");
  return Promise.reject(error);
});

export const getTokenData = () : TokenData | undefined => {
  const LoginResponse = getAuthData();

  try{
    return jwtDecode(LoginResponse.access_token) as TokenData;
  }
  catch(error){
    return undefined;
  }
}

export const isAuthenticated = () : boolean => {
  const tokenData = getTokenData();
  return (tokenData && tokenData.exp * 1000 > Date.now()) ? true : false;
}

export const hasAnyRoles = (roles: Role[]) : boolean => {

  if (roles.length ===0){
    return true;
  }

  const tokenData = getTokenData();

  if(tokenData !== undefined){
    for(var i =0; i < roles.length; i++){
      if(tokenData.authorities.includes(roles[i])){
        return true;
      }
    }
    return false;
  }
  return false;
}
