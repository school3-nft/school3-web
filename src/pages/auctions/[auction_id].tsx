import Head from "next/head";
import {
  createAndAddWallet,
  getAuctionById,
  getTokenById,
  getUserByUsername,
  getWallet,
  updateCurrentBid,
} from "../../utils/firebase.util";
import Layout from "../../components/layout.component";
import Overlay from "../../components/overlay.component";
import Image from "next/image";
import Button from "../../components/button.component";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Circle from "../../components/loading-circle.component";
import { useState } from "react";
import AddTokenDialog from "../../components/add-token-dialog.component";
import UserTokens from "../../components/userTokens.component";
import { WalletData } from "../../utils/fetchers.util";
import { Auction, Token, User } from "../../utils/types.util";
import Link from "next/link";

export async function getServerSideProps({ params: { auction_id } }: any) {
  const auction = await getAuctionById(auction_id);
  const token = await getTokenById(auction.token_id);

  return {
    props: {
      auction,
      token,
    },
  };
}

type Props = {
  auction: {
    auction_id: string;
    creationDate: string;
    endDate: string;
    uid: string;
    token_id: string;
    currentBid: number;
  };
  token: Token;
};

export default function AuctionPage({ auction, token }: Props) {
  const [bid, setBid] = useState<number>(auction.currentBid);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("XD");
    await updateCurrentBid(auction.auction_id, bid);
    location.reload();
  };

  const formatter = new Intl.DateTimeFormat(undefined, {
    dateStyle: "short",
    timeStyle: "short",
  });

  return (
    <Layout>
      <Overlay>
        <div className="grid w-full h-full place-items-center mt-[-100px]">
          <section className="flex justify-between w-[70%] h-72">
            <Link
              href={token.ipfs}
              className="grid w-72 h-72 relative shadow-lg"
            >
              <Image
                className="rounded-xl"
                src={token.ipfs}
                fill
                alt={token.ipfs}
              />
            </Link>
            <div className="card shadow-lg rounded-none w-[350px] bg-newGray flex flex-col justify-between py-6 px-12">
              <h1>{token.title}</h1>
              <h3>{token.author}</h3>
              <h3>
                Current Bid:{" "}
                <span className="font-bold">
                  {auction.currentBid !== -1 ? auction.currentBid : "None"}
                </span>
              </h3>
              <form onSubmit={onSubmit} className="flex justify-between">
                <input
                  className="w-24 p-2"
                  value={bid}
                  min={auction.currentBid + 1}
                  type="number"
                  onChange={(e) => setBid(parseInt(e.target.value))}
                />
                <Button type="submit">Place Bid</Button>
              </form>
              <h3 className="text-primary-dark">
                Auction ends:
                <div className="text-black">
                  {formatter.format(new Date(auction.endDate))}
                </div>
              </h3>
            </div>
          </section>
        </div>
      </Overlay>
    </Layout>
  );
}
