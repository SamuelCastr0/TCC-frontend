import fetcher from "..";
import { ResponseProps } from "./signIn";

const googleSignIn = async (token: string) => {
  const response = await fetcher("post")<ResponseProps>(`user/login/google/`, {
    idToken: token,
  });

  return response;
};

export default googleSignIn;
