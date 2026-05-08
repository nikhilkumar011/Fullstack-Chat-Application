import React from 'react'
import SideBar from '../components/SideBar'
import ChatContainer from '../components/ChatContainer'

const HomePage = () => {
  return (
    <div className='flex flex-col md:flex-row w-full md:w-[90%] md:m-auto md:rounded-2xl h-[100dvh] md:h-auto overflow-hidden'>
      <SideBar />
      <ChatContainer />
    </div>
  )
}

export default HomePage