import fetcher from "..";

export interface CreateProps {
  name: string;
  email: string;
  password: string;
  lattes: string;
  googleScholar: string;
  researchGate: string;
  linkedin: string;
  orcid: string;
  github: string;
  course: string;
  category: "GRADUATE" | "MASTERING" | "PHD" | "PROFESSOR";
  oia: boolean;
}

const create = async (values: CreateProps) => {
  const response = await fetcher("post")(`user/create/`, values);

  return response;
};

export default create;
