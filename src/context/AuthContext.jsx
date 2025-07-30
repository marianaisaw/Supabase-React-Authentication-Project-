import { createContext, useEffect, useState, useContext } from 'react';
import { supabase } from '../supabaseClient';


const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [session, setSession] = useState(undefined);


    //Sign up 

    const signUpNewUser = async (email, password) => {
        console.log('Starting signup process for:', email);
        
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
        });

        console.log('Signup response:', { data, error });

        if (error) {
            console.log("there was an error signing up", error);
            return { success: false, error };
        }
        
        // Check if email confirmation is required
        if (data.user && !data.user.email_confirmed_at) {
            console.log('User created but email confirmation required');
            return { 
                success: true, 
                data, 
                message: 'Account created! Please check your email to confirm your account before signing in.' 
            };
        }
        
        // If signup is successful and email is confirmed, automatically sign in the user
        if (data.user) {
            console.log('User created successfully, attempting to sign in...');
            const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
                email: email,
                password: password,
            });
            
            console.log('Sign in response:', { data: signInData, error: signInError });
            
            if (signInError) {
                console.log("Error signing in after signup:", signInError);
                return { success: false, error: signInError };
            }
            
            console.log('Signup and signin successful!');
            return { success: true, data: signInData };
        }
        
        console.log('Signup completed but no user data returned');
        return { success: true, data };
    };

    //Sign in
    //review this if prefered to sign up with github or google
    const signInUser = async (email, password) => {
        console.log('Starting signin process for:', email);
        
        try{
            const {data, error} = await supabase.auth.signInWithPassword({
                email: email,
                password: password,
            });

            console.log('Signin response:', { data, error });

            if(error){
                console.error("Error signing in", error);
                return { success: false, error: error.message };
            }
            console.log("sign-in success:", data);
            return { success: true, data };
        } catch(error){
            console.error("Error signing in", error);
            return { success: false, error: error.message };
        }
    };

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
        });

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });
    }, []);

    //Sign out
    const SignOut = async () => {
        console.log('SignOut function called');
        const { error } = await supabase.auth.signOut();
        if(error){
            console.log("there was an error signing out", error);
            return { success: false, error };
        }
        console.log('Sign out successful');
        return { success: true };
    };


    console.log('AuthContext providing:', { session, signUpNewUser: !!signUpNewUser, signInUser: !!signInUser, SignOut: !!SignOut });
    
    return(
        <AuthContext.Provider value={{ session, signUpNewUser, signInUser, SignOut }}>{children}</AuthContext.Provider>
    );
};

export const UserAuth = () => {
    return useContext(AuthContext);
};

export default AuthContext;