import React from 'react'
import { useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'


const Dashboard = () => {
  const {session, SignOut} = UserAuth();

  const navigate = useNavigate();

  console.log(session);

  const handleSignOut = async (e) => {
    e.preventDefault();
    try{
      console.log('Attempting to sign out...');
      const result = await SignOut();
      console.log('Sign out result:', result);
      
      if(result.success){
        console.log('Sign out successful, navigating to home');
        navigate('/');
      } else {
        console.log('Sign out failed:', result.error);
      }
    }catch(error){
      console.log('Sign out error:', error);
    }
  }

  return (
  <div>
    <h1>Dashboard</h1>
    <h2>Welcome, {session?.user?.email}</h2>
    <div>
      <p onClick={handleSignOut} 
      className='hover:cursor-pointer border inline-block px-4 py-3 mt-4'>Sign out</p>
      </div>
    </div>
  );
};

export default Dashboard    