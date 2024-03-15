import React from 'react'
import { Outlet } from 'react-router-dom'
import { NavLink} from 'react-router-dom'

const Home = () => {
  return (
    <>
    <div className='flex items-center gap-4 text-2xl my-8 mx-4 text-blue-500'>
        <NavLink className={({isActive}) => isActive ? 'underline underline-offset-2':''} end to='.'>Dashboard</NavLink>
        <NavLink className={({isActive}) => isActive ? 'underline underline-offset-2':''} to='income'>Income</NavLink>
        <NavLink className={({isActive}) => isActive ? 'underline underline-offset-2':''} to='expenses'>Expenses</NavLink>
        <NavLink className={({isActive}) => isActive ? 'underline underline-offset-2':''} to='categories'>Categories</NavLink>
    </div>
    <Outlet/>
    </>
  )
}

export default Home