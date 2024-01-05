import {
  NotebookIcon,
  PencilIcon,
  PenIcon,
} from "@/components/icons/categories";
import { ReactNode } from "react";
type IconProps = React.HTMLAttributes<SVGElement>;

export type CategoryIconsProps = Record<string, ReactNode>;
const CategoryIcons: CategoryIconsProps = {
  pens: <PenIcon className={"iconWithHover  trans"} />,
  pencils: <PencilIcon className={"iconWithHover  trans"} />,
  notebooks: <NotebookIcon className={"iconWithHover  trans"} />,
};
export default CategoryIcons;
