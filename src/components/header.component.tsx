import Image from "next/image";
import Link from "next/link";
import { useUser } from "../hooks/use-user.hook";
import { signOut } from "../utils/firebase.util";
import Button from "./button.component";
import LoadingCircle from "./loading-circle.component";
import Circle from "./loading-circle.component";

export default function Header() {
  const {
    user: { username, avatar },
    isLoggedIn,
  } = useUser();

  const UserManager = () =>
    isLoggedIn === "true" ? (
      <nav className="flex justify-between items-center ml-auto gap-4">
        <Link href={`/users/${username}`} className="w-12 h-12 relative">
          <Image
            className="rounded-full border-secondary border-2"
            src={avatar!}
            alt="avatar"
            fill
          />
        </Link>
        <Button className="m-auto mr-2" onClick={signOut}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <p>Sign&nbsp;Out</p>
        </Button>
      </nav>
    ) : (
      <Link href="/sign-in" className="m-auto mr-2 text-black">
        <Button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path
              fillRule="evenodd"
              d="M3 4.25A2.25 2.25 0 015.25 2h5.5A2.25 2.25 0 0113 4.25v2a.75.75 0 01-1.5 0v-2a.75.75 0 00-.75-.75h-5.5a.75.75 0 00-.75.75v11.5c0 .414.336.75.75.75h5.5a.75.75 0 00.75-.75v-2a.75.75 0 011.5 0v2A2.25 2.25 0 0110.75 18h-5.5A2.25 2.25 0 013 15.75V4.25z"
              clipRule="evenodd"
            />
            <path
              fillRule="evenodd"
              d="M19 10a.75.75 0 00-.75-.75H8.704l1.048-.943a.75.75 0 10-1.004-1.114l-2.5 2.25a.75.75 0 000 1.114l2.5 2.25a.75.75 0 101.004-1.114l-1.048-.943h9.546A.75.75 0 0019 10z"
              clipRule="evenodd"
            />
          </svg>
          <p>Sign&nbsp;In</p>
        </Button>
      </Link>
    );

  return (
    <div className="w-[90vw] mx-auto  bg-primary mix-blend-multiply px-2 border-blue-800 rounded-b-3xl flex space-between transition ease-out">
      <Link href="/" className="my-auto p-2">
        <h1 className="font-serif text-background text-4xl w-fit">
          School<span className="font-sans text-5xl text-contrast">3</span>
        </h1>
      </Link>
      <div className="basis-3/5"></div>
      {isLoggedIn === "loading" ? (
        <LoadingCircle className="w-8 h-8 text-contrast m-auto mr-8" />
      ) : (
        <UserManager m-auto mr-2 />
      )}
    </div>
  );
}
