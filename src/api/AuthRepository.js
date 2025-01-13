import { BaseApi } from "./BaseApi";

export class AuthRepository extends BaseApi {
  constructor() {
    super("/main/main/"); // Calls the constructor of the BaseApi class with a parameter
  }

  signup(data) {
    return this.post("signup", data);
  }
}
