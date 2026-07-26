import React from 'react'
import SideBar from '../components/SideBar'
import ChatContainer from '../components/ChatContainer'

const HomePage = () => {
  return (
    <div className="
  flex flex-col md:flex-row
  w-full md:w-[90%]
  md:mx-auto
  h-[100dvh] md:h-[90vh]
  md:rounded-2xl
  overflow-hidden
">
      <SideBar />
      <ChatContainer />
    </div>
  )
}

export default HomePage
