import { Request } from "express";

export interface IRequestAuthenticateRequestProtocol extends Request {
  user: {
    userId: string;
    userEmail: string;
  };
}

export interface ICreateUserProtocol {
  name: string;
  email: string;
  password: string;
}

export interface IUptateUserProtocol {
  name: string;
  email: string;
  password: string;
}
