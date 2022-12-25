import fetcher from "..";

export interface ResponseProps {
  access_token: string;
  refresh_token: string;
  is_staff: boolean;
}

const signIn = async (email: string, password: string) => {
  const response = await fetcher("post")<ResponseProps>(`user/login/`, {
    email,
    password,
  });

  return response;
};

export default signIn;
