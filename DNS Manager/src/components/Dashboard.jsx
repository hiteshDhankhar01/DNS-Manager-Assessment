import React, { useEffect, useState } from 'react';
import AddDomainForm from './Forms/AddDomainForm';
import UserProfile from './UserProfile';
import { toast } from 'react-toastify';
import axios from 'axios';
import { BASE_URL } from '../config';
import Search from './Search';

const Dashboard = () => {
  const [showAddDomainForm, setShowAddDomainForm] = useState(false)
  const [showUserProfile, setShowUserProfile] = useState(false)
  const [showSearchInput, setShowSearchInput] = useState(false)
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  useEffect(() => {
    if (file) {
      handleUpload();
    }
  }, [file]);

  const handleUpload = async () => {
    setUploading(true);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(`${BASE_URL}/domain/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      toast.success(response.data.message);
    } catch (error) {
      console.error('Error uploading file:', error);
      toast.error('Failed to upload file');
    } finally {
      setUploading(false);
      setFile(null); // Reset file state after upload
    }
  };




  const user = JSON.parse(localStorage.getItem('user'));



  // const [showAddDomainForm, setShowAddDomainForm] = useState(false);

  const handleShowAddDomainForm = (data) => {
    // Use the received data here
    setShowAddDomainForm(data);
  };

  const handleShowProfile = (data) => {
    setShowUserProfile(data)
  }


  // const handleFileChange = async (e) => {
  //   setFile(e.target.files[0])
  //   e.preventDefault();
  //   const formData = new FormData();
  //   formData.append('jsonFile', file);

  //   try {
  //     const response = await axios.post('http://localhost:3001/upload', formData, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data'
  //       }
  //     });
  //     console.log(response.data); // Handle response
  //   } catch (error) {
  //     console.error('Error uploading file:', error);
  //   }
  // };

  return (
    <>
      <div className="container mx-auto p-4 flex-wrap border-blue-500 border rounded-md">
        {/* <h1 className="text-2xl font-bold mb-4 text-center bg-blue-500 text-white w-fit mx-auto p-2 px-4 rounded-md">Dashboard</h1> */}
        <div className="flex justify-between ">
          <button onClick={() => setShowAddDomainForm(!showAddDomainForm)} className="flex gap-1 hover:bg-blue-100 text-blue-500 border border-blue-500 p-2 rounded mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Add DNS
          </button>
          <label htmlFor="uploadJson" className="flex gap-1 hover:bg-blue-100  text-blue-500 border border-blue-500 p-2 rounded cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
            </svg>
            Upload JSON/CSV File
            <input type="file" id="uploadJson" className="hidden" onChange={handleFileChange} />
            {uploading && <p>Uploading...</p>}
          </label>
          {/* 
          <div className="flex  px-2  justify-center items-center rounded mr-2  text-blue-500">
            <label htmlFor="sortOptions" className="mr-2">Sort by:</label>
            <select id="sortOptions"
              // onChange={handleSortChange}
              className="bg-white  hover:bg-blue-100  border border-blue-500 px-2 py-2 rounded "
            >
              <option className='bg-transparent' value="name">Name</option>
              <option className='bg-transparent' value="time">Time</option>
            </select>
          </div> */}
          {/* <button onClick={() => toast("Wow so easy!")}
          >toast</button> */}
          <button className="flex gap-1 hover:bg-blue-100 text-blue-500 border border-blue-500 px-2 rounded mr-2 items-center" onClick={() => setShowSearchInput(!showSearchInput)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
            Search
          </button>
          <button className="flex gap-1 hover:bg-blue-100 text-blue-500 border border-blue-500 px-2 rounded mr-2 items-center capitalize" onClick={() => setShowUserProfile(!showUserProfile)}>
            <p className='font-bold border border-blue-500  text-blue-500 h-[2rem] w-[2rem] bg-transparent rounded-full flex items-center justify-center text-[1.4rem] capitalize'>{user.username.charAt(0)}</p>
            {user.username}
          </button>
        </div>
      </div>


      {showAddDomainForm &&
        <AddDomainForm showDomainForm={handleShowAddDomainForm} />
      }

      {showUserProfile &&
        <UserProfile showProfile={handleShowProfile} />
      }

      {showSearchInput &&

        <div className='relative mt-2  mx-2 border border-blue-500 rounded-full '>
          <input className=' rounded-full w-full text-[18px] outline-none px-4 p-2 ' placeholder='Find ' type="text"
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <button className='absolute right-0 top-[10px] mr-4' onClick={() => setShowSearchInput(false)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-6 h-6 text-blue-500">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>


      }

      {searchValue.length > 0 && showSearchInput &&
        <Search searchValue={searchValue} />
      }



    </>
  );
}

export default Dashboard;




