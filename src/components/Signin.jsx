import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext.jsx'

const Signin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState('');

    const {session, signInUser} = UserAuth();
    const navigate = useNavigate();

    console.log('Signin component - session:', session);
    console.log('Signin component - signInUser function:', !!signInUser);
    console.log('Signin component - email, password:', email, password);

    const handleSignIn = async (e) => {
        console.log('Button clicked! Form submitted.');
        e.preventDefault();
        setLoading(true);
        setError(''); // Clear any previous errors
        
        try{
            console.log('Attempting signin with:', email, password);
            const result = await signInUser(email, password);
            console.log('Signin result:', result);
            
            if(result && result.success){
                console.log('Signin successful, navigating to dashboard');
                navigate('/dashboard');
            } else {
                const errorMessage = result?.error || 'Signin failed. Please check your email and password.';
                console.log('Signin failed:', errorMessage);
                setError(errorMessage);
            }
        } catch(error){
            console.error('Signin error:', error);
            setError(error.message || 'An unexpected error occurred');
        }finally{
            setLoading(false);
        }
    };

  return (
    <form onSubmit={handleSignIn} className='max-w-md m-auto pt-24'>
        <h2 className='font-bold text-2xl mb-4'>Sign In today!</h2>
        <p>
            Don't have an account? <Link to="/signup">Sign up!</Link>
        </p>
        <div className='flex flex-col py-4'>
            <input 
                onChange={(e) => setEmail(e.target.value.toLowerCase())} 
                value={email}
                placeholder='Email' 
                className='p-3 mt-6' 
                type="email"/>
            <input 
                onChange={(e) => setPassword(e.target.value)} value={password} 
                placeholder='Password' 
                className='p-3 mt-6' 
                type="password"/>
            <button 
                type='submit' 
                disabled={loading} 
                className='mt-6'
                onClick={() => console.log('Button clicked directly!')}
            >
                Sign In
            </button>
            {error && <p className='text-red-600 text-center pt-4'>{error}</p>}
        </div>
    </form>
  );
};

export default Signin   