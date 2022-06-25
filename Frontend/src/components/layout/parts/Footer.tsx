import { FC } from "react";
import Link from "next/link";

export const Footer: FC = () => {
  return (
    <footer className="footer p-10 bg-neutral text-neutral-content">
    <div>
        <Link href="/" passHref>
            <div className="text-center flex">
            sample
            </div>
        </Link>
    <p>Copyright © {new Date().getFullYear()}</p>
  </div> 
</footer>
  );
};
