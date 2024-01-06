import { CategoryIcon, Logo } from "@/components/icons";
import Basket from "@/components/layout/ui/header/basket";
import Search from "@/components/layout/ui/header/search";
import Link from "next/link";
import { FC, useState } from "react";
import Sidebar from "./sidebar";
import { useQuery } from "@apollo/client";
import GET_CATEGORIES, {
  GetCategoriesResponse,
} from "@/lib/queries/categories.query";
import Config from "@/lib/config";
import { useRouter } from "next/router";
import { CategoryProps } from "@/types";
import { Constants } from "@/lib/constants";

export interface HeaderProps {}

const Header: FC<HeaderProps> = () => {
  const [isSidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const { locale } = useRouter();
  const { data: categoriesData, loading } = useQuery<GetCategoriesResponse>(
    GET_CATEGORIES,
    {
      variables: {
        locale: Config.multiLanguage ? locale : Constants.defaultLocale,
      },
    },
  );
  return (
    <>
      {isSidebarOpen && (
        <Sidebar
          close={() => setSidebarOpen(false)}
          data={categoriesData?.categories.data as CategoryProps[]}
        />
      )}
      <div className={"h-[90px] bg-white sticky top-0 z-[600] "}>
        <div className={"box flex justify-between items-center h-full gap-8"}>
          <div className={"flex items-center gap-3 "}>
            <button
              onClick={() => setSidebarOpen(!isSidebarOpen)}
              className={
                "border-gray-200 border h-[58px] w-[58px] flex items-center justify-center p-1 rounded-[8px] trans  group  hover:border-primaryGold focus:border-primaryGold  cursor-pointer outline-none"
              }
            >
              <CategoryIcon
                className={
                  "group-hover:fill-primaryGold  group-focus:fill-primaryGold fill-[#8F8F8F] trans"
                }
              />
            </button>
            <Link href={"/"}>
              <Logo className={"mt-2"} />
            </Link>
          </div>
          <Search />
          <Basket />
        </div>
      </div>
    </>
  );
};

export default Header;
