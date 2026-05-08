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
      <div className="w-72 shrink-0 h-[90vh] bg-white border-r border-gray-100 flex items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <div className="w-6 h-6 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin" />
          <p className="text-xs text-slate-400">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-72 shrink-0 h-[90vh] bg-white border-r border-gray-100 flex flex-col">

      {/* Header */}
      <div className="px-5 py-4 border-b border-gray-100">
        <h2 className="text-base font-semibold text-gray-900">Messages</h2>
        <p className="text-xs text-emerald-500 font-medium mt-0.5">
          {onlineUsers.length} online
        </p>
      </div>

      {/* User List */}
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
              {/* Avatar with online dot */}
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

              {/* Name + status */}
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
  )
}

export default SideBar