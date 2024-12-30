"use client";
import { FaTools } from "react-icons/fa";
import Image from "next/image";
import { GrWorkshop } from "react-icons/gr";
import { IoIosInformationCircle } from "react-icons/io";
import React, { useEffect, useState } from "react";
import { MdOutlinePermPhoneMsg } from "react-icons/md";
import { TiThMenu } from "react-icons/ti";
import { FaHome } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function FixNowNavbar() {
  const { isSignedIn, user } = useUser(); // Authenticated user data
  const [openNav, setOpenNav] = useState(false); // State for navigation drawer
  const [rolePage, setRolePage] = useState(""); // State to store the exact role page
  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        
        const response = await fetch(`/api/role?userId=${encodeURIComponent(user.fullName)}`);
        const data = await response.json();

        if (response.ok && data.role) {
          console.log("Fetched role :", data.role); // Debug fetched role
          setRolePage(data.role.toLowerCase()); // Update state with role-based page else {
          console.log("Error fetching role:");
        }
      } catch (error) {
        console.log("Error during API call:", error);
      }
    };

    fetchUserRole(); // Call the function to fetch role
  }, [isSignedIn, user]);


  return (
    <div>
      {/* Navbar div */}
      <div>
        <div className="bg-[#F7FAFC] text-black flex justify-around z-[1] items-center h-[5rem]">
          {/* Logo */}
          <div className="mobile:absolute mobile:left-3 tablet:flex">
            <Image
              src="./logo.svg"
              width={80}
              height={80}
              alt="logo"
              className="mx-2 tablet-max:mx-2 mobile-max:mx-2"
            />
          </div>

          {/* Desktop Navigation */}
          <div
            className="
                    flex justify-evenly w-[80%] text-xl pointer transition-all ease-in
                    mobile-max:hidden gap-4
                    tablet-max:hidden tablet:justify-end laptop:justify-end tablet:gap-3 
                "
          >
            {/* Dynamic Home Link */}
            <Link className="hover:text-[#0398DC] font-bold" href={isSignedIn?`/${rolePage}`:`/`}>
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

          {/* Sign-in or UserButton */}
          <div className="flex justify-end tablet-max:hidden tablet:flex">
            <SignedOut>
              <Link href="/sign-in">
                <Button
                  variant="outline"
                  className="bg-inherit p-5 border-black transition-all ease-in hover:bg-[#1F84EF] hover:text-white hover:font-bold"
                >
                  Sign-in
                </Button>
              </Link>
            </SignedOut>
            <SignedIn>
              <UserButton showName />
            </SignedIn>
          </div>

          {/* Mobile Navigation Drawer */}
          <div className="absolute right-1 m-3 cursor-pointer hidden tablet-max:flex tablet:hidden mr-8">
            <Sheet
              onClick={() => {
                setOpenNav(!openNav);
              }}
            >
              <SheetTrigger>
                <TiThMenu className="text-2xl" />
              </SheetTrigger>

              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Navigation Links</SheetTitle>
                  <SheetDescription>
                    <br />
                    <div className="flex hover:text-[#0398DC] font-bold items-center justify-center text-2xl">
                      <FaHome />
                      &nbsp;
                      <Link href={isSignedIn?`/${rolePage}`:`/`}>Home</Link>
                    </div>
                    <br />
                    <div className="flex hover:text-[#0398DC] font-bold items-center justify-center text-2xl">
                      <FaTools />
                      &nbsp;
                      <Link href="/services">Services</Link>
                    </div>
                    <br />
                    <div className="flex hover:text-[#0398DC] font-bold items-center justify-center text-2xl">
                      <GrWorkshop />
                      &nbsp;
                      <Link href="/jobs">Jobs</Link>
                    </div>
                    <br />
                    <div className="flex hover:text-[#0398DC] font-bold items-center justify-center text-2xl">
                      <IoIosInformationCircle />
                      &nbsp;
                      <Link href="/about">About</Link>
                    </div>
                    <br />
                    <div className="flex hover:text-[#0398DC] font-bold items-center justify-center text-2xl">
                      <MdOutlinePermPhoneMsg />
                      &nbsp;
                      <Link href="/contact">Contact</Link>
                    </div>
                    <br />
                  </SheetDescription>
                </SheetHeader>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
      {/* End of Navbar div */}
    </div>
  );
}
