

import { SignIn } from '@clerk/nextjs';

export default function Signin() {
    
    return (
        <div className="flex justify-center items-center m-auto h-[80vh] w-full ">
            <SignIn />
        </div>
    );
}
