import Link from "next/link";
import Image from "next/image";
import { getTokenById, getUserByUsername } from "../utils/firebase.util";
import { User } from "../utils/types.util";
import { useQuery } from "@tanstack/react-query";

type Props = {
    username: string | undefined;
    avatar: string | undefined;
}

export default function GoUserPage({ username, avatar }: Props) {
    return (
        <div className="flex items-center ml-auto gap-4">
            <p>{username}</p>
            <Link href={`/users/${username}`} className="w-12 h-12 relative">
                <Image
                    className="rounded-full border-secondary border-2"
                    src={avatar!}
                    alt="avatar"
                    fill
                />
            </Link>

        </div>
    )
}