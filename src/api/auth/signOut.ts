import fetcher from "..";

const logout = async () => {
  const { data, status } = await fetcher('post')(`user/logout/`)

  return {
    data,
    status,
  };
};

export default logout;
