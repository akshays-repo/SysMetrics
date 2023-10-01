"use client"
import React from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import classNames from "classnames";
type Props = {
 
};
const Navbar = (props: Props) => {
  return (
    <nav
      className={classNames({
        "border-b-2 border-black":true,
        "bg-white text-zinc-500": true, // colors
        "flex items-center": true, // layout
        "w-full fixed z-10 px-4 shadow-sm h-16": true, //positioning & styling
      })}
    >
      <div className="font-bold text-lg text-black">SysMetrics</div>
      <div className="flex-grow"></div> {/** spacer */}
      <button className="md:hidden">
        <Bars3Icon className="h-6 w-6" />
      </button>
    </nav>
  );
};
export default Navbar;

