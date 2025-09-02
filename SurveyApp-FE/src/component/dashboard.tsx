import { Button } from "@/components/ui/button";
import { userAuth } from "@/context/AuthContext"
import { useNavigate } from "react-router-dom";
import React from 'react';

// import React from 'react'
const dashboard = () => {
  const {session,signOut} = userAuth();
  const navigate = useNavigate();

  const handleSignOut = async (e: React.MouseEvent<HTMLButtonElement>) =>{
    e.preventDefault()
    try{
      await signOut()
      navigate('/')
    } catch(err){
      console.error(err);
    }
  }

  console.log(session);
  return (
    <div className="z-10 flex flex-col gap-2">
    <div className="text-primary">dashboard</div>
    <h2 className="text-primary">Welcome, {session?.user?.email}</h2>
    <Button onClick={handleSignOut} className="w-full">
      Sign Out
    </Button>
    <Button onClick={() => navigate('/survey')} className="w-full">
      Take this survey!
    </Button>
    </div>
  )
}

export default dashboard;