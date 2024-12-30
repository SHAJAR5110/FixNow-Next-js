import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaTwitter } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

function FooterFixNow() {
  return (
    <div className="bg-[#F7FAFC] text-black flex flex-col justify-center items-center h-[15rem] mobile-max:flex-col tablet-max:flex-col tablet-max:h-[25rem]">
      <div className="">
        {/* Footer logo */}
        <Image src="./footer.svg" width={50} height={50} alt="logo" />
      </div>
      <br></br>
      <div
        className="
                    flex flex-row justify-center items-center w-[60%] cursor-pointer gap-3
                    mobile-max:flex-col tablet-max:flex-col
                    "
      >
        {/* Footer Navigation  */}
        <Link className="hover:text-[#0398DC] font-bold" href="/">
          Home
        </Link>
        <Link className="hover:text-[#0398DC] font-bold" href="/services">
          Services
        </Link>
        <Link className="hover:text-[#0398DC] font-bold" href="/jobs">
          Jobs
        </Link>
        <Link className="hover:text-[#0398DC] font-bold" href="/about">
          About
        </Link>
        <Link className="hover:text-[#0398DC] font-bold" href="/contact">
          Contact
        </Link>
      </div>
        <br></br>
      <div className="flex justify-center items-center mobile-max:flex tablet-max:flex gap-3 mobile-max:gap-1 tablet-max:gap-1 text-[#7d8396] cursor-pointer">
        {/* Footer Social Links  */}
        <FaTwitter className="hover:text-black"/>
        <FaFacebookF className="hover:text-black"/>
        <FaYoutube className="hover:text-black"/>
        <FaLinkedin className="hover:text-black"/>
      </div>
        <br></br>
      <div>
        {/* Footer CopyWirte content */}
        <p className="flex text-center text-[#7d8396] mobile-max:flex-col tablet-max:flex-col">
        &copy; Copyright 2024 Nextjs Starter. Powered with ♥ by  <Link className="text-blue-500 text-bold ml-1 cursor-pointer" href='/developerTeam' > FixNow Team</Link>
        </p>
        </div>

    </div>
  );
}

export default FooterFixNow;

