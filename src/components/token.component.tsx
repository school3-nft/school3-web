import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { getTokensByUid } from "../utils/firebase.util";
import { Token } from "../utils/types.util";
import AddTokenDialog from "./add-token-dialog.component";
import Button from "./button.component";

type Props = {
  token: Token;
};

export default function TokenFC({ token }: Props) {
  const { token_id, ipfs, title, author } = token;

  return (
    <div className="card flex gap-4">
      <Link href={ipfs} className="grid place-items-center w-32 h-32 relative">
        <Image className="rounded-full" src={ipfs} fill alt={ipfs} />
      </Link>
      <section className="flex flex-col gap-3 p-2">
        <h1 className="text-primary">
          Hash<p className="text-black">{token_id}</p>
        </h1>

        <h1 className="text-primary">
          Title<p className="text-black">{title}</p>
        </h1>
        <h1 className="text-primary">
          Author<p className="text-black">{author}</p>
        </h1>
        <h1 className="text-primary">
          Author<p className="text-black">{author}</p>
        </h1>
      </section>
    </div>
  );
}
