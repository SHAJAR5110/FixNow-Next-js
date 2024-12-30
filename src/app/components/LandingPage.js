import React from 'react'
import Image from "next/image";
import Link from 'next/link';
function LandingPage() {
  return (
    <div className="flex flex-col justify-center items-center">
    <div className="bg-[#F7FAFC] h-[30rem] w-[100%] flex-col justify-center items-center tablet-max:h-[35rem]">
      {/* Heading of Navbar */}
      <br></br>
      <br></br>
      <div className="flex flex-col justify-center items-center text-center">
        <h1 className="text-6xl font-bold laptop-max:text-4xl">
          Find Trusted Professionals for All Your Home Services
        </h1>
      </div>

      <br></br>
      <div className="flex flex-col justify-center items-center text-center p-5">
        <h1 className="text-4xl font-bold text-[#03A9F4] laptop-max:text-2xl">
          Easily connect with trusted plumbers, electricians, and repair
          experts near you.
        </h1>
      </div>

      {/* last heading */}
      <div className="flex flex-col justify-center items-center text-center p-5">
        <h1 className="text-xl font-bold text-[#7D8396] laptop-max:text-center laptop-max:text-xl">
          Find a Professional Now!
        </h1>
      </div>
      {/* Button of Get Started */}
      <div className="flex flex-col justify-center items-center text-center p-5">
        <Link href='/sign-in'>
        <button className="bg-[#03A9F4] text-white w-[10rem] p-4 rounded-lg hover:bg-white hover:text-black hover:font-bold hover:border-4 hover:border-[#03A9F4] ">
          Get Started
        </button>
        </Link>
      </div>
    </div>
    {/*End of Heading of Navbar */}

    {/* Services Section of Navbar*/}
<div className="flex flex-col justify-center items-center p-2 leading-6">
  <h2 className="font-bold text-4xl mt-10  text-center">
  Find Trusted Professionals Near You
  </h2>
  <p className="text-[#7d8396] font-bold mt-3 text-center text-xl" >
  Connect with highly skilled plumbers, electricians, <br></br>
  and repair experts for all your home service needs.
  </p>
</div>
<br></br>
<br></br>
<br></br>
<br></br>
  {/* Services Section of Navbar Image 1*/}
  <div className="flex justify-center items-center mobile-max:flex-col tablet-max:flex-col ">
  <Image 
      src="/LandingPageH1.jpeg" 
      alt="Image1" 
      width={500} 
      height={300} 
    />
    <p className="text-[#7D8396] font-bold text-center text-xl">
    Discover the best professionals near you!
    </p>
  </div>
  {/* Services Section of Navbar Image 2*/}
  <div className="flex justify-center items-center mobile-max:flex-col tablet-max:flex-col">
   
  <Image 
      src="/LandingPageH2.jpeg" 
      alt="Image1" 
      width={500} 
      height={300} 
    />
     <p className="text-[#7D8396] font-bold text-center text-xl">
    Call a worker in your local area and get your work done from home.
    </p>
  </div>

  {/* Services Section of Navbar Image 3*/}
  <div className="flex justify-center items-center mobile-max:flex-col tablet-max:flex-col">
  <Image 
      src="/LandingPageH3.jpeg" 
      alt="Image1" 
      width={500} 
      height={300} 
    />
    <p className="text-[#7D8396] font-bold text-center text-xl">
    Pay the worker as soon as the job is done and make your life easier.
    </p>
  </div>
  

  </div>
  )
}

export default LandingPage