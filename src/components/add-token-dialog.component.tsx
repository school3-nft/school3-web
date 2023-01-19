import { FormEvent, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { fetchMintToken } from "../utils/fetchers.util";
import {
  createToken,
  getWallet,
  incrementSequence,
} from "../utils/firebase.util";
import { User, TokenType } from "../utils/types.util";
import { SubmitBtn } from "./button.component";
import DialogWrapper from "./dialog.component";
import { useUser } from "../hooks/use-user.hook";

type Props = {
  isOpen: boolean;
  close: () => void;
  profileUser: User;
};

export default function AddTokenDialog({ isOpen, close, profileUser }: Props) {
  const {
    user: { uid },
    isLoggedIn,
  } = useUser();

  const [ipfs, setIpfs] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [tokenType, setTokenType] = useState<TokenType>("text");
  const [title, setTitle] = useState<string>("");
  const [author, setAuthor] = useState<string>("");

  const queryClient = useQueryClient();
  const mutate = useMutation(
    async () => {
      const { seed, sequence } = await getWallet(uid);
      const { data: token } = await fetchMintToken(seed, sequence, ipfs, 0);
      await incrementSequence(uid);
      await createToken(
        token.hash,
        ipfs,
        title,
        uid,
        tokenType,
        author,
        description,
        token.nftoken_id
      );
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([uid, "tokens"]);
      },
    }
  );

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    close();
    mutate.mutate();
  };

  return (
    <DialogWrapper
      isOpen={isOpen}
      close={close}
      className="max-w-2xl items-center"
    >
      <h1>Add Token</h1>
      <form onSubmit={onSubmit} className="w-[70%] flex flex-col gap-4">
        <label className="block text-left mb-[-12px]">IPFS Link</label>
        <input
          className="border-2 border-secondary w-full placeholder:italic"
          placeholder="https://ipfs.io/ipfs/Qme7..."
          name="ipfs"
          value={ipfs}
          onChange={(e) => setIpfs(e.target.value)}
        />

        <label className="block text-left mb-[-12px]">Title</label>
        <input
          className="border-2 border-secondary w-full placeholder:italic"
          placeholder="Szkolna łąka"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label className="block text-left mb-[-12px]">Authors name</label>
        <input
          className="border-2 border-secondary w-full placeholder:italic"
          placeholder="Marta z 3d"
          name="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />

        <div className="flex justify-between items-center w-full">
          <label className="flex gap-1">
            Text
            <input
              type="radio"
              value="text"
              checked={tokenType === "text"}
              onChange={() => setTokenType("text")}
            />
          </label>

          <label className="flex gap-1">
            Sound
            <input
              type="radio"
              value="sound"
              checked={tokenType === "sound"}
              onChange={() => setTokenType("sound")}
            />
          </label>

          <label className="flex gap-1">
            Image
            <input
              type="radio"
              value="option1"
              checked={tokenType === "image"}
              onChange={() => setTokenType("image")}
            />
          </label>
        </div>

        <label className="block text-left mb-[-12px]">Description</label>
        <textarea
          className="border-2 border-secondary w-full resize-none h-[150px] placeholder:italic"
          placeholder="Image with 4 fabulous flowers"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <SubmitBtn type="submit" className=" text-white w-[150px] mx-auto" />
      </form>
    </DialogWrapper>
  );
}
