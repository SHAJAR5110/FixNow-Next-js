'use client';
import React from "react";
import { useState, useEffect } from "react";
import { SignIn, useUser } from '@clerk/nextjs';
function page() {
 
  const { isSignedIn, isLoaded } = useUser();

  if (!isLoaded) {
    return (
      <div className="flex justify-center items-center text-2xl my-auto gap-1 h-[80vh]">
        <span className="loading loading-bars loading-xs"></span>
        <span className="loading loading-bars loading-sm"></span>
        <span className="loading loading-bars loading-md"></span>
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );
  }

  if (!isSignedIn) {
    return (
      <div className="flex flex-col justify-center items-center h-[80vh] w-full ">
       <SignIn></SignIn>
      </div>
    );
  }


  return <div>
   < Services />
    
    </div>;
}

export default page;


export  function Services() {
  const [SPobject, setSPobject] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/user"); // Ensure this matches your API route
        const data = await response.json();
        console.log("Service Providers:", data.serviceProviders[0]);
        setSPobject(data.serviceProviders[0]); // Assuming the first object is needed
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  if (!SPobject) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4 border border-gray-200 rounded-lg shadow-md">
    
      <p>
        <strong className="text-xl text-bold">Service:</strong> {SPobject.services}
      </p>
      <p>
         <strong > Name :{SPobject.username}</strong> 
      </p>
      <p>
        <strong>UserID:</strong> {SPobject._id}
      </p>
      <p>
        <strong>City:</strong> {SPobject.city}
      </p>
      <p>
        <strong>Experience:</strong> {SPobject.experience}
      </p>
      <button
        style={{
          backgroundColor: "#007BFF",
          color: "#fff",
          border: "none",
          padding: "8px 16px",
          borderRadius: "4px",
          cursor: "pointer",
        }}
        onClick={() => window.location.href = `tel:${SPobject.phone}`}
      >
        Call
      </button>
    </div>
  );
}
