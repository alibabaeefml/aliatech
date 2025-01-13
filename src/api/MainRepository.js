import { BaseApi } from "./BaseApi";

export class MainRepository extends BaseApi {
  constructor() {
    super("/main/main/"); // Base URL
  }

  createForm(data) {
    return this.post("form", data);
  }

  getForm(id) {
    return this.get(`form`, { id });
  }

  updateForm(id, data) {
    return this.put(`form`, { id, ...data });
  }

  deleteForm(id) {
    return this.delete(`form?id=${id}`);
  }

  getForms(params) {
    return this.get("forms", params);
  }
}
