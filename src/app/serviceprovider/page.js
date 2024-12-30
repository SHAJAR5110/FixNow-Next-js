"use client";

import { LuChevronsUpDown } from "react-icons/lu";
import { SignIn, useUser } from "@clerk/nextjs";
import { FaUserEdit } from "react-icons/fa";
import { MdOutlinePostAdd } from "react-icons/md";
import { MdOutlineReportGmailerrorred } from "react-icons/md";
import React, {  useState, useEffect } from "react";
import { FaUsers } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import Link from "next/link";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";


function Page() {
  const { isSignedIn, user, isLoaded } = useUser();
  const role="client";
  


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

  if (isSignedIn && role === "client") {
    return (
      <div className="flex flex-col justify-start h-full w-full">
        <Dashboard />
        
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center text-center mt-10 h-[80vh]">
      <SignIn />
    </div>
  );
}



export default Page;

export function Dashboard() {
  const { user } = useUser();
  const [openNav, setNav] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setNav(false);
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [SPobject, setSPobject] = useState("");
  
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/user");
        const data = await response.json(); // Await added here
        // console.log("Ye raha all data:", data);
        // console.log("Clients:", data.clients);
        console.log("Service Providers:", data.serviceProviders[0]);
        setSPobject(data.serviceProviders[0]);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);
  
  const [currentComponent, setCurrentComponent] = useState("Userform");

  return (
    <div className="flex flex-col justify-center items-center w-full min-h-screen">
    {/* top section */}
      <div className="bg-[#b4d8e9] w-full h-16 flex justify-center items-center">
        <FaUsers className="text-4xl mx-1" /> {SPobject.username || ""}&nbsp; &nbsp;
        { SPobject.status ? (
        <Badge className="text-green-700 bg-white border-green-500 hover:bg-green-600 hover:text-white">Verified</Badge>):
        
        <Badge className="text-red-700 bg-white border-red-500 hover:bg-red-600 hover:text-white">Not Verified</Badge> 
      
      }
      </div>
      {/* body section */}
      <div className="bg-white w-full flex flex-1 laptop-max:flex-col laptop-max:justify-start laptop-max:items-start">
       {/* side bar section */}
        <div className="bg-[#E2F4FF] w-[30%] flex flex-col items-start justify-start p-5 laptop-max:flex laptop-max:justify-center laptop-max:items-center laptop-max:w-full laptop-max:h-auto">
          <div
            className="hidden w-full justify-end items-end text-2xl p-1 cursor-pointer laptop-max:flex"
            onClick={() => setNav(!openNav)}
          >
            <LuChevronsUpDown />
          </div>
          {openNav ? (
            <div className="flex gap-3 w-full justify-center items-center laptop:hidden">
              <FaUserEdit
                onClick={() => setNav(!openNav)}
                className="text-3xl  cursor-pointer hover:scale-150"
              />
              <MdOutlinePostAdd
                onClick={() => setNav(!openNav)}
                className="text-3xl  cursor-pointer hover:scale-150"
              />
              <MdOutlineReportGmailerrorred
                onClick={() => setNav(!openNav)}
                className="text-3xl  cursor-pointer hover:scale-150"
              />
            </div>
          ) : (
            <span>
              {SPobject &&
              <div className="flex flex-col justify-start items-center mb-4 h-[250px] leading-5">
              <h1 className="text-3xl text-bold ">Account</h1>
                <span className="flex flex-col justify-start items-start">
                  <h3 className="text-xl text-bold " >ID: {SPobject._id}</h3>
                  <h3 className="text-xl text-bold " >Name: {SPobject.username}</h3>
                  <h3 className="text-xl text-bold " >Service: {SPobject.services}</h3>
                  <h3 className="text-xl text-bold " >Phone: {SPobject.phone}</h3>
                  <h3 className="text-xl text-bold " >NIC: {SPobject.cnic}</h3>
                  <h3 className="text-xl text-bold " >City: {SPobject.city}</h3>
                </span>
              </div>
              }
              <div className="flex justify-between items-start my-3">
                <span className="mr-5 text-xl font-bold">Main Page&nbsp;</span>
                <Button onClick={() => setCurrentComponent("Userform")} className="w-[150px] ml-14 bg-blue-500">User</Button>
              </div>
              <div className="flex justify-between items-center mb-4">
                <div className="mx-1 text-black text-xl font-bold">Select</div>
                <Select className="border-black">
                  <SelectTrigger className="w-[160px]">
                    <SelectValue placeholder="User Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem  disabled  value="Client">Client</SelectItem>
                    <SelectItem active value="ServiceProvider">Service Provider</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-between items-start my-3">
                <span className="mr-5 text-xl font-bold">Job&nbsp;</span>
                <Link href={'/jobs'} className="w-[150px] ml-4 bg-blue-500 rounded-md p-2 text-white text-center"> Job</Link>
              </div>
              <div className="flex justify-between items-start my-3">
                <span className="mr-5 text-xl font-bold">Report&nbsp;</span>
                <Button onClick={() => setCurrentComponent("ReportUser")} className="w-[150px] ml-14 bg-blue-500">Report</Button>
              </div>
            </span>
          )}
           <div>
            
          </div>
        </div>
          {/* main section */}

        <div className="w-full flex-col justify-start flex-wrap items-start p-3 laptop-max:h-full laptop-max:flex-col laptop-max:justify-start laptop-max:items-center">
           {/* Dynamic Component Rendering */}
      {currentComponent === "Userform" ? <Userform /> : <ReportUser />}
      

      </div>
    </div>
  </div>
  );
}


export function Userform(){

  const [dob, setDob] = useState("");
  const [error, setError] = useState("");
  const [frontImage, setFrontImage] = useState(null);
  const [backImage, setBackImage] = useState(null);
  const [imageError, setImageError] = useState("");
  const [certifications, setCertifications] = useState(0);
  const [city, setCity] = useState("");


  const validateAge = (dob) => {
    const today = new Date();
    const selectedDate = new Date(dob);
    const age = today.getFullYear() - selectedDate.getFullYear();
    const monthDifference = today.getMonth() - selectedDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < selectedDate.getDate())) {
      return age - 1;
    }
    return age;
  };

  const handleDropdownChange = (event) => {
    setCertifications(parseInt(event.target.value, 10));
  };

  const handleCityChange = (value) => {
    setCity(value);
  };
  
  const [selectedValue, setSelectedValue] = useState("");
  const [serviceTypes, setServiceTypes] = useState([]);
  const [customService, setCustomService] = useState("");

  const handleDropdownChangeServices = (e) => {
    const value = e.target.value;
    setSelectedValue(value);

    // Define servicing types for known categories
    const servicingOptions = {
      Cleaning: ["House Cleaning", "Carpet Cleaning", "Window Cleaning"],
      Plumbing: ["Leak Repair", "Drain Cleaning", "Pipe Installation"],
      Electrical: ["Light Installation", "Wiring Repair", "Appliance Setup"],
      Painting: ["Wall Painting", "Furniture Painting", "Exterior Painting"],
      Gardening: ["Lawn Mowing", "Plant Maintenance", "Landscaping"],
      Moving: ["Packing", "Loading", "Unpacking"],
    };

    // If "Other" is selected, clear existing services
    if (value === "Other") {
      setServiceTypes([]);
    } else {
      setServiceTypes(servicingOptions[value] || []);
    }
  };

  const handleCustomServiceChange = (e) => {
    setCustomService(e.target.value);
  };

  const handleSubmit = async (e) => {
    const handleSubmit = async (e) => {
      e.preventDefault(); // Prevent default form submission
      let isValid = true;
    
      // Validate age
      const age = validateAge(dob);
      if (age < 18) {
        setError("Under Age! You must be 18 years or older to qualify.");
        isValid = false;
      } else {
        setError("");
      }
    
      // Validate image uploads
      if (!frontImage || !backImage) {
        setImageError("Please upload both front and back CNIC images.");
        isValid = false;
      } else {
        setImageError("");
      }
    
      // Validate other required fields
      const username = document.getElementById("username").value;
      const email = document.getElementById("email").value;
      const phone = document.getElementById("phone").value;
      const cnic = document.getElementById("cnic").value;
      const address1 = document.getElementById("address1").value;
      const address2 = document.getElementById("address2").value;
      const city = document.getElementById("city").value; // Assuming you have a city input
      const experience = document.getElementById("experience").value;
    
      if (!username || !email || !phone || !cnic || !address1 || !address2 || !city || !experience || !frontImage || !backImage || !certifications) {
        alert("Please fill out all required fields.");
        isValid = false;
      }
    
      // If any validation fails, stop further execution
      if (!isValid) {
        return;
      }
    
      try {
        // Fetch user role
        const response = await fetch(`/api/role?userId=${encodeURIComponent(user.fullName)}`);
        const data = await response.json();
        const role = data.role;
    
        // Prepare form data
        const formData = new FormData();
        formData.append("username", username);
        formData.append("email", email);
        formData.append("phone", phone);
        formData.append("cnic", cnic);
        formData.append("dob", dob);
        formData.append("city", city);
        formData.append("address1", address1);
        formData.append("address2", address2);
        formData.append("experience", experience);
        formData.append("services", selectedValue === "Other" ? customService : selectedValue);
        formData.append("certificate", certifications);
        formData.append("frontCnicImage", document.getElementById("front-cnic-input").files[0]);
        formData.append("backCnicImage", document.getElementById("back-cnic-input").files[0]);
        formData.append("Role", role);
        formData.append("status", false);
    
        // Submit form data
        const res = await fetch('/api/user', {
          method: 'POST',
          body: formData, // Use FormData
        });
    
        if (res.ok) {
          const responseData = await res.json();
          console.log('User  created:', responseData);
          alert("Form submitted successfully!");
        } else {
          const errorData = await res.json();
          console.log('Error:', errorData);
          alert("Error submitting form.");
        }
      } catch (error) {
        console.log('Error:', error);
        alert("Network error occurred.");
      }
    };
  };
  return(
    
    <form onSubmit={handleSubmit}>
            <div className="flex gap-3 p-2 items-center tablet-max:flex-col tablet-max:items-start tablet-max:justify-start tablet-max:gap-0">
              <label className="text-xl font-bold" htmlFor="username">Username</label>
              <Input
                className="border border-black w-[20rem] p-2 placeholder-black/30 rounded-md tablet-max:w-[100%]"
                type="text"
                id="username"
                pattern="[a-zA-Z ]{3,30}$"
                placeholder="Your Name"
                required
              />
            </div>

          {/* email input field */}
          <div className="flex gap-14 p-2 items-center tablet-max:flex-col tablet-max:items-start tablet-max:justify-start tablet-max:gap-0">
            <label className="text-xl font-bold" htmlFor="email">
              Email
            </label>
            <Input
              className="border border-black w-[20rem] p-2 placeholder-black/30 rounded-md tablet-max:w-[100%]"
              type="text"
              id="email"
              placeholder="abc@gmail.com"
              required
            />
          </div>
          {/* phone input field */}
          <div className="flex gap-12 p-2 items-center my-0 tablet-max:flex-col tablet-max:items-start tablet-max:justify-start tablet-max:gap-0">
          <label className="text-xl font-bold" htmlFor="phone">
            Phone
          </label>
          <Input
            className="border border-black w-[20rem] p-2 placeholder-black/30 rounded-md tablet-max:w-[100%]"
            type="text"
            id="phone"
            placeholder="03xxxxxxxxx"
            required
            maxLength="13"
            pattern="^03\d{9}$"
            title="Enter a valid Pakistani phone number in the format 03001234567"/>
          </div>

           {/* CNIC input field */}
                <div className="flex gap-14 p-2 items-center my-0 tablet-max:flex-col tablet-max:items-start tablet-max:justify-start tablet-max:gap-0">
                <label className="text-xl font-bold" htmlFor="cnic">
                  CNIC
                </label>
                <Input
                  className="border border-black w-[20rem] p-2 placeholder-black/30 rounded-md tablet-max:w-[100%]"
                  type="text"
                  id="cnic"
                  placeholder="1234567891234"
                  pattern="\d{13}"
                  maxLength="13"
                  required
                  title="CNIC must be 13 numeric characters without dashes"
                />
              </div>
              {/* Age input field */}
              <div>
  <label htmlFor="dob" className="text-xl font-bold">
    Date of Birth:
  </label>
  <input
    type="date"
    className="border border-black w-[20rem] p-2 placeholder-black/30 rounded-md tablet-max:w-[95%] tablet-max:mx-auto tablet-max:ml-3"
    id="dob"
    name="dob"
    value={dob}
    onChange={(e) => setDob(e.target.value)}
    required
  />
  {error && <p style={{ color: "red" }}>{error}</p>}
            </div>

          {/* Address input field */}
          <div className="flex flex-col gap-3 p-2 items-start tablet-max:flex-col tablet-max:items-start tablet-max:justify-start tablet-max:gap-0">
            <div className="text-2xl font-bold">Address:</div>
            <div className="flex flex-col gap-3 p-2 items-start tablet-max:flex-col tablet-max:items-start tablet-max:justify-start tablet-max:gap-0">
      <div className="text-2xl font-bold">Address:</div>
      <div className="flex gap-3 items-center">
        <h1 className="font-bold">Select your City</h1>
        <Select onValueChange={handleCityChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a City" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="chakwal">Chakwal, Punjab</SelectItem>
            <SelectItem value="lahore">Lahore, Punjab</SelectItem>
            <SelectItem value="karachi">Karachi, Sindh</SelectItem>
            <SelectItem value="peshawar">Peshawar, Khyber Pakhtunkhwa</SelectItem>
            <SelectItem value="quetta">Quetta, Balochistan</SelectItem>
            <SelectItem value="islamabad">Islamabad, Federal</SelectItem>
            <SelectItem value="faisalabad">Faisalabad, Punjab</SelectItem>
            <SelectItem value="multan">Multan, Punjab</SelectItem>
            <SelectItem value="rawalpindi">Rawalpindi, Punjab</SelectItem>
            <SelectItem value="sialkot">Sialkot, Punjab</SelectItem>
            <SelectItem value="gujranwala">Gujranwala, Punjab</SelectItem>
            <SelectItem value="hyderabad">Hyderabad, Sindh</SelectItem>
            <SelectItem value="sukkur">Sukkur, Sindh</SelectItem>
            <SelectItem value="abbottabad">Abbottabad, Khyber Pakhtunkhwa</SelectItem>
            <SelectItem value="dera-ismael-khan">Dera Ismael Khan, Khyber Pakhtunkhwa</SelectItem>
            <SelectItem value="gilgit">Gilgit, Gilgit-Baltistan</SelectItem>
            <SelectItem value="skardu">Skardu, Gilgit-Baltistan</SelectItem>
            <SelectItem value="muzzaffarabad">Muzaffarabad, Azad Kashmir</SelectItem>
            <SelectItem value="mirpur">Mirpur, Azad Kashmir</SelectItem>
          </SelectContent>
        </Select>
      </div>
              </div>
            <div className="flex gap-3 p-2 items-center laptop-max:flex-wrap  tablet-max:flex-col tablet-max:items-start tablet-max:justify-start w-full tablet-max:gap-0 tablet-max:w-full" >
              <div className="flex gap-3 p-2 items-center  tablet-max:flex-col tablet-max:items-start tablet-max:justify-start tablet-max:gap-0">
              <label className="text-xl font-bold" htmlFor="address1">
                Address 1
              </label>
              <Input
                className="border border-black w-[20rem] p-2 placeholder-black/30 rounded-md "
                type="text1"
                id="address1"
                placeholder="Street Address"
                required
              />
              </div>
              <div className="flex gap-3 p-2 items-center  tablet-max:flex-col tablet-max:items-start tablet-max:justify-start tablet-max:gap-0">
              <label className="text-xl font-bold" htmlFor="address2">
                Address 2
              </label>
              <Input
                className="border border-black w-[20rem] p-2 placeholder-black/30 rounded-md "
                type="text1"
                id="address2"
                placeholder="Hosue number, Apartment"
                required
                />
                </div>
            </div>
          </div>
          {/* Experience input field */}
          <div className="flex gap-5 p-2 items-start my-0 tablet-max:flex-col tablet-max:items-start tablet-max:justify-start tablet-max:gap-0">
                <label className="text-xl font-bold" htmlFor="experience">
                  Experience
                </label>
                <Textarea
                 className="border border-black w-[20rem] p-2 placeholder-black/30 rounded-md tablet-max:w-[100%] h-[10rem]"
                 type="textarea"
                 id="experience"
                 placeholder="Write your experience and working history"
                 required
                />
              </div>
          {/* service provider input */}
          <div className="flex flex-col gap-3 p-2 items-start tablet-max:flex-col tablet-max:items-start tablet-max:justify-start tablet-max:gap-0">
      <label htmlFor="service" className="block mb-2 font-bold">
        Select a Service:
      </label>
      <select
        id="service"
        onChange={handleDropdownChangeServices}
        required
        className="border border-black w-[20rem] p-2 placeholder-black/30 rounded-md tablet-max:w-[100%]"
      >
        <option value="">Select a Service</option>
        <option value="Cleaning">Cleaning</option>
        <option value="Plumbing">Plumbing</option>
        <option value="Electrical">Electrical</option>
        <option value="Painting">Painting</option>
        <option value="Gardening">Gardening</option>
        <option value="Moving">Moving</option>
        <option value="Other">Other</option>
      </select>

      {/* Render available servicing types */}
      {selectedValue && selectedValue !== "Other" && (
        <div className="mt-4">
          <h2 className="font-bold">Including:</h2>
          {serviceTypes.length > 0 ? (
            <ul className="list-disc ml-5">
              {serviceTypes.map((type, index) => (
                <li key={index} className="mt-2">
                  {type}
                </li>
              ))}
            </ul>
          ) : (
            <p>No servicing types available for this selection.</p>
          )}
        </div>
      )}

      {/* Render custom input field for "Other" */}
      {selectedValue === "Other" && (
        <div className="mt-4">
          <label htmlFor="customService" className="block mb-2 font-bold">
            Enter Your Service:
          </label>
          <input
            id="customService"
            type="text"
            value={customService}
            onChange={handleCustomServiceChange}
            placeholder="Enter your custom service"
            className="border border-black w-[20rem] p-2 placeholder-black/30 rounded-md tablet-max:w-[100%]"
          />
        </div>
      )}
    </div>
          {/* certificate input field */}
          <div className="flex flex-col  gap-5 p-2 items-start justify-start my-0 tablet-max:flex-col tablet-max:items-start tablet-max:justify-start tablet-max:gap-0">
        <div className="flex flex-col gap-3 p-2 items-start justify-start my-0 tablet-max:flex-col tablet-max:items-start tablet-max:justify-start tablet-max:gap-0">
      <label className="text-xl font-bold" htmlFor="certificate">Select the number of certifications:</label>
      <select
        id="certificate"
        onChange={handleDropdownChange}
        required
        className="border border-black w-[20rem] p-2 placeholder-black/30 rounded-md tablet-max:w-[100%]"
      >
        <option value="">Select</option>
        <option value="0">0</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
      </div>
      {/* Render file upload inputs dynamically */}
      <div className="flex flex-col gap-3 p-2 items-start justify-start my-0 tablet-max:flex-col tablet-max:items-start tablet-max:justify-start tablet-max:gap-0">
        {Array.from({ length: certifications }, (_, index) => (
          <div key={index} style={{ marginBottom: "10px" }}>
            <label htmlFor={`file${index + 1}`}>
              Upload Certification {index + 1}:
            </label>
            <input
              type="file"
              id={`file${index + 1}`}
              name={`file${index + 1}`}
              style={{ marginLeft: "10px" }}
            />
          </div>
        ))}
      </div>
          </div>
          {/* CNIC Front-Back images input field */}
          <div className="flex gap-14 p-2 items-center tablet-max:flex-col tablet-max:items-start tablet-max:justify-start">
  {/* Front CNIC Image */}
  <div className="w-full">
    <label className="text-xl font-bold" htmlFor="front-cnic-input">
      Front CNIC Image
    </label>
    <div className="flex items-center justify-center w-full">
      <label
        htmlFor="front-cnic-input"
        className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-300"
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <svg
            className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 16"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
            />
          </svg>
          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
            <span className="font-semibold">Click to upload</span> or drag and
            drop
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            SVG, PNG, JPG or GIF (MAX. 800x400px)
          </p>
        </div>
        <input
          id="front-cnic-input"
          type="file"
          className="hidden"
          onChange={(e) => setFrontImage(e.target.files[0])}
        />
      </label>
    </div>
  </div>

  {/* Back CNIC Image */}
  <div className="w-full">
    <label className="text-xl font-bold" htmlFor="back-cnic-input">
      Back CNIC Image
    </label>
    <div className="flex items-center justify-center w-full">
      <label
        htmlFor="back-cnic-input"
        className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-300"
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <svg
            className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 16"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
            />
          </svg>
          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
            <span className="font-semibold">Click to upload</span> or drag and
            drop
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            SVG, PNG, JPG or GIF (MAX. 800x400px)
          </p>
        </div>
        <input
          id="back-cnic-input"
          type="file"
          className="hidden"
          onChange={(e) => setBackImage(e.target.files[0])}
        />
      </label>
    </div>
  </div>
</div>

      {/* Error Message */}
      {imageError && <p style={{ color: "red" }}>{imageError}</p>}
 
          {/* Submit Button */}
          <div className='flex justify-center items-center mx-auto'>
          <Button  type="submit"> Submit</Button>
          </div>
      </form>
  );
}

export function ReportUser() {
  const [Cobject, setCobject] = useState("");
  
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/user");
        const data = await response.json(); // Await added here
        setCobject(data.serviceProviders[0]);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    

  
    const ReportID = e.target.userId.value;
    const complaint = e.target.complaint.value;
    const ID = Cobject._id;
    const role="serviceprovider";
    // Prepare data to send in the request body
    const formData = {role,ID, ReportID, complaint };
    console.log("Form data for report", formData);
    try {
      // Make the POST request to submit the report
      const response = await fetch('/api/report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Report submitted successfully:', result);
        alert('Report submitted successfully!');
        e.target.reset(); // Clear the form after submission
      } else {
        const errorData = await response.json();
        alert(`Failed to submit report: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      alert('An unexpected error occurred');
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 border border-gray-300 rounded shadow-md my-10">
      <h2 className="text-lg font-semibold mb-4">Report User</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="userId" className="block text-sm font-medium text-gray-700 mb-1">
            User ID
          </label>
          <input
            type="text"
            id="userId"
            name="userId"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded"
            placeholder="Enter User ID"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="complaint" className="block text-sm font-medium text-gray-700 mb-1">
            Complaint
          </label>
          <textarea
            id="complaint"
            name="complaint"
            required
            rows="4"
            className="w-full px-3 py-2 border border-gray-300 rounded"
            placeholder="Enter your complaint"
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
