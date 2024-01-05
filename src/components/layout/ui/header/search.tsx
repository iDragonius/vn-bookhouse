import React, { FC } from "react";
import { SearchIcon } from "@/components/icons";

export interface SearchProps {}

const Search: FC<SearchProps> = () => {
  return (
    <div className={"w-full relative"}>
      <SearchIcon className={"absolute left-5 top-4"} />
      <input
        className={
          "w-full border border-[#E0E0E0] h-[58px] rounded-[12px] px-12 outline-none trans"
        }
        placeholder={"Axtarış..."}
      />
    </div>
  );
};

export default Search;
