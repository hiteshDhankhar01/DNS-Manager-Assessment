import React from 'react'
import axios from 'axios'
import { BASE_URL } from '../config'
import { toast } from 'react-toastify';

const UserProfile = ({ showProfile }) => {
  const user = JSON.parse(localStorage.getItem('user'));


  const sendData = () => {
    showProfile(false)
  }

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    toast.success("Logout Successful")
  };

  const handleDeleteAccount = async () => {
    try {
      // Get token from local storage
      const token = localStorage.getItem('token');

      // Make DELETE request to delete user account
      await axios.delete(`${BASE_URL}/user/delete/${user._id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      // After successful deletion, remove user and token from local storage
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      toast.info("Account Successfully Deleted")
      // Redirect or perform any other action after account deletion
    } catch (err) {
      toast.error(err)
      console.error(err);
      
    }
  };

  return (
    <div className="max-w-sm mx-auto bg-white shadow-md rounded-md p-6 mt-10 border relative">
      <button className='absolute top-2 right-2 p-1 '
        onClick={sendData} >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>

      </button>
      <div className="flex gap-1 flex-col justify-center items-center" >
        <p className='font-bold border border-blue-500  text-blue-500 h-[3rem] w-[3rem] bg-transparent rounded-full flex items-center justify-center text-[2rem]'>
          {user.username.charAt(0).toUpperCase()}
        </p>
        <h2 className='text-blue-500  text-[1.6rem] capitalize'>{user.username}</h2>
        <h2 className=''>{user.email}</h2>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-blue-600 my-4" onClick={handleLogout}>
          Logout
        </button>
        <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600" onClick={handleDeleteAccount}>
          Delete Account
        </button>
      </div>


    </div>
  )
}

export default UserProfile
