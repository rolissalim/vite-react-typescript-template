// USER
interface IUser {
  name: string;
  email: string;
  password: string;
}

export const UserField = {
  name: undefined,
  email: null,
  password: null,
};

export type { IUser };
