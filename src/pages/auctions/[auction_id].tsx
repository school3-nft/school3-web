import Head from "next/head";
import {
  createAndAddWallet,
  getAuctionById,
  getTokenById,
  getUserById,
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
import { useContext, useState } from "react";
import AddTokenDialog from "../../components/add-token-dialog.component";
import UserTokens from "../../components/userTokens.component";
import { WalletData } from "../../utils/fetchers.util";
import { Auction, Token, User } from "../../utils/types.util";
import Link from "next/link";
import { UserContext } from "../../contexts/user.context";
import AuctionImage from "../../components/auction-image.component";
import GoUserPage from "../../components/go-user-page.component";

export async function getServerSideProps({ params: { auction_id } }: any) {
  const auction = await getAuctionById(auction_id);
  const token = await getTokenById(auction.token_id);
  let username = "None";
  let avatar = "";

  if (auction.currentBidderUid !== "") {
    const currentBidder = await getUserById(auction.currentBidderUid);
    username = currentBidder.username;
    avatar = currentBidder.avatar;
  }

  return {
    props: {
      auction,
      token,
      currentBidder: { username, avatar },
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
  currentBidder: {
    username: string;
    avatar: string;
  };
};

export default function AuctionPage({
  auction,
  token,
  currentBidder: { username, avatar },
}: Props) {
  const [bid, setBid] = useState<number>(auction.currentBid + 2);
  const {
    user: { uid: clientUid },
  } = useContext(UserContext);
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await updateCurrentBid(clientUid, auction.auction_id, bid);
    location.reload();
  };

  const formatter = new Intl.DateTimeFormat(undefined, {
    dateStyle: "short",
    timeStyle: "short",
  });

  const { data: user } = useQuery({
    queryKey: ["users"],
    queryFn: () => getUserById(token.uid),
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
              <AuctionImage token={token} />
            </Link>
            <div className="card shadow-lg rounded-none w-[700px] bg-newGray flex flex-col justify-between py-6 px-12 items-center">
              <h1 className="text-center">{token.title}</h1>
              <h3 className="text-center">
                Current Bid:{" "}
                <span className="font-bold">
                  {auction.currentBid !== -1 ? auction.currentBid : "None"}
                </span>
              </h3>
              <form onSubmit={onSubmit} className="flex gap-4">
                <input
                  className="w-24 p-2"
                  value={bid}
                  min={auction.currentBid + 1}
                  type="number"
                  onChange={(e) => setBid(parseInt(e.target.value))}
                />
                <Button type="submit">Place Bid</Button>
              </form>
                <h3 className="text-primary-dark text-center">
                    Auction ends:
                    <p className="text-black">
                        {formatter.format(new Date(auction.endDate))}
                    </p>
                </h3>
                <div className="flex justify-between items-center space-x-10">
                <div className="flex text-primary-dark items-center space-x-2">
                    <p className="text-black">Creator: </p>
                    <GoUserPage username={user?.username} avatar={user?.avatar}/>
                </div>
                { username!= "None" && <div className="flex text-primary-dark items-center space-x-2">
                    <p className="text-black">Bidder: </p>
                    <GoUserPage username={username} avatar={avatar}/>
                </div>}
              </div>
            </div>
          </section>
        </div>
      </Overlay>
    </Layout>
  );
}
