import Head from "next/head";
import Layout from "../components/layout.component";
import Overlay from "../components/overlay.component";

export default function Home() {
  return (
    <>
      <Head>
        <title>Home</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Overlay>
          <p>nice</p>
        </Overlay>
      </Layout>
    </>
  );
}