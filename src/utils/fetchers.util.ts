import { Result } from "./types.util";

const API_URL = process.env.API_URL
  ? process.env.API_URL
  : "http://localhost:8080";

export type WalletData = {
  account_address: string;
  account_balance: string;
};

function fetchApi<T>(url: string): Promise<T> {
  return fetch(url).then((response) => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  });
}

export const fetchNewWallet = async () => {
  const data = await fetchApi<WalletData>(`${API_URL}/create-user`);
  return { data, returnCode: "200" } as Result<WalletData>;
};
