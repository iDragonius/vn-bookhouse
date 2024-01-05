import { CrossIcon } from "@/components/icons";
import { useEffect, useRef } from "react";
import { useOnClickOutside } from "usehooks-ts";
import Link from "next/link";
import CategoryIcons from "@/lib/category-icons";
import { CategoryProps } from "@/types";

const Sidebar = ({ close, data }: { close(): void; data: CategoryProps[] }) => {
  const sidebarRef = useRef<null | HTMLDivElement>(null);
  useOnClickOutside(sidebarRef, close);
  useEffect(() => {
    const keyDownHandler = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();

        close();
      }
    };

    document.addEventListener("keydown", keyDownHandler);

    // 👇️ clean up event listener
    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, []);
  return (
    <div
      className={
        "fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 flex gap-5 z-[700]"
      }
      style={{
        backdropFilter: "blur(3px)",
      }}
    >
      <div
        className={"  w-[320px] h-full bg-white py-5 flex flex-col"}
        ref={sidebarRef}
      >
        {data.map((category) => (
          <SidebarItem data={category} key={category.id} />
        ))}
      </div>
      <button
        className={
          "self-start mt-5 p-2 trans rounded-full hover:bg-white hover:bg-opacity-20 outline-none focus:bg-white focus:bg-opacity-20 "
        }
        onClick={close}
      >
        <CrossIcon />
      </button>
    </div>
  );
};

const SidebarItem = ({ data }: { data: CategoryProps }) => {
  return (
    <Link
      href={`/category/${data.id}`}
      className={
        "flex items-center gap-2 px-4 py-3 w-full trans hover:bg-primaryGold focus:bg-primaryGold outline-none group"
      }
    >
      {CategoryIcons[data.attributes.icon]}
      <p
        className={
          "text-[#2B2B2B] group-hover:text-white group-focus:text-white trans"
        }
      >
        {data.attributes.name}
      </p>
    </Link>
  );
};

export default Sidebar;
