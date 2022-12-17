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
  isAdmin: boolean;
};

export type UserDoc = {
  username: string;
  avatar: string;
  email: string;
  account_address: string;
  account_balance: string;
  isAdmin: boolean;
};

export type Token = {
    token_id: string;
    ipfs: string;
    owner_id: string;
    type: TokenType;
    author: string;
    description: string;
}

export type TokenDoc = {
    ipfs: string;
    owner_id: string;
    type: TokenType;
    author: string;
    description: string;
}

export type Auction = {
    auction_id: string;
    currentBid: string;
    token_id: string;
    creationDate: Timestamp;
    duration: Timestamp;
}

export type AuctionDoc = {
    currentBid: string;
    token_id: string;
    creationDate: Timestamp;
    duration: Timestamp;
}

export type Result<T> = {
  data: T;
  returnCode: string;
};

export type SignState = "false" | "true" | "loading";
export type TokenType = "image" | "sound" | "text";