import { useQuery } from "@tanstack/react-query";
import { Timestamp } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getTokenById, getTokensByUid } from "../utils/firebase.util";
import { Auction, Token } from "../utils/types.util";

type Props = {
  auction: Auction;
};

export default function AuctionPreview({ auction }: Props) {
  const { token_id, auction_id } = auction;
  const [token, setToken] = useState<Token | undefined>();

  useEffect(() => {
    if (token_id) getTokenById(token_id).then((result) => setToken(result));
  }, [token_id]);

  return (
    <>
      {!!token && (
        <Link href={`/auctions/${auction_id}`}>
          <div className="card bg-secondary-dark flex flex-col items-center justify-center gap-4">
            <div className="grid place-items-center w-32 h-32 relative">
              <Image
                className="rounded-xl"
                src={token!.ipfs}
                fill
                alt={token!.ipfs}
              />
            </div>
            <section className="">
              <h1 className="text-primary-dark">{token!.title}</h1>
            </section>
          </div>
        </Link>
      )}
    </>
  );
}
