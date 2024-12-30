'use client'
import React from "react";
import { SignIn, useUser } from '@clerk/nextjs';
import Image from "next/image";
 function page() {

  const { isSignedIn, isLoaded } = useUser();

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

  if (!isSignedIn) {
    return (
      <div className="flex flex-col justify-center items-center h-[80vh] w-full ">
       <SignIn></SignIn>
      </div>
    );
  }


  return(
  <div className="flex flex-col w-full h-full mb-8">
    <h2 className="text-5xl flex justify-center font-serif font-bold items-center text-center p-1">
About Us
</h2>.
<div className="flex justify-center items-center m-3 tablet-max:flex-col">

<p className="text-center text-lg">
Welcome to FixNow, your trusted platform for finding and hiring skilled professionals for your repair and maintenance needs. Whether you’re looking for a plumber to fix a leaky faucet, an electrician for your home rewiring, or a handyman for quick fixes, FixNow connects you with the right professionals in your area.
</p>
<Image
src="/avatar.jpeg"
alt="about"
height={300}
width={300}
></Image>
</div>
<h2 className="text-2xl font-serif font-bold text-center p-6">
Our Mission
</h2>
<div className="flex justify-center items-center m-10 tablet-max:flex-col">
<p className="text-center text-lg">
At FixNow, our mission is to simplify the way people find reliable service professionals. We aim to empower homeowners and businesses by providing a seamless, secure, and efficient marketplace that fosters trust and quality service delivery.
</p>
<Image
src="/avatar2.jpeg"
alt="about"
height={320}
width={320}
></Image>
</div>

<h2 className="text-2xl font-serif font-bold text-center p-6">
What We Offer
</h2>


<div className="mx-4">

<div className="collapse collapse-arrow bg-base-200">
  <input type="radio" name="my-accordion-2" defaultChecked />
  <div className="collapse-title text-xl font-medium">Wide Range of Services:</div>
  <div className="collapse-content">
    <p className="font-bold">Access to verified professionals in categories like plumbing, electrical work, HVAC repair, carpentry, and more.</p>
  </div>
</div>
<div className="collapse collapse-arrow bg-base-200">
  <input type="radio" name="my-accordion-2" />
  <div className="collapse-title text-xl font-medium">Professional Profiles:</div>
  <div className="collapse-content">
    <p className="font-bold">Browse detailed profiles with reviews, ratings, and portfolios to make informed decisions.</p>
  </div>
</div>

<div className="collapse collapse-arrow bg-base-200">
  <input type="radio" name="my-accordion-2" />
  <div className="collapse-title text-xl font-medium">Real-Time Communication:</div>
  <div className="collapse-content">
    <p className="font-bold">
  Use our in-app messaging system to discuss project details and get instant updates.
    </p>
  </div>
</div>


<div className="collapse collapse-arrow bg-base-200">
  <input type="radio" name="my-accordion-2" />
  <div className="collapse-title text-xl font-medium">Secure Payments:</div>
  <div className="collapse-content">
    <p className="font-bold">
 Hassle-free payment options with transparency and security for both clients and professionals.
    </p>
  </div>
</div>

<div className="collapse collapse-arrow bg-base-200">
  <input type="radio" name="my-accordion-2" />
  <div className="collapse-title text-xl font-medium">Reliable Reviews:</div>
  <div className="collapse-content">
    <p className="font-bold">
 Honest feedback from previous clients helps maintain quality and trust across the platform.
  
    </p>
  </div>
</div>
</div>



<h2 className="text-2xl font-serif font-bold text-center p-6">
Why Choose Us?
</h2>
<p className="text-center text-lg mx-2">
Verified Professionals: Every professional on FixNow undergoes a thorough screening process.
Ease of Use: Our platform is user-friendly, ensuring quick and smooth navigation.
Custom Solutions: Get matched with professionals who meet your specific requirements.
Supportive Community: We’re building a network that values trust, transparency, and customer satisfaction.
</p>

<h2 className="text-2xl font-serif font-bold text-center p-6">
Our Vision
</h2>
<p className="text-center text-lg mx-2">
FixNow envisions becoming a go-to platform that redefines the repair and maintenance industry. By integrating technology and trust, we aim to create a positive impact in local communities while helping skilled professionals thrive.

Join FixNow today and experience a smarter, faster, and more reliable way to get the job done.
</p>

<br></br><br></br><br></br><br></br>
  
  </div>
  )
}

export default page;
