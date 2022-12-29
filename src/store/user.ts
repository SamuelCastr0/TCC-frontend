import retrieve from "@/api/auth/retrieve";
import type { UserProps } from "@/api/auth/retrieve";
import { reactive } from "vue";
import session from "./session";

export interface UserStoreProps {
  value: UserProps | null;
  isFetching: boolean;
  isUserIn: boolean;
  socialUser: any;
  setSocialUser: (user: any) => void;
  retrieveUser: () => void;
  clearStore: () => void;
}

const user = reactive<UserStoreProps>({
  get value() {
    const user = window.localStorage.getItem("user");
    if (user) return JSON.parse(user);
    return null;
  },
  get isUserIn() {
    if (session.accessToken) return true;
    return false;
  },
  isFetching: false,
  setSocialUser: (user) => {
    window.localStorage.setItem("socialUser", JSON.stringify(user));
  },
  get socialUser() {
    return JSON.parse(window.localStorage.getItem("socialUser") as string);
  },
  retrieveUser: async function () {
    try {
      this.isFetching = true;
      const { data } = await retrieve();
      window.localStorage.setItem("user", JSON.stringify(data));
    } finally {
      this.isFetching = false;
    }
  },
  clearStore: function () {
    window.localStorage.removeItem("user");
    window.localStorage.removeItem("socialUser");
  },
});

export default user;
