'use client'



import { SignIn, useUser } from '@clerk/nextjs';
import { useEffect, useState } from 'react';

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


  return (
   <div>
    
   <JobPage />
   </div>
   
  );
}

export default page;



export function JobPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [Cobject, setCobject] = useState({});
  const [rolePage, setRolePage] = useState("");

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const response = await fetch(`/api/role?userId=${encodeURIComponent(Cobject.fullName)}`);
        const data = await response.json();
        if (response.ok && data.role) {
          setRolePage(data.role.toLowerCase());
        } else {
          console.error("Error fetching role:", data.message);
        }
      } catch (error) {
        console.error("Error during API call:", error);
      }
    };

    if (Cobject.fullName) fetchUserRole();
  }, [Cobject]);

  useEffect(() => {
    async function fetchClientData() {
      try {
        const response = await fetch("/api/user");
        const data = await response.json();
        setCobject(data.clients[0]);
      } catch (error) {
        console.error("Error fetching client data:", error);
      }
    }

    fetchClientData();
  }, []);

  useEffect(() => {
    async function fetchJobs() {
      try {
        const response = await fetch('/api/job');
        const data = await response.json();

        if (response.ok) {
          const activeJobs = data.jobs.filter(
            (job) => new Date(job.expireDate) > new Date()
          );
          setJobs(activeJobs);
        } else {
          setError(data.message || 'Error fetching jobs');
        }
      } catch (error) {
        setError('An error occurred while fetching jobs');
      } finally {
        setLoading(false);
      }
    }

    fetchJobs();
  }, []);

  const handleApply = async (job) => {
    const userName = Cobject.userName || "Unknown User";
    const userEmail = Cobject.email || "unknown@example.com";
    const jobId = job._id;

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userName, userEmail, jobId }),
      });

      if (response.ok) {
        alert('Application submitted successfully!');
      } else {
        const errorData = await response.json();
        alert(`Failed to apply: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('Emial Send Successfully...!');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {jobs.map((job) => (
        <div key={job._id} className="bg-white p-4 rounded shadow-lg">
          <h3 className="text-xl font-semibold">{job.jobTitle}</h3>
          <p className="text-gray-500 mt-2">Location: {job.city}</p>
          <p className="mt-2">{job.description}</p>
          <div className="mt-4">
            <span className="text-gray-600 font-medium">Expires on: </span>
            <span>{new Date(job.expireDate).toLocaleDateString()}</span>
          </div>
          {rolePage === 'client' ? null : (
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded mt-4 hover:bg-blue-600"
              onClick={() => handleApply(job)}
            >
              Apply Now
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
