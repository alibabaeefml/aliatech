import { MainRepository } from "../api/MainRepository";
import { AuthRepository } from "../api/AuthRepository";

const repositories = {
  main: new MainRepository(),
  auth: new AuthRepository(),
};

export const useRepository = (name) => repositories[name];
