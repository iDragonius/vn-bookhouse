import { CrossIcon } from "@/components/icons";
import { useEffect, useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";
import Link from "next/link";
import CategoryIcons from "@/lib/category-icons";
import { CategoryProps } from "@/types";
import Image from "next/image";
import { imageLoader } from "@/lib/utils";

const Sidebar = ({ close, data }: { close(): void; data: CategoryProps[] }) => {
  const sidebarRef = useRef<null | HTMLDivElement>(null);
  const [activeMainCategory, setActiveMainCategory] =
    useState<null | CategoryProps>(null);
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

  function onHoverMainCategory(category: CategoryProps) {
    if (category.id === activeMainCategory?.id) return;
    setActiveMainCategory(category);
  }
  return (
    <div
      className={
        "fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 flex  z-[700]"
      }
      style={{
        backdropFilter: "blur(3px)",
      }}
    >
      <div ref={sidebarRef} className={"flex  "}>
        <div
          className={"  w-[280px] h-full bg-white py-5 flex flex-col border-r"}
        >
          {data?.map((category) => (
            <SidebarItem
              data={category}
              key={category.id}
              onMouseOver={() => onHoverMainCategory(category)}
              hasLink={false}
            />
          ))}
        </div>
        {activeMainCategory && (
          <div
            className={"  w-[240px] h-full bg-white py-5 flex flex-col mr-5"}
          >
            {activeMainCategory.attributes.categories.data.map((category) => (
              <SidebarItem
                data={category as CategoryProps}
                key={category.id}
                hasLink={true}
              />
            ))}
          </div>
        )}
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

const SidebarItem = ({
  data,
  onMouseOver,
  hasLink,
}: {
  data: CategoryProps;
  onMouseOver?(): void;
  hasLink: boolean;
}) => {
  console.log(data.attributes.blackIcon);
  console.log(data.attributes.whiteIcon);
  const [hovered, setHovered] = useState<boolean>(false);
  return hasLink ? (
    <Link
      onMouseOver={() => {
        setHovered(true);
      }}
      onMouseLeave={() => {
        setHovered(false);
      }}
      href={`/category/${data.id}`}
      className={
        "flex items-center gap-2 px-4 py-3 w-full trans hover:bg-primaryGold focus:bg-primaryGold outline-none group"
      }
    >
      {data?.attributes?.whiteIcon?.data &&
        data?.attributes?.blackIcon?.data && (
          <Image
            loader={imageLoader}
            src={
              hovered
                ? data.attributes.whiteIcon.data.attributes.url
                : data.attributes.blackIcon.data.attributes.url
            }
            alt={data.attributes.name}
            width={32}
            height={32}
          />
        )}
      <p
        className={
          "text-[#2B2B2B] group-hover:text-white group-focus:text-white trans"
        }
      >
        {data.attributes.name}
      </p>
    </Link>
  ) : (
    <div
      onMouseOver={() => {
        if (onMouseOver) onMouseOver();
        setHovered(true);
      }}
      onMouseLeave={() => {
        setHovered(false);
      }}
      className={
        "flex items-center gap-2 px-4 py-3 w-full trans hover:bg-primaryGold focus:bg-primaryGold outline-none group"
      }
    >
      {data?.attributes?.whiteIcon?.data &&
        data?.attributes?.blackIcon?.data && (
          <Image
            loader={imageLoader}
            src={
              hovered
                ? data.attributes.whiteIcon.data.attributes.url
                : data.attributes.blackIcon.data.attributes.url
            }
            alt={data.attributes.name}
            width={32}
            height={32}
          />
        )}
      <p
        className={
          "text-[#2B2B2B] group-hover:text-white group-focus:text-white trans"
        }
      >
        {data.attributes.name}
      </p>
    </div>
  );
};

export default Sidebar;
