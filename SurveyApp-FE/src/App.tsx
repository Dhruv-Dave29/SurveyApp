import { useNavigate } from "react-router-dom";
import { Button } from "./components/ui/button";
import { userAuth } from "./context/AuthContext";

// import { useState } from 'react'


function App() {
  const {session} = userAuth();
  const navigate = useNavigate();

    if (session) {
    return (<div className="z-10 flex flex-col gap-4">
    
    <p className="text-primary">Go to dashboard to take surveys, {session?.user?.email}</p>
    <Button onClick={() => navigate('/dashboard')} className="w-full">
      Dashboard
    </Button>

    </div>);
  }
  return (
    <div className="z-10 flex flex-col gap-4">
    <h5 className=" text-primary text-4xl">WaterLily survey Form!</h5>
    <Button onClick={() => navigate('/signin')} className="w-full">
      Sign In!
    </Button>
        <Button onClick={() => navigate('/signup')} className="w-full">
          Sign Up!
        </Button>
    </div>
  )
  
}

export default App;
