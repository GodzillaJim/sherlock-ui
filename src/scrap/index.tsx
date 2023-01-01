import { v4 } from "uuid";
import { User } from "../generated";

export const getUser = () => {
  const user: User = {
    _id: `id-${v4()}`,
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    roles: [],
    username: "",
  };
};
