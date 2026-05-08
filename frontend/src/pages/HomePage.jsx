import React from 'react'
import SideBar from '../components/SideBar'
import ChatContainer from '../components/ChatContainer'

const HomePage = () => {
  return (
    <div className='flex basis-1/3 justify-center w-[90%] m-auto rounded-2xl'>
         <SideBar/>
         <ChatContainer/>
    </div>
  )
}

export default HomePage
