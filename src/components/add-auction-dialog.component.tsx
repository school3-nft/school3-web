import { useState } from "react";
import { createAuction } from "../utils/firebase.util";
import { SubmitBtn } from "./button.component";
import DialogWrapper from "./dialog.component";

type Props = {
  isOpen: boolean;
  close: () => void;
};

export default function AddAuctionDialog({ isOpen, close }: Props) {
  const [auction, setAuction] = useState<{ tokenId: string }>({ tokenId: "" });

  const [hash, setHash] = useState<string>("");
  const [date, setDate] = useState<string>("2023-01-18T00:00");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createAuction(hash, date);
  };

  return (
    <DialogWrapper
      isOpen={isOpen}
      close={close}
      className="max-w-2xl items-center"
    >
      <h1>Create Auction</h1>
      <form onSubmit={onSubmit} className="w-[70%] flex flex-col gap-4">
        <label className="block text-left mb-[-12px]">Hash</label>
        <input
          className="border-2 border-secondary w-full placeholder:italic"
          placeholder=""
          name="hash"
          value={hash}
          onChange={(e) => setHash(e.currentTarget.value)}
        />

        <label className="block text-left mb-[-12px]">End date</label>
        <input
          type="datetime-local"
          id="meeting-time"
          name="meeting-time"
          value={date}
          min="2022-12-20T00:00"
          max="2024-01-01T00:00"
          onChange={(e) => setDate(e.currentTarget.value)}
        />
        <SubmitBtn type="submit" className=" text-white w-[150px] mx-auto" />
      </form>
    </DialogWrapper>
  );
}
