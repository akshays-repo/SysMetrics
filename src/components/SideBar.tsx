import React, { useRef } from "react";
import Link from "next/link";
import classNames from "classnames";

type NavItem = {
    label: string;
    href: string;
    icon: React.ReactNode;
};

const defaultNavItems: NavItem[] = [
    {
        label: "Heap memory",
        href: "/heapmemory",
    },
    {
        label: "Mouse speed",
        href: "/mouseSpeed",
    },
    {
        label:"Mouse click count",
        href:"/mouseClickCount"
    },{
        label:"Screen Heat Map",
        href:"/screenHeatMap"
    }
];



const Sidebar = () => {

    return (
        <div
            className={classNames({
                "border-r-2 border-black": true,
                "flex flex-col justify-between": true, // layout
                "bg-white text-zinc-50": true, // colors
                "md:w-full md:sticky md:top-16 md:z-0 top-0 z-20 fixed": true, // positioning
                "md:h-[calc(100vh_-_64px)] h-full w-[300px]": true, // for height and width
                "transition-transform .3s ease-in-out md:-translate-x-0": true, //animations
            })}
        >

            <nav className="md:sticky top-0 md:top-16">
                {/* nav items */}
                <ul className="py-2 flex flex-col gap-2">
                    {defaultNavItems.map((item, index) => {
                        return (
                            <Link key={index} href={item.href}>
                                <li
                                    className={classNames({
                                        " hover:bg-black": true, //colors
                                        "flex gap-4 items-center ": true, //layout
                                        "transition-colors duration-300": true, //animation
                                        "rounded-md p-2 mx-2": true, //self style
                                        "text-black hover:text-white": true
                                    })}
                                >
                                    {item.icon} {item.label}
                                </li>
                            </Link>
                        );
                    })}
                </ul>
            </nav>
        </div>
    );
};
export default Sidebar;