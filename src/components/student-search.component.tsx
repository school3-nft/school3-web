import { useState } from "react";

type Props = {
  onSearchFilter: (tokenTitle: string) => void;
};

export default function StudentSearch({ onSearchFilter }: Props) {
  const [search, setSearch] = useState<string>("");

  return (
    <section className="card border-secondary border-2 flex flex-col px-6 py-4">
      <label className="block text-left mb-1">Search by student</label>
      <input
        className="border-2 border-secondary w-full placeholder:italic"
        placeholder="search"
        name="search"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          onSearchFilter(e.target.value);
        }}
      />
    </section>
  );
}
