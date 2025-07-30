import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext.jsx'

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState('');

    const {session, signUpNewUser} = UserAuth();
    const navigate = useNavigate();

    console.log('Signup component - session:', session);
    console.log('Signup component - signUpNewUser function:', !!signUpNewUser);
    console.log('Signup component - email, password:', email, password);

    const handleSignUp = async (e) => {
        console.log('Button clicked! Form submitted.');
        e.preventDefault();
        setLoading(true);
        setError(''); // Clear any previous errors
        
        try{
            console.log('Attempting signup with:', email, password);
            console.log('signUpNewUser function exists:', !!signUpNewUser);
            
            if (!signUpNewUser) {
                throw new Error('signUpNewUser function is not available');
            }
            
            const result = await signUpNewUser(email, password);
            console.log('Signup result:', result);
            
            if(result && result.success){
                if(result.message) {
                    // Email confirmation required
                    setError(result.message);
                    console.log('Signup successful but email confirmation required');
                } else {
                    // Direct signin successful
                    console.log('Signup successful, navigating to dashboard');
                    navigate('/dashboard');
                }
            } else {
                const errorMsg = result?.error?.message || 'Signup failed';
                console.log('Signup failed:', errorMsg);
                setError(errorMsg);
            }
        } catch(error){
            console.error('Signup error:', error);
            setError(error.message || 'An unexpected error occurred');
        }finally{
            setLoading(false);
        }
    };

  return (
    <form onSubmit={handleSignUp} className='max-w-md m-auto pt-24'>
        <h2 className='font-bold text-2xl mb-4'>Sign Up today!</h2>
        <p>
            Already have an account? Sign in! <Link to="/signin">Sign in</Link>
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
                Sign Up
            </button>
            {error && <p className='text-red-600 text-center pt-4'>{error}</p>}
        </div>
    </form>
  );
};

export default Signup   