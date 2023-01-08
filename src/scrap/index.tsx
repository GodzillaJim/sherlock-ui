import { v4 } from "uuid";
import { User } from "../generated";

export const getUser = () => {
  const user: User = {
    id: `id-${v4()}`,
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    roles: [],
    username: "",
  };
};
