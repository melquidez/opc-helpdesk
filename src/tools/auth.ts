import jwt from 'jsonwebtoken';
import {cookies} from 'next/headers';

const secretKey = 'secret'; // Replace with a secure secret key

export const generateToken = (data: any): string => {
  return jwt.sign(data, secretKey, { expiresIn: '1h' });
};

export const verifyToken = (token: string): any => {
  return jwt.verify(token, secretKey);
};

export const decodeToken = (token:string): any =>{
    return jwt.decode(token);
}


export const setAuthToken = (token:string) =>{
    cookies().set(secretKey,token);
}

export const getAuthToken = ():any => {
    return cookies().get(secretKey);
}

export const userDetails = () => {
    return decodeToken(getAuthToken().value || null);
}

export const clearAuthToken = () =>{
    cookies().delete(secretKey);
}


export const isLoggedIn = () =>{
    return !!cookies().has(secretKey);
}
