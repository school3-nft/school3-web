import { Result } from "./types.util";

const API_URL = process.env.API_URL
  ? process.env.API_URL
  : "http://localhost:8000";

export type WalletData = {
  account_address: string;
  account_balance: string;
  seed: string;
  sequence: number;
};

export type TokenData = {
  status: string;
  fee: number;
  uri: string;
  hash: string;
  nftoken_id: string;
};

function fetchApi<T>(
  url: string,
  method: "GET" | "POST",
  body?: any
): Promise<T> {
  return fetch(url, {
    method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  }).then((response) => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  });
}

export const fetchNewWallet = async () => {
  const data = await fetchApi<WalletData>(`${API_URL}/create-user`, "GET");
  return { data, returnCode: "200" } as Result<WalletData>;
};

export const fetchMintToken = async (
  seed: string,
  sequence: number,
  ipfs: string,
  transferFee: number
) => {
  const data = await fetchApi<TokenData>(`${API_URL}/mint-nft`, "POST", {
    seed,
    sequence,
    uri: ipfs,
    transfer_fee: transferFee,
  });
  console.log(data);
  return { data, returnCode: "200" } as Result<TokenData>;
};
