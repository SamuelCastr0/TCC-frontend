import fetcher from "..";

const logout = async () => {
  const response = await fetcher("post")(`user/logout/`);

  return response;
};

export default logout;
