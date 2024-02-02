import { RoleType, User } from "../../generated";

export const isAdmin = (user: User) => {
  return user.roles?.some((role) => role?.name === RoleType.Admin);
};

export const isWriter = (user: User) => {
  return user.roles?.some((role) => role?.name === RoleType.Writer);
};
