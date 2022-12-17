import { useState } from "react";
import { SubmitBtn } from "./button.component";
import DialogWrapper from "./dialog.component";

type Props = {
  isOpen: boolean;
  close: () => void;
};

export default function AddTokenDialog({ isOpen, close }: Props) {
  const [ipfs, setIpfs] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const onSubmit = () => {
    console.log("submit");
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

        <label className="block text-left mb-[-12px]">Description</label>
        <textarea
          className="border-2 border-secondary w-full resize-none h-[150px] placeholder:italic"
          placeholder="Image with 4 fabulous flowers"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </form>
      <SubmitBtn type="submit" className=" text-white w-[150px] mx-auto" />
    </DialogWrapper>
  );
}
