import fetcher from "..";

const signIn = async (email: string, password: string) => {
  const { data, status } = await fetcher('post')(`user/login/`, { email, password })

  return {
    data,
    status,
  };
};

export default signIn;
