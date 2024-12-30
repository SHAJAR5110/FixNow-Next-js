
import React from 'react'
import Link from 'next/link'
function DeveloperTeam(){
    return(
       <div className="flex flex-col flex-wrap gap-1 my-1">
        
      {/* Shajar Abbas */}
      <span className="flex flex-wrap gap-1 my-1">
  <div className="card bg-base-100 image-full w-96 shadow-xl">
    <figure>
      <img
        src="https://media.licdn.com/dms/image/v2/D4D03AQGBbzsi9RThlQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1731742147578?e=1738195200&v=beta&t=69NvIBtl6TPbgxfiM_3dfVy82I_GGqMDsDBhmogfIMA"
        alt="Shajar Abbas" />
    </figure>
    <div className="card-body">
      <h2 className="card-title">Shajar Abbas</h2>
      <p></p>
      <div className="card-actions justify-end">
        <Link href="https://www.linkedin.com/in/shajar-abbas-45a855268/" target="_blank">      
        <button className="btn btn-primary">LinkedIn</button>
        </Link>
  
      </div>
    </div>
  </div>
  
  {/* Usama Zahoor */}
  <div className="card bg-base-100 image-full w-96 shadow-xl">
    <figure>
      <img
        src="https://media.licdn.com/dms/image/v2/D4D03AQGBL0MUl6EQaQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1710187175699?e=1738195200&v=beta&t=_7ZEk-ujYPwiDxa05nKW8yepXkW8SZ7FVns4JSxTAA8"
        alt="Usama Zahoor" />
    </figure>
    <div className="card-body">
      <h2 className="card-title">Usama Zahoor</h2>
      <p></p>
      <div className="card-actions justify-end">
        <Link href="https://www.linkedin.com/in/usama-zahoor/" target="_blank">      
        <button className="btn btn-primary">LinkedIn</button>
        </Link>
  
      </div>
    </div>
  </div>
  
  {/* Noman Ishfaq */}
  <div className="card bg-base-100 image-full w-96 shadow-xl">
    <figure>
      <img
        src="https://media.licdn.com/dms/image/v2/D4D03AQGJh_WCu8WDgA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1720424376511?e=1738195200&v=beta&t=ni4R3EBttMBVT68iVm4SdPJatyK_kwYr66pcTL6Tp6s"
        alt="Noman Ishfaq" />
    </figure>
    <div className="card-body">
      <h2 className="card-title">Noman Ishfaq</h2>
      <p></p>
      <div className="card-actions justify-end">
        <Link href="https://www.linkedin.com/in/noman-ishfaq-5750b4238/" target="_blank">      
        <button className="btn btn-primary">LinkedIn</button>
        </Link>
  
      </div>
    </div>
  </div>
  {/* Arslan Rasheed */}
  <div className="card bg-base-100 image-full w-96 shadow-xl">
    <figure>
      <img
        src="/arslan.jpeg"
        alt="Arslan Rasheed" />
    </figure>
    <div className="card-body">
      <h2 className="card-title">Arslan Rasheed</h2>
      <p></p>
      <div className="card-actions justify-end">
        <Link href="" target="_blank">      
        <button className="btn btn-primary">LinkedIn</button>
        </Link>
  
      </div>
    </div>
  </div>
  </span>
    </div>
    )
  }

export default DeveloperTeam