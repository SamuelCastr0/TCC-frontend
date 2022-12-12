import fetcher from "..";

const googleSignIn = async (token: string) => {
  const { data, status } = await fetcher('post')(`user/login/google/`, { idToken: token })

  return {
    data,
    status,
  };
};

export default googleSignIn;
