import React from 'react'
import SideBar from '../components/SideBar'
import ChatContainer from '../components/ChatContainer'

const HomePage = () => {
  return (
    <div className="flex items-center justify-center w-full h-[100dvh] md:h-screen bg-slate-100 md:p-6">
      <div
        className="
          flex flex-col md:flex-row
          w-full md:w-[92%] lg:w-[85%] xl:w-[78%]
          h-[100dvh] md:h-[88vh]
          md:rounded-[28px]
          overflow-hidden
          bg-white
          md:shadow-[0_20px_60px_-15px_rgba(76,29,149,0.25)]
          md:border md:border-white/60
          relative
        "
      >
        {/* signature gradient hairline along the top edge on desktop */}
        <div className="hidden md:block absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-400 z-10" />
        <SideBar />
        <ChatContainer />
      </div>
    </div>
  )
}

export default HomePage
