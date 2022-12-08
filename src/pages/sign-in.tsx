import Head from "next/head";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";
import Button from "../components/button.component";
import Layout from "../components/layout.component";
import Overlay from "../components/overlay.component";
import { useUser } from "../hooks/use-user.hook";
import { loginUserEmail, signUpWithEmail } from "../utils/firebase.util";

export default function SignIn() {
  const { isLoggedIn } = useUser();
  const router = useRouter();

  const [loginCredentials, setLoginCredentials] = useState<{
    email: string;
    password: string;
  }>({ email: "", password: "" });

  const [registerCredentials, setRegisterCredentials] = useState<{
    email: string;
    password: string;
    username: string;
  }>({ email: "", password: "", username: "" });

  useEffect(() => {
    if (isLoggedIn === "true") router.push("/");
  }, [isLoggedIn]);

  const onRegisterSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signUpWithEmail(
      registerCredentials.email,
      registerCredentials.password,
      registerCredentials.username
    );

    setRegisterCredentials({ email: "", password: "", username: "" });
  };

  const onLoginSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    loginUserEmail(loginCredentials.email, loginCredentials.password);
  };

  return (
    <>
      <Head>
        <title>Sign In</title>
        <meta name="description" content="Sign in or up to site" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Overlay
          type="main"
          className="grid grid-cols-2 h-full place-items-center"
        >
          <form
            onSubmit={onLoginSubmit}
            className="relative card flex flex-col align-center gap-8 min-w-[300px] w-[22vw] h-[50vh]"
          >
            <h2 className="w-fit mx-auto text-secondary text-xl mb-4">
              Sign In
            </h2>
            <input
              type="email"
              className="input-text mx-8"
              placeholder="Email"
              name="email"
              onChange={(e) =>
                setLoginCredentials((prev) => ({
                  ...prev,
                  email: e.target.value,
                }))
              }
              value={loginCredentials.email}
            />
            <input
              type="password"
              className="input-text mx-8"
              placeholder="Password"
              name="password"
              onChange={(e) =>
                setLoginCredentials((prev) => ({
                  ...prev,
                  password: e.target.value,
                }))
              }
              value={loginCredentials.password}
            />
            <Button
              type="submit"
              className="absolute text-white w-[150px] mx-auto left-0 right-0 bottom-20"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path d="M3.105 2.289a.75.75 0 00-.826.95l1.414 4.925A1.5 1.5 0 005.135 9.25h6.115a.75.75 0 010 1.5H5.135a1.5 1.5 0 00-1.442 1.086l-1.414 4.926a.75.75 0 00.826.95 28.896 28.896 0 0015.293-7.154.75.75 0 000-1.115A28.897 28.897 0 003.105 2.289z" />
              </svg>
              <p>Submit</p>
            </Button>
          </form>
          <form
            onSubmit={onRegisterSubmit}
            className="card relative flex flex-col align-center gap-8 min-w-[300px] w-[22vw] h-[50vh]"
          >
            <h2 className="w-fit mx-auto text-secondary text-xl mb-4">
              Sign Up
            </h2>
            <input
              type="email"
              className="input-text mx-8"
              placeholder="Email"
              name="email"
              onChange={(e) =>
                setRegisterCredentials((prev) => ({
                  ...prev,
                  email: e.target.value,
                }))
              }
              value={registerCredentials.email}
            />
            <input
              type="password"
              className="input-text mx-8"
              placeholder="Password"
              name="password"
              onChange={(e) =>
                setRegisterCredentials((prev) => ({
                  ...prev,
                  password: e.target.value,
                }))
              }
              value={registerCredentials.password}
            />
            <input
              className="input-text mx-8"
              placeholder="Username"
              name="username"
              onChange={(e) =>
                setRegisterCredentials((prev) => ({
                  ...prev,
                  username: e.target.value,
                }))
              }
              value={registerCredentials.username}
            />
            <Button
              type="submit"
              className="absolute text-white w-[150px] mx-auto left-0 right-0 bottom-20"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path d="M3.105 2.289a.75.75 0 00-.826.95l1.414 4.925A1.5 1.5 0 005.135 9.25h6.115a.75.75 0 010 1.5H5.135a1.5 1.5 0 00-1.442 1.086l-1.414 4.926a.75.75 0 00.826.95 28.896 28.896 0 0015.293-7.154.75.75 0 000-1.115A28.897 28.897 0 003.105 2.289z" />
              </svg>
              <p>Submit</p>
            </Button>
          </form>
        </Overlay>
      </Layout>
      <p className="fixed animate-[comeFromTop_3s_ease-out] m-auto delay-1000 w-fit left-0 right-0 top-[150px] font-mono text-4xl">
        Sign In <span className="text-secondary">OR</span> Up ?
      </p>
    </>
  );
}
