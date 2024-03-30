import React, { useState } from 'react';
import { BASE_URL } from '../../config';
import axios from 'axios';
import { toast } from 'react-toastify';

const AddDomainForm = ({ showDomainForm }) => {
    const [name, setName] = useState('');
    const [records, setRecords] = useState([{ type: '', value: '' }]);
    const [errorMessage, setErrorMessage] = useState('');

    const sendData = () => {
        showDomainForm(false);
    };

    const handleRecordChange = (index, key, value) => {
        const newRecords = [...records];
        newRecords[index][key] = value;
        setRecords(newRecords);
    };

    const addRecord = () => {
        setRecords([...records, { type: '', value: '' }]);
    };

    const removeRecord = (index) => {
        const newRecords = [...records];
        newRecords.splice(index, 1);
        setRecords(newRecords);
    };

  
const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Retrieve the token from wherever it's stored
    const token = localStorage.getItem('token'); // Assuming the token is stored in local storage

    if (name.trim() && records.some(record => record.type.trim() && record.value.trim())) {
        const newDomain = {
            name: name.trim(),
            records: records.filter(record => record.type.trim() && record.value.trim())
        };
        

        try {
            // Make the API call with the token in the headers
            const response = await axios.post(`${BASE_URL}/domain/create`, newDomain, {
                headers: {
                    'Authorization': `Bearer ${token}` // Include the token in the request headers
                }
            });

            // Handle success response
            console.log('Domain added successfully:', response.data);
            toast.succes('Domain added successfully')
            
            // Reset form fields and error message
            setName('');
            setRecords([{ type: '', value: '' }]);
            setErrorMessage('');
            
            // Optionally, you can perform additional actions such as closing the form
            showDomainForm(false);
        } catch (error) {
            // Handle error response
            console.error('Error adding domain:', error);
            setErrorMessage('Failed to add domain. Please try again.');
        }
    } else {
        setErrorMessage('Please fill in all fields');
    }
};

    return (
        <>
            <div className="mt-8 border rounded-md p-4 max-w-[400px] mx-auto relative border-black bg-slate-50 ">
                <button className='absolute top-2 right-2 p-1 ' onClick={sendData}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </button>
                <h2 className="text-lg font-bold mb-4 text-center">Add Domain</h2>
                <form onSubmit={handleSubmit}>
                    <div className='relative mb-4'>
                        <label className="block text-sm absolute bg-blue-500 left-3 -top-3 px-1 border border-blue-500 text-white rounded-md" htmlFor="name">
                            Domain Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="border border-blue-500 rounded-md p-2 w-full outline-none"
                        />
                    </div>
                    {records.map((record, index) => (
                        <div key={index} className="mb-4">
                            <div className='relative mb-4'>
                                <label className="block text-sm absolute bg-blue-500 left-3 -top-3 px-1 border border-blue-500 text-white rounded-md" htmlFor={`recordType-${index}`}>
                                    Record Type
                                </label>
                                <input
                                    type="text"
                                    id={`recordType-${index}`}
                                    value={record.type}
                                    onChange={(e) => handleRecordChange(index, 'type', e.target.value)}
                                    className="border border-blue-500 rounded-md p-2 w-full outline-none"
                                />
                            </div>
                            <div className='relative'>
                                <label className="block text-sm absolute bg-blue-500 left-3 -top-3 px-1 border border-blue-500 text-white rounded-md" htmlFor={`recordValue-${index}`}>
                                    Record Value
                                </label>
                                <input
                                    type="text"
                                    id={`recordValue-${index}`}
                                    value={record.value}
                                    onChange={(e) => handleRecordChange(index, 'value', e.target.value)}
                                    className="border border-blue-500 rounded-md p-2 w-full outline-none"
                                />
                            </div>
                            {records.length >= 2 &&
                                <button type="button" onClick={() => removeRecord(index)} className="flex bg-red-500 mt-2 px-2 rounded-md items-center text-white gap-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                    </svg>
                                    Remove Record
                                </button>
                            }
                        </div>
                    ))}
                    <button type="button" onClick={addRecord} className="flex items-center bg-green-500 mt-2 px-2 rounded-md ">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        Add Record
                    </button>
                    {errorMessage && <div className="text-red-500">{errorMessage}</div>}
                    <button type="submit" className=" w-full  bg-blue-500 text-white px-4 py-2 rounded mt-4 text-center">
                        Add Domain
                    </button>
                </form>
            </div>
        </>
    );
}

export default AddDomainForm;