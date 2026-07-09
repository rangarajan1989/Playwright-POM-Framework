import { APIRequestContext } from "@playwright/test";

export class ApiHelper {
  private readonly request: APIRequestContext;
  private readonly baseURL: String;

  constructor(request: APIRequestContext, baseURL: string) {
    this.request = request;
    this.baseURL = baseURL;
  }

  async get(endPoint: string, header?: Record<string, string>) {
    let response = await this.request.get(`${this.baseURL}${endPoint}`, {
      headers: header,
    });
    console.log("API_URL from env:", process.env.API_URL);

    return {
      status: response.status(),
      body: await response.json(),
    };
  }

  async post(endPoint: string, data: object, header?: Record<string, string>) {
    let response = await this.request.post(`${this.baseURL}${endPoint}`, {
      headers: header,
      data: data,
    });
    return {
      status: response.status(),
      body: await response.json(),
    };
  }

  async put(endPoint: string, data: object, header?: Record<string, string>) {
    let response = await this.request.put(`${this.baseURL}${endPoint}`, {
      headers: header,
      data: data,
    });
    return {
      status: response.status(),
      body: await response.json(),
    };
  }
  async delect(endPoint: string, header?: Record<string, string>) {
    let response = await this.request.delete(`${this.baseURL}${endPoint}`, {
      headers: header,
    });
    return {
      status: response.status(),
    };
  }
}
