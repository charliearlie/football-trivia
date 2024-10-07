import React from "react";

import { cn } from "@/lib/utils";

import { ClubType } from "./career-path-form";

export const Club = ({ club }: { club: ClubType }) => (
  <div
    className={cn(
      "w-full bg-yellow text-black text-sm min-h-10 md:text-lg md:min-h-6 p-2 border-4 border-black transition-all",
      "text-left font-bold flex gap-2 items-center border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]",
      club.isLoan ? "bg-bg" : ""
    )}
  >
    <p className="basis-2/12 md:basis-3/12">{club.years}</p>
    <p className="basis-6/12 md:basis-7/12">
      {club.name} {club.isLoan ? "(loan)" : ""}
    </p>
    <p className="basis-2/12 md:basis-1/12 text-center">{club.appearances}</p>
    <p className="basis-2/12 md:basis-1/12 text-center">{club.goals}</p>
  </div>
);

export const ObscuredClub = () => (
  <div
    className={cn(
      "w-full bg-yellow text-sm text-black min-h-10 md:text-lg md:min-h-6 p-2 border-4 border-black transition-all",
      "text-left font-bold flex gap-2 items-center border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
    )}
  >
    <p className="basis-2/12 md:basis-3/12">????</p>
    <p className="basis-6/12 md:basis-7/12">???????</p>
    <p className="basis-2/12 md:basis-1/12 text-center">??</p>
    <p className="basis-2/12 md:basis-1/12 text-center">??</p>
  </div>
);
