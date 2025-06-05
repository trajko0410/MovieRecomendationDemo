"use client"

import { usePathname } from "next/navigation";
import React, { ReactNode } from "react";

const MainContainer = ({ children }: { children: ReactNode }) => {
    const pathname = usePathname();
  
    const isSingleTitlePage = pathname.startsWith("/singleTitle/");
  return <div      className={`h-full px-8 py-8 ml-[15%]  ${
        isSingleTitlePage ? "w-[85%]  " : "w-[65%] pt-34 "
      }`}>{children}</div>;
};

export default MainContainer;
