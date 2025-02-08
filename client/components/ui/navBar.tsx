import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "./button";
import { HelpCircle, Link2 } from "lucide-react";


const Navbar = () => {
  return (
    <>
      {/* Navigation */}
      <nav className="flex items-center justify-between border-b p-4 bg-white">
        <Link href="/mainpage">
          <Image
            src="/logo.svg"
            alt="Logo"
            width={32}
            height={32}
            className="h-8 w-8 cursor-pointer"
          />
        </Link>

        <div className="flex items-center gap-2">
          <Button variant="ghost" className="text-gray-600 hover:bg-gray-50 gap-1.5">
            Help <HelpCircle className="h-4 w-4" />
          </Button>
          <Link href="/docs">
            <Button variant="ghost" className="text-gray-600 hover:bg-gray-50 gap-1.5">
              Docs <Link2 className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
