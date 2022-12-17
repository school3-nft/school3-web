import { useState } from "react";
import { SubmitBtn } from "./button.component";
import DialogWrapper from "./dialog.component";

type Props = {
  isOpen: boolean;
  close: () => void;
};

export default function AddActionDialog({ isOpen, close }: Props) {
  const [auction, setAuction] = useState<{ tokenId: string }>({ tokenId: "" });

  const onSubmit = () => {
    console.log("submit");
  };

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;

    setAuction((prevValue) => {
      return { ...prevValue, [name]: value };
    });
  };

  return (
    <DialogWrapper
      isOpen={isOpen}
      close={close}
      className="max-w-2xl items-center"
    >
      <h1>Create Auction</h1>
      <form onSubmit={onSubmit} className="w-[70%] flex flex-col gap-4">
        <label className="block text-left mb-[-12px]">Token Id</label>
        <input
          className="border-2 border-secondary w-full placeholder:italic"
          placeholder=""
          name="tokenId"
          value={auction.tokenId}
          onChange={handleChange}
        />
      </form>
      <SubmitBtn type="submit" className=" text-white w-[150px] mx-auto" />
    </DialogWrapper>
  );
}
