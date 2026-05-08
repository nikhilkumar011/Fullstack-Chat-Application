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
        <div className="flex md:hidden w-full h-[72px] bg-white border-b border-gray-100 items-center justify-center shrink-0">
          <div className="w-5 h-5 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin" />
        </div>
        {/* Desktop: vertical sidebar */}
        <div className="hidden md:flex w-72 shrink-0 h-[90vh] bg-white border-r border-gray-100 items-center justify-center">
          <div className="flex flex-col items-center gap-2">
            <div className="w-6 h-6 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin" />
            <p className="text-xs text-slate-400">Loading...</p>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      {/* ── Mobile: horizontal scrollable strip ── */}
      <div className="flex md:hidden w-full bg-white border-b border-gray-100 shrink-0 flex-col">
        <div className="flex items-center justify-between px-4 pt-3 pb-1">
          <h2 className="text-sm font-semibold text-gray-900">Messages</h2>
          <p className="text-xs text-emerald-500 font-medium">{onlineUsers.length} online</p>
        </div>
        <div className="flex overflow-x-auto gap-3 px-4 pb-3 scrollbar-hide">
          {users.map((each) => {
            const isOnline = onlineUsers.includes(each._id);
            const isSelected = selectedUser?._id === each._id;
            return (
              <button
                key={each._id}
                onClick={() => setSelectedUser(each)}
                className="flex flex-col items-center gap-1 shrink-0 w-14"
              >
                <div className="relative">
                  {each.profilePic ? (
                    <img
                      src={each.profilePic}
                      alt={each.fullname}
                      className={`w-11 h-11 rounded-full object-cover ${isSelected ? "ring-2 ring-indigo-500 ring-offset-1" : ""}`}
                    />
                  ) : (
                    <div className={`w-11 h-11 rounded-full flex items-center justify-center text-white text-sm font-semibold
                      ${isSelected ? "bg-indigo-600" : "bg-gray-700"}`}>
                      {each.fullname.charAt(0)}
                    </div>
                  )}
                  {isOnline && (
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white" />
                  )}
                </div>
                <p className={`text-[10px] font-medium truncate w-full text-center ${isSelected ? "text-indigo-600" : "text-gray-700"}`}>
                  {each.fullname.split(" ")[0]}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Desktop: vertical sidebar ── */}
      <div className="hidden md:flex w-72 shrink-0 h-[90vh] bg-white border-r border-gray-100 flex-col">
        <div className="px-5 py-4 border-b border-gray-100">
          <h2 className="text-base font-semibold text-gray-900">Messages</h2>
          <p className="text-xs text-emerald-500 font-medium mt-0.5">
            {onlineUsers.length} online
          </p>
        </div>
        <div className="flex-1 overflow-y-auto py-2">
          {users.map((each) => {
            const isOnline = onlineUsers.includes(each._id);
            const isSelected = selectedUser?._id === each._id;
            return (
              <div
                onClick={() => setSelectedUser(each)}
                key={each._id}
                className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors
                  ${isSelected ? "bg-indigo-50 border-r-2 border-indigo-500" : "bg-white hover:bg-slate-50"}`}
              >
                <div className="relative shrink-0">
                  {each.profilePic ? (
                    <img
                      src={each.profilePic}
                      alt={each.fullname}
                      className={`w-10 h-10 rounded-full object-cover ${isSelected ? "ring-2 ring-indigo-300" : ""}`}
                    />
                  ) : (
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-semibold
                      ${isSelected ? "bg-indigo-600" : "bg-gray-700"}`}>
                      {each.fullname.charAt(0)}
                    </div>
                  )}
                  {isOnline && (
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white" />
                  )}
                </div>
                <div className="min-w-0">
                  <p className={`text-sm font-medium truncate ${isSelected ? "text-indigo-700" : "text-gray-800"}`}>
                    {each.fullname}
                  </p>
                  <p className={`text-xs font-medium ${isOnline ? "text-emerald-500" : "text-slate-400"}`}>
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