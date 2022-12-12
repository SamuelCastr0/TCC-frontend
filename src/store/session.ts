import { reactive } from "vue";
import jwt from "jwt-decode";

export interface TokenProps {
    id: number
    exp: number
    iat: number
    isStaff: boolean
}

const store = reactive({
  get accessToken() {
    return localStorage.getItem('access_token')
  },
  get refreshToken() {
    return localStorage.getItem('refresh_token')
  },
  get isStaffSession() {
    return jwt<TokenProps>(this.accessToken as string).isStaff
  },
  setSession: (accessToken: string, refreshToken: string) => {
    localStorage.setItem('access_token', accessToken);
    localStorage.setItem('refresh_token', refreshToken);
  },
  setAccessToken: (accessToken: string) => {
    localStorage.setItem('access_token', accessToken);
  },
  deleteSession() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }
});

export default store;