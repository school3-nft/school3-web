type Props = {
  openDialog: () => void;
};

export default function AddAuctionBtn({ openDialog }: Props) {
  return (
    <button
      onClick={openDialog}
      className="fixed right-24 bottom-12 w-16 h-16 rounded-full border-2 bg-primary border-secondary grid place-items-center transition hover:opacity-50"
    >
      <p className="text-[2rem] mb-1">+</p>
    </button>
  );
}
