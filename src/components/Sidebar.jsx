import { useState, useEffect } from 'react'
import router from 'next/router'
import axios from 'axios'

import FollowBtn from './buttons/FollowBtn'

const Sidebar = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    axios.get('/api/all/users').then(res => setUsers(res.data))
  }, [])
  return(
    <div className="relative flex justify-center overflow-hidden">
      <div className="hidden lg:inline flex flex-col fixed min-h-screen w-content mt-10">
        <div className="h-content bg-zinc-800 rounded-lg">
          <div className='text-xl font-bold px-3 pt-3 pb-4'>
            Who to follow
          </div>
          {users.map(element => {
            return(
              <div className='flex flex-row justify-between w-full p-2 hover:bg-zinc-700 hover:rounded-lg min-w-[300px]' key={'sidebar'+element.id}>
                <div className='flex flex-row' onClick={() => router.push(`/${element.userName}`)}>
                  <img src={element.avatarImg} className='h-[48px] w-[48px] object-cover rounded-full cursor-pointer' />
                  <div className='flex flex-col mx-2 truncate max-w-[130px]'>
                    <div className='font-bold hover:underline cursor-pointer truncate hover:text-clip'>
                      {element.name}
                    </div>
                    <div className='text-zinc-500 cursor-pointer truncate hover:text-clip'>
                      @{element.userName}
                    </div>
                  </div>
                </div>
                <div className='w-[100px]'>
                  <FollowBtn id={element.id} userName={element.userName}/>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Sidebar
