import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/slice/userSlice';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Login = () => {
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const {loading,isAuthenticated}=useSelector(state=>state.user);
    const navigateTo=useNavigate();
    const dispatch=useDispatch();
    const handleLogin=(e)=>{
        e.preventDefault();
        const formData=new FormData();
         formData.append("email",email);
         formData.append("password",password);
         dispatch(login(formData));
    };
    useEffect(()=>{
        if(isAuthenticated){
            navigateTo("/");
        }
    },[dispatch,isAuthenticated,loading]);
  return (
    <>
<section className="w-full ml-0 m-0 h-fit px-5 pt-20 lg:pl-[320px] flex flex-col min-h-screen py-4 justify-center bg-gradient-to-br from-rose-500  to-blue-500" >
  <div className="mx-auto w-full max-w-md px-8 py-10 flex flex-col gap-6 items-center justify-center rounded-lg border border-gray-300 bg-white/50 backdrop-blur-lg shadow-lg">
    <h1 className="text-[#d6482b] font-bold text-3xl md:text-5xl mb-6 select-none">
      Login
    </h1>
    <form onSubmit={handleLogin} className="flex flex-col gap-5 w-full">
      <div className="flex flex-col">
        <label className="text-stone-700 mb-1 font-medium select-none">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="py-3 px-4 rounded border border-gray-400 bg-transparent text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#d6482b]/70 focus:border-[#d6482b]"
          required
          style={{ color: 'black' }}
        />
      </div>
      <div className="flex flex-col">
        <label className="text-stone-700 mb-1 font-medium select-none">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          className="py-3 px-4 rounded border border-gray-400 bg-transparent text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#d6482b]/70 focus:border-[#d6482b]"
          required
          style={{ color: 'black' }}
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="mt-4 bg-[#d6482b] hover:bg-[#b8381e] transition duration-300 text-white font-semibold py-3 rounded-md shadow-lg"
      >
        {loading ? "Logging In..." : "Login"}
      </button>
      <p className="mt-4 text-sm text-gray-700">
  Don't have an account?{' '}
  <Link to="/sign-up" className="text-[#d6482b] hover:underline font-medium">
    Sign up
  </Link>
</p>

    </form>
  </div>
</section>

      
    </>
  )
}

export default Login
