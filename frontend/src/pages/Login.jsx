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
    <div className="min-h-screen flex bg-white">

      {/* ── Left: brand panel (hidden on mobile) ── */}
      <div className="hidden lg:flex lg:w-[46%] relative overflow-hidden bg-slate-950 flex-col justify-between p-12">
        {/* ambient gradient glows */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(circle at 15% 15%, rgba(139,92,246,0.35), transparent 45%),
              radial-gradient(circle at 85% 30%, rgba(217,70,239,0.28), transparent 40%),
              radial-gradient(circle at 30% 90%, rgba(34,211,238,0.22), transparent 45%)
            `,
          }}
        />
        {/* subtle dot grid */}
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage: 'radial-gradient(rgba(255,255,255,0.6) 1px, transparent 1px)',
            backgroundSize: '26px 26px',
          }}
        />

        <div className="relative z-10 flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-violet-500/30">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </div>
          <span className="text-white font-bold text-sm tracking-tight">ChatApp</span>
        </div>

        <div className="relative z-10">
          <h2 className="text-3xl font-bold text-white tracking-tight leading-tight mb-3">
            Conversations,<br />uninterrupted.
          </h2>
          <p className="text-sm text-slate-400 max-w-xs leading-relaxed">
            Pick up where you left off — messages, presence, and media, all in sync the moment you sign in.
          </p>

          {/* floating bubble decoration */}
          <div className="mt-8 flex flex-col gap-2 max-w-[220px]">
            <div className="self-start bg-white/[0.06] border border-white/10 backdrop-blur-sm text-slate-300 text-xs px-3.5 py-2 rounded-2xl rounded-bl-md">
              Hey, you around? 👋
            </div>
            <div className="self-end bg-gradient-to-br from-violet-600 to-fuchsia-600 text-white text-xs px-3.5 py-2 rounded-2xl rounded-br-md shadow-lg shadow-violet-500/20">
              Just logged in ✨
            </div>
          </div>
        </div>

        <p className="relative z-10 text-[11px] text-slate-500">
          Secure sign-in · Your data stays yours
        </p>
      </div>

      {/* ── Right: form ── */}
      <div className="flex-1 flex items-center justify-center px-4 py-10 relative">
        {/* soft mobile-only background accent */}
        <div
          className="absolute inset-0 lg:hidden"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 10%, rgba(139,92,246,0.10), transparent 40%),
              radial-gradient(circle at 85% 85%, rgba(34,211,238,0.10), transparent 40%)
            `,
            backgroundColor: '#FAFAFC',
          }}
        />

        <div className="relative w-full max-w-sm bg-white rounded-3xl border border-slate-100 p-8 sm:p-10 shadow-[0_20px_60px_-15px_rgba(76,29,149,0.12)]">

          {/* Logo (mobile only, since brand panel covers desktop) */}
          <div className="lg:hidden w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-cyan-400 flex items-center justify-center mb-6 shadow-md shadow-violet-500/25">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </div>

          {/* Header */}
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight mb-1.5">
            Welcome back
          </h1>
          <p className="text-sm text-slate-400 mb-8">
            Sign in to your account.
          </p>

          {/* Fields */}
          <div className="flex flex-col gap-4">

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                Email address
              </label>
              <input
                onChange={(e)=>setEmail(e.target.value)}
                type="email"
                placeholder="jane@example.com"
                className="w-full px-3.5 py-2.5 text-sm border border-slate-200 rounded-xl outline-none bg-slate-50/50 text-slate-900 placeholder-slate-300 focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-100 transition-all"
              />
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-slate-600">
                  Password
                </label>
                <a href="#" className="text-xs text-slate-400 hover:text-violet-600 transition-colors font-medium">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <input
                  onChange={(e)=>setPassword(e.target.value)}
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="w-full px-3.5 py-2.5 pr-10 text-sm border border-slate-200 rounded-xl outline-none bg-slate-50/50 text-slate-900 placeholder-slate-300 focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-100 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300 hover:text-violet-500 transition-colors"
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
              className="w-full py-2.5 mt-1 bg-gradient-to-br from-violet-600 to-fuchsia-600 hover:shadow-lg hover:shadow-violet-500/30 active:scale-[0.98] text-white text-sm font-semibold rounded-xl transition-all cursor-pointer"
            >
              Sign in
            </button>
          </div>

          {/* Sign up */}
          <p className="text-center text-xs text-slate-400 mt-6">
            Don't have an account?{" "}
            <Link to='/signup' className="text-violet-600 font-semibold hover:text-violet-700 hover:underline">
              Sign up
            </Link>
          </p>

        </div>
      </div>

    </div>
  );
}
