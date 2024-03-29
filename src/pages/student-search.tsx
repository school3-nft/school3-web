import { useQuery } from "@tanstack/react-query";
import Head from "next/head";
import { useState } from "react";
import AuctionComponent from "../components/auction.component";
import Layout from "../components/layout.component";
import Overlay from "../components/overlay.component";
import { useUser } from "../hooks/use-user.hook";
import { Auction } from "../utils/types.util";
import { getAuctions, getIsAdmin } from "../utils/firebase.util";
import AuthorAuction from "../components/author-auction.component";
import StudentSearch from "../components/student-search.component";

export default function UserSearchPage() {
  const {
    user: { uid },
    isLoggedIn,
  } = useUser();

  const [searchTitle, setSearchTitled] = useState<string>("");

  const { data: isAdmin } = useQuery({
    queryKey: ["admin", uid],
    queryFn: () => getIsAdmin(uid),
    enabled: !!uid,
  });

  const { data: auctions } = useQuery({
    queryKey: ["auctions"],
    queryFn: () => getAuctions(),
  });

  const filteredAuctions: Auction[] | undefined = auctions?.filter(
    (auction) => {
      return auction.author.toLowerCase().includes(searchTitle.toLowerCase());
    }
  );

  return (
    <>
      <Head>
        <title>Home</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Overlay type="home">
          <StudentSearch onSearchFilter={setSearchTitled} />
          <div className="grid place-content-center grid-cols-4 gap-8 mx-16">
            {filteredAuctions?.map((auction, idx) => (
              <AuthorAuction key={idx} auction={auction} />
            ))}
          </div>
        </Overlay>
      </Layout>
    </>
  );
}
