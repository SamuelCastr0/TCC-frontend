import axios, { AxiosError, AxiosRequestConfig } from "axios";
import session from "@/store/session";
import user from "@/store/user";

export type Method = "get" | "delete" | "post" | "put" | "patch";

export interface ApiErrorProps {
  detail: string;
}

export const http = axios.create({ baseURL: "http://127.0.0.1:8000/api/" });

const fetcher =
  (method: Method) =>
  async <ResponseProps>(
    path: string,
    body?: Record<string, any>,
    config?: AxiosRequestConfig
  ) => {
    const headers = session.accessToken
      ? { Authorization: session.accessToken }
      : {};
    const { data, status } =
      method === "get"
        ? await http[method]<ResponseProps>(path, {
            ...config,
            headers: { ...config?.headers, ...headers },
          })
        : await http[method]<ResponseProps>(path, body, {
            ...config,
            headers: { ...config?.headers, ...headers },
          });

    return { data, status };
  };

http.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (
      (error as AxiosError).response?.status === 401 &&
      session.refreshToken
    ) {
      try {
        const { data } = await axios.post<{ access_token: string }>(
          "http://127.0.0.1:8000/api/user/refresh/",
          {
            refresh_token: session.refreshToken,
          }
        );
        session.setAccessToken(data.access_token);
        error.config.headers["Authorization"] = session.accessToken;
        return axios.request(error.config);
      } catch {
        session.deleteSession();
        user.clearStore();
        window.location.reload();
      }
    }
    return Promise.reject(error);
  }
);

export default fetcher;
