import { useState } from "react";
import {Link} from 'react-router-dom'
import {useAuthStore} from '../store/useAuthStore'

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const {login} = useAuthStore();

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const handleSubmit = ()=>{
    login({email,password});
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl border border-gray-100 p-10 w-full max-w-sm shadow-sm">

        {/* Logo */}
        <div className="w-9 h-9 bg-gray-900 rounded-lg mb-5" />

        {/* Header */}
        <h1 className="text-xl font-semibold text-gray-900 mb-1">
          Welcome back
        </h1>
        <p className="text-sm text-gray-400 mb-7">
          Sign in to your account.
        </p>

        {/* Fields */}
        <div className="flex flex-col gap-4">

          {/* Email */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1.5">
              Email address
            </label>
            <input
              onChange={(e)=>setEmail(e.target.value)}
              type="email"
              placeholder="jane@example.com"
              className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-lg outline-none bg-white text-gray-900 placeholder-gray-300 focus:border-gray-900 transition-colors"
            />
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-medium text-gray-600">
                Password
              </label>
              <a href="#" className="text-xs text-gray-400 hover:text-gray-900 transition-colors">
                Forgot password?
              </a>
            </div>
            <div className="relative">
              <input
                onChange={(e)=>setPassword(e.target.value)}
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full px-3.5 py-2.5 pr-10 text-sm border border-gray-200 rounded-lg outline-none bg-white text-gray-900 placeholder-gray-300 focus:border-gray-900 transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500 transition-colors"
              >
                {showPassword ? (
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button onClick={handleSubmit}
            type="button"
            className="w-full py-2.5 mt-1 bg-gray-900 hover:bg-gray-700 text-white text-sm font-medium rounded-lg transition-colors cursor-pointer"
          >
            Sign in
          </button>
        </div>

        {/* Sign up */}
        <p className="text-center text-xs text-gray-400 mt-5">
          Don't have an account?{" "}
          <Link to='/signup' className="text-gray-900 font-medium hover:underline">
            Sign up
          </Link>
        </p>

      </div>
    </div>
  );
}