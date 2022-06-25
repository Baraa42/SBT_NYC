import React from "react";
import Link from "next/link";
import {ConnectWalletBtn} from "@/components/common/ConnectWalletBtn";
import { useRouter } from "next/router";


export const Header = () => {
    const router = useRouter(); 
  
  return (
    <div className="navbar h-24 py-2 px-4 sm:px-12">
        <div className="flex flex-grow">
            <a className="btn btn-ghost normal-case text-xl">
                <Link href="/" passHref>
                    <div className="text-center flex">
                    Logo
                    </div>
                </Link>
            </a>
        </div>
        <div className="flex-none sm:space-x-3 items-center ">
            <div className="flex items-center">
                <ConnectWalletBtn />
            </div>
        </div>
    </div>
  );
};
