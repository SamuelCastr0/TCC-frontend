import fetcher from "..";

export interface UserProps {
  id: number;
  last_login: string;
  is_superuser: boolean;
  is_staff: boolean;
  is_active: boolean;
  date_joined: string;
  name: string;
  email: string;
  groups: any[];
  user_permissions: any[];
}

const retrieve = async () => {
  const response = await fetcher("get")<UserProps>(`user/me/`);

  return response;
};

export default retrieve;
