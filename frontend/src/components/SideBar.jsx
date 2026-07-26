import React, { useEffect } from 'react'
import { useChatStore } from '../store/useChatStore'
import { useAuthStore } from '../store/useAuthStore'

const SideBar = () => {
  const { users, getUsers, isUsersLoading, selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  useEffect(() => {
    getUsers();
  }, [getUsers])

  if (isUsersLoading) {
    return (
      <>
        {/* Mobile: horizontal strip */}
        <div className="flex md:hidden w-full h-[72px] bg-white border-b border-slate-100 items-center justify-center shrink-0">
          <div className="w-5 h-5 rounded-full border-2 border-violet-500 border-t-transparent animate-spin" />
        </div>
        {/* Desktop: vertical sidebar */}
        <div className="hidden md:flex w-72 shrink-0 h-full bg-white border-r border-slate-100 items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="w-7 h-7 rounded-full border-2 border-violet-500 border-t-transparent animate-spin" />
            <p className="text-xs text-slate-400 font-medium tracking-wide">Loading contacts…</p>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      {/* ── Mobile: horizontal scrollable strip ── */}
      <div className="flex md:hidden w-full bg-white border-b border-slate-100 shrink-0 flex-col">
        <div className="flex items-center justify-between px-4 pt-3.5 pb-2">
          <h2 className="text-sm font-bold text-slate-900 tracking-tight">Messages</h2>
          <div className="flex items-center gap-1.5 bg-emerald-50 px-2 py-0.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_6px_2px_rgba(16,185,129,0.5)]" />
            <p className="text-[11px] text-emerald-600 font-semibold">{onlineUsers.length} online</p>
          </div>
        </div>
        <div className="flex overflow-x-auto gap-3 px-4 pb-3.5 scrollbar-hide">
          {users.map((each) => {
            const isOnline = onlineUsers.includes(each._id);
            const isSelected = selectedUser?._id === each._id;
            return (
              <button
                key={each._id}
                onClick={() => setSelectedUser(each)}
                className="flex flex-col items-center gap-1.5 shrink-0 w-14 group"
              >
                <div className={`relative p-[2px] rounded-full transition-all duration-200 ${
                  isSelected ? "bg-gradient-to-br from-violet-500 via-fuchsia-500 to-cyan-400" : "bg-transparent"
                }`}>
                  {each.profilePic ? (
                    <img
                      src={each.profilePic}
                      alt={each.fullname}
                      className="w-11 h-11 rounded-full object-cover ring-2 ring-white"
                    />
                  ) : (
                    <div className={`w-11 h-11 rounded-full flex items-center justify-center text-white text-sm font-semibold ring-2 ring-white
                      ${isSelected ? "bg-slate-900" : "bg-slate-400 group-hover:bg-slate-500"} transition-colors`}>
                      {each.fullname.charAt(0)}
                    </div>
                  )}
                  {isOnline && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white shadow-[0_0_6px_1px_rgba(16,185,129,0.6)]" />
                  )}
                </div>
                <p className={`text-[10px] font-medium truncate w-full text-center transition-colors ${isSelected ? "text-violet-600" : "text-slate-500"}`}>
                  {each.fullname.split(" ")[0]}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Desktop: vertical sidebar ── */}
      <div className="hidden md:flex w-72 shrink-0 h-full bg-white border-r border-slate-100 flex-col">
        <div className="px-5 py-5 border-b border-slate-100">
          <h2 className="text-lg font-bold text-slate-900 tracking-tight">Messages</h2>
          <div className="flex items-center gap-1.5 mt-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_6px_2px_rgba(16,185,129,0.5)]" />
            <p className="text-xs text-emerald-600 font-semibold">{onlineUsers.length} online now</p>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto py-3 px-2.5 space-y-1">
          {users.map((each) => {
            const isOnline = onlineUsers.includes(each._id);
            const isSelected = selectedUser?._id === each._id;
            return (
              <div
                onClick={() => setSelectedUser(each)}
                key={each._id}
                className={`relative flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-all duration-150
                  ${isSelected ? "bg-violet-50" : "hover:bg-slate-50"}`}
              >
                {isSelected && (
                  <span className="absolute left-0 top-2 bottom-2 w-[3px] rounded-full bg-gradient-to-b from-violet-500 via-fuchsia-500 to-cyan-400" />
                )}
                <div className={`relative shrink-0 p-[2px] rounded-full transition-all duration-200 ${
                  isSelected ? "bg-gradient-to-br from-violet-500 via-fuchsia-500 to-cyan-400" : "bg-transparent"
                }`}>
                  {each.profilePic ? (
                    <img
                      src={each.profilePic}
                      alt={each.fullname}
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-white"
                    />
                  ) : (
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-semibold ring-2 ring-white
                      ${isSelected ? "bg-slate-900" : "bg-slate-400"}`}>
                      {each.fullname.charAt(0)}
                    </div>
                  )}
                  {isOnline && (
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white shadow-[0_0_5px_1px_rgba(16,185,129,0.6)]" />
                  )}
                </div>
                <div className="min-w-0">
                  <p className={`text-sm font-semibold truncate ${isSelected ? "text-violet-700" : "text-slate-800"}`}>
                    {each.fullname}
                  </p>
                  <p className={`text-xs font-medium ${isOnline ? "text-emerald-600" : "text-slate-400"}`}>
                    {isOnline ? "Online" : "Offline"}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  )
}

export default SideBar
