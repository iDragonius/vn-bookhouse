import Footer from "@/components/layout/ui/footer/footer";
import Header from "@/components/layout/ui/header/header";
import { FC, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { poppins } from "@/components/fonts";

export interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className={cn(poppins.className)}>
      <div className={"min-h-[calc(100vh-84px)]"}>
        <Header />
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
