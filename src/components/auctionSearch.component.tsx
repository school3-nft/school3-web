import { useState } from "react";
import { TokenType } from "../utils/types.util";

type Props = {
    onSearchFilter: (tokenTitle: string) => void;
    onTypeFilter: (tokenType: string) => void
};

export default function AuctionSearch({ onSearchFilter, onTypeFilter }: Props) {
  const [search, setSearch] = useState<string>("");
  const [tokenType, setTokenType] = useState<TokenType | "all">("all");

  return (
    <section className="card border-secondary border-2 flex flex-col gap-4">
      <label className="block text-left ">
        Search
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
      </label>
      <div className="grid grid-rows-2 grid-cols-3 place-items-center gap-2">
        <label className="flex gap-1">
          Text
          <input
            type="radio"
            value="text"
            checked={tokenType === "text"}
            onChange={() => {
                    setTokenType("text");
                    onTypeFilter("text");
                }
            }
          />
        </label>

        <label className="flex gap-1">
          Sound
          <input
            type="radio"
            value="sound"
            checked={tokenType === "sound"}
            onChange={() => {
                setTokenType("sound");
                onTypeFilter("sound");
            }
        }
          />
        </label>

        <label className="flex gap-1">
          Image
          <input
            type="radio"
            value="option1"
            checked={tokenType === "image"}
            onChange={() => {
                setTokenType("image");
                onTypeFilter("image");
            }
        }
          />
        </label>
        <label className="flex gap-1 col-span-3 ">
          All
          <input
            type="radio"
            value="all"
            checked={tokenType === "all"}
            onChange={() => {
                setTokenType("all");
                onTypeFilter("all");
            }
        }
          />
        </label>
      </div>
    </section>
  );
}
