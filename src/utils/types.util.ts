export type UserSimple = {
  uid: string;
  username: string;
  avatar: string;
};

export type User = {
  uid: string;
  username: string;
  avatar: string;
  email: string;
  account_address: string;
  account_balance: string;
};

export type UserDoc = {
  username: string;
  avatar: string;
  email: string;
  account_address: string;
  account_balance: string;
};

export type Result<T> = {
  data: T;
  returnCode: string;
};
