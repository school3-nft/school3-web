import { Timestamp } from "firebase/firestore";

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
  seed: string;
  sequence: number;
  isAdmin: boolean;
};

export type UserDoc = {
  username: string;
  avatar: string;
  email: string;
  account_address: string;
  account_balance: string;
  seed: string;
  sequence: number;
  isAdmin: boolean;
};

export type Token = {
  token_id: string;
  ipfs: string;
  title: string;
  uid: string;
  type: TokenType;
  author: string;
  description: string;
};

export type TokenDoc = {
  ipfs: string;
  uid: string;
  type: TokenType;
  author: string;
  description: string;
};

export type Auction = {
  auction_id: string;
  uid: string;
  title: string;
  token_id: string;
  type: TokenType;
  currentBid: number;
  currentBidderUid: string;
  creationDate: Timestamp;
  endDate: Timestamp;
};

export type AuctionDoc = {
  uid: string;
  title: string;
  token_id: string;
  type: TokenType;
  currentBid: number;
  currentBidderUid: string;
  creationDate: Timestamp;
  endDate: Timestamp;
};

export type Result<T> = {
  data: T;
  returnCode: string;
};

export type SignState = "false" | "true" | "loading";
export type TokenType = "image" | "sound" | "text";
