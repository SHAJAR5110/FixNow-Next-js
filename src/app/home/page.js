'use client';


import { SignIn, useUser } from "@clerk/nextjs";
import { useState, useEffect } from "react";

export default function CompleteProfile() {
  const { isSignedIn, isLoaded, user } = useUser(); // Authenticated user data
  const [role, setRole] = useState(""); // State to manage selected role

  // Redirect logic if user is signed in and role is already selected

  useEffect(() => {
    const checkAndRedirect = async () => {
      try {
        
  
        const response = await fetch(`/api/role?userId=${encodeURIComponent(user?.fullName)}`, {
          method: "GET",
        });
  
        const data = await response.json();
  
        if (response.ok && data.role) {
          window.location.href = `/${data.role.toLowerCase()}`;
        } else {
          console.error("Error or role not found:", data.message);
        }
      } catch (error) {
        console.error("Error during role check:", error);
      }
    };
  
    if (isSignedIn && user?.fullName) {
      checkAndRedirect();
    }
  }, [isSignedIn, user]);
  
  // Loading state while user data is being fetched
  if (!isLoaded) {
    return (
      <div className="flex justify-center items-center text-2xl my-auto gap-1">
        <span className="loading loading-bars loading-xs"></span>
        <span className="loading loading-bars loading-sm"></span>
        <span className="loading loading-bars loading-md"></span>
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );
  }

  // Display sign-in page if user is not signed in
  if (!isSignedIn) {
    return (
      <div className="flex flex-col justify-center items-center h-[80vh] w-full">
        <SignIn />
      </div>
    );
  }

  // Submit function to send data to API
  const handleSubmit = async () => {
    if (!role) {
        alert("Please select a role.");
        return;
    }

    try {
        const response = await fetch("/api/role", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId: user?.fullName, role }), // Send fullName as userId
        });

        const data = await response.json();

        if (response.ok) {
            window.location.href = `/${role.toLowerCase()}`; // Redirect to the role page
        } else {
            console.error("Error:", data.message || "Unknown error");
            alert(data.message || "Error saving role.");
        }
    } catch (error) {
        console.error("Request failed", error);
        alert("Something went wrong.");
    }
};


  return (
    <div className="flex flex-col items-center justify-center h-[80vh]">
      <h2 className="text-4xl mb-4">Complete Your Profile</h2>
      <p className="mb-4">Select Your Role:</p>
      <div className="flex flex-col gap-4 mb-6">
        <label htmlFor="clientRole" className="flex items-center gap-2">
          <input
            type="radio"
            id="clientRole"
            value="client"
            checked={role === "client"}
            onChange={(e) => setRole(e.target.value)}
            aria-label="Select Client role"
          />
          Client
        </label>
        <label htmlFor="serviceProviderRole" className="flex items-center gap-2">
          <input
            type="radio"
            id="serviceProviderRole"
            value="serviceprovider"
            checked={role === "serviceprovider"}
            onChange={(e) => setRole(e.target.value)}
            aria-label="Select Service Provider role"
          />
          Service Provider
        </label>
      </div>
      <button
        onClick={handleSubmit}
        className="bg-blue-500 w-40 text-white px-4 py-2 rounded-md hover:bg-white hover:text-blue-600 hover:border-2 border-blue-500"
      >
        Submit
      </button>
    </div>
  );
}
