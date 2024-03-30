import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { BASE_URL } from '../../config';

function EditDomainForm({ domain, setShowEditForm }) {
    const [name, setName] = useState(domain.name);
    const [records, setRecords] = useState([]);

    useEffect(() => {
        // Initialize records state with domain records
        setRecords(domain.records.map(record => ({ type: record.type, value: record.value })));
    }, [domain]);

    const handleRecordChange = (index, field, value) => {
        const updatedRecords = [...records];
        updatedRecords[index][field] = value;
        setRecords(updatedRecords);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.put(`${BASE_URL}/domain/update-domain/${domain._id}`, {
                name,
                records: records.map(record => ({ type: record.type, value: record.value }))
            });
            toast.success("Domain updated successfully");
            setShowEditForm(false);
        } catch (error) {
            console.error('Error updating domain:', error);
            toast.error("Failed to update domain");
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-md shadow-md relative">
            <button className='absolute top-2 right-2 p-1 ' onClick={() => setShowEditForm(false)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
            </button>
            <h2 className="text-2xl font-bold mb-4">Edit Domain</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name:</label>
                    <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm" />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Records:</label>
                    {records.map((record, index) => (
                        <div key={index} className='flex gap-2'>
                            <input type="text" value={record.type} onChange={(e) => handleRecordChange(index, 'type', e.target.value)} className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm" />
                            <input type="text" value={record.value} onChange={(e) => handleRecordChange(index, 'value', e.target.value)} className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm" />
                        </div>
                    ))}
                </div>
                <div className="flex justify-end">
                    <button type="button" className="mr-2 px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500" onClick={() => setShowEditForm(false)}>Cancel</button>
                    <button type="submit" className="px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">Update</button>
                </div>
            </form>
        </div>
    );
}

export default EditDomainForm;








// import React, { useState } from 'react';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import { BASE_URL } from '../../config';

// function EditDomainForm({ domain, setShowEditForm }) {
//     console.log(domain)
//     const [name, setName] = useState(domain.name);
//     const [records, setRecords] = useState(domain.records.join(', ')); // Join records array into a string

//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         try {
//             await axios.put(`${BASE_URL}/domain/${domain._id}`, { name, records: records.split(',').map(record => record.trim()) });
//             toast.success("Domain updated successfully");
//             setShowEditForm(false); // Close the edit form after successful submission
//         } catch (error) {
//             console.error('Error updating domain:', error);
//             toast.error("Failed to update domain");
//         }
//     };

//     return (
//         <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-md shadow-md relative">
//              <button className='absolute top-2 right-2 p-1 ' onClick={() => setShowEditForm(false)}>
//                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-6 h-6">
//                         <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
//                     </svg>
//                 </button>
//             <h2 className="text-2xl font-bold mb-4">Edit Domain</h2>
//             <form onSubmit={handleSubmit}>
//                 <div className="mb-4">
//                     <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name:</label>
//                     <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm" />
//                 </div>

//                 <div className="mb-4">
//                 <label  className="block text-sm font-medium text-gray-700">Records:</label>
//                     {domain.records.map((item, index) => (
//                         <div key={index} className='flex gap-2'>
//                             <input type="text" id="records" value={item.type} onChange={(e) => setRecords(e.target.value)} className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm" />

//                             {/* <label htmlFor="records" className="block text-sm font-medium text-gray-700">{item.type}</label> */}
//                             <input type="text" id="records" value={item.value} onChange={(e) => setRecords(e.target.value)} className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm" />
//                         </div>
//                     ))}

//                 </div>
//                 <div className="flex justify-end">
//                     <button type="button" className="mr-2 px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500" onClick={() => setShowEditForm(false)}>Cancel</button>
//                     <button type="submit" className="px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">Update</button>
//                 </div>
//             </form>
//         </div>
//     );
// }

// export default EditDomainForm;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';

// function EditDomainForm() {
//     const { id } = useParams();
//     const [name, setName] = useState('');
//     const [records, setRecords] = useState('');

//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         try {
//             await axios.put(`API_ENDPOINT/domains/${id}`, { name, records: records.split(',').map(record => record.trim()) });
//             // Handle success
//         } catch (error) {
//             console.error('Error updating domain:', error);
//             // Handle error
//         }
//     };

//     return (
//         <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-md shadow-md">
//             <h2 className="text-2xl font-bold mb-4">Edit Domain</h2>
//             <form onSubmit={handleSubmit}>
//                 <div className="mb-4">
//                     <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name:</label>
//                     <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm" />
//                 </div>
//                 <div className="mb-4">
//                     <label htmlFor="records" className="block text-sm font-medium text-gray-700">Records (comma-separated):</label>
//                     <input type="text" id="records" value={records} onChange={(e) => setRecords(e.target.value)} className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm" />
//                 </div>
//                 <button type="submit" className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Update</button>
//             </form>
//         </div>
//     );
// }

// export default EditDomainForm;
