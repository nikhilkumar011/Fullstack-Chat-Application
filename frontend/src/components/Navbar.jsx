import React from "react";
import {useAuthStore} from '../store/useAuthStore'
import {Link} from 'react-router-dom'

const Navbar = () => {
  const {logout,authUser} = useAuthStore();

  const handleLogout = ()=>{
    logout();
  }
  return (
    <header className="w-full sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 sm:px-6 py-3">

        {/* Left / Logo */}
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-lg bg-gray-900 flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </div>
          <span className="text-base font-semibold text-gray-900 tracking-tight">
            ChatApp
          </span>
        </div>

        {/* Right / Actions */}
        <div className="flex items-center gap-2">

          {/* Divider */}
          
 
          {/* Avatar + name */}
          {authUser && (
             <div className="flex items-center gap-2">
            <Link to='/profile'>
            {
              authUser.profilePic && (
                 <img src={authUser.profilePic} alt="" className='h-7 w-7 rounded-full' />
              )
            }
            {
              !authUser.profilePic && (
                 <div className="h-7 w-7 rounded-full bg-gray-900 flex items-center justify-center text-white text-xs font-semibold">

              {authUser.fullname.charAt(0)}
            </div>
              )
            }
            
            </Link>
            <span className="hidden sm:block text-sm font-medium text-gray-700">
              {authUser.fullname}
            </span>
          </div>
          )}
          

          {/* Divider */}
          <div className="h-5 w-px bg-gray-200 mx-1" />

          {/* Logout */}
          <button onClick={handleLogout} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-100 active:scale-95 transition-all">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            <span className="hidden sm:inline">Logout</span>
          </button>

        </div>
      </div>
    </header>
  );
};

export default Navbar;