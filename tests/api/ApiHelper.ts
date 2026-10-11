import { APIRequestContext } from "@playwright/test";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

export class ApiHelper {
  private readonly request: APIRequestContext;
  private readonly baseURL: string;

  constructor(request: APIRequestContext, baseURL: string) {
    this.request = request;
    this.baseURL = baseURL;
  }

  private async sendRequest(
    method: HttpMethod,
    endPoint: string,
    options: { headers?: Record<string, string>; data?: object } = {},
  ) {
    const url = `${this.baseURL}${endPoint}`;

    let response;
    switch (method) {
      case "GET":
        response = await this.request.get(url, { headers: options.headers });
        break;
      case "POST":
        response = await this.request.post(url, {
          headers: options.headers,
          data: options.data,
        });
        break;
      case "PUT":
        response = await this.request.put(url, {
          headers: options.headers,
          data: options.data,
        });
        break;
      case "DELETE":
        response = await this.request.delete(url, { headers: options.headers });
        break;
    }

    console.log(`API ${method} ${url} -> ${response.status()}`);

    const status = response.status();
    if (method === "DELETE") {
      return { status };
    }
    return { status, body: await response.json() };
  }

  async get(endPoint: string, headers?: Record<string, string>) {
    return this.sendRequest("GET", endPoint, { headers });
  }

  async post(endPoint: string, data: object, headers?: Record<string, string>) {
    return this.sendRequest("POST", endPoint, { headers, data });
  }

  async put(endPoint: string, data: object, headers?: Record<string, string>) {
    return this.sendRequest("PUT", endPoint, { headers, data });
  }

  async delete(endPoint: string, headers?: Record<string, string>) {
    return this.sendRequest("DELETE", endPoint, {});
  }
}
