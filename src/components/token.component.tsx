import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { getTokensByUid } from "../utils/firebase.util";
import { Token } from "../utils/types.util";
import AddTokenDialog from "./add-token-dialog.component";
import Button from "./button.component";
import AuctionImage from "./auction-image.component";

type Props = {
  token: Token;
};

export default function TokenFC({ token }: Props) {
  const { token_id, ipfs, title, author } = token;

  return (
    <div className="card bg-secondary-dark flex gap-4">
      <Link href={ipfs} className="grid place-items-center w-32 h-32 relative">
        <AuctionImage token={token} />
      </Link>
      <section className="flex flex-col gap-2 p-2">
        <h3 className="text-primary-dark">
          Hash<p className="text-black">{token_id}</p>
        </h3>
        <h3 className="text-primary-dark">
          Title<p className="text-black">{title}</p>
        </h3>
        <h3 className="text-primary-dark">
          Author<p className="text-black">{author}</p>
        </h3>
      </section>
    </div>
  );
}
