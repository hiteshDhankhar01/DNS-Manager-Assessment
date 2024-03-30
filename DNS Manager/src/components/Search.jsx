import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../config';
import { toast } from 'react-toastify';

const Search = ({ searchValue }) => {
    const [data, setData] = useState([]);
    // const [data, setData] = useState([]);
    const [showEditForm, setShowEditForm] = useState(false);
    const [selectedDomain, setSelectedDomain] = useState(null);

    useEffect(() => {
        fetchData();
    }, [searchValue]);

    const fetchData = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/domain/find?key=${searchValue}`);
            setData(response.data.result);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleEditClick = (domain) => {
        setSelectedDomain(domain); // Set the selected domain for editing
        setShowEditForm(true); // Show the edit form
    };

    const handleDeleteDomain = async (id) => {
        try {
            await axios.delete(`${BASE_URL}/domain/delete/${id}`);
            // After successful deletion, remove the deleted domain from the data
            setData(data.filter(domain => domain._id !== id));
            toast.info("Domain Successfully Deleted");
        } catch (err) {
            toast.error("Failed to delete domain");
            console.error(err);
        }
    };

    return (
        <>
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">Search</h1>
                <table className="table-auto w-full">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="px-4 py-2">Name</th>
                            <th className="px-4 py-2">DNS Records</th>
                            <th className="px-4 py-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((domain, index) => (
                            <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : ""}>
                                <td className="border px-4 py-2">{domain.name}</td>
                                <td className="border px-4 py-2">
                                    <ul>
                                        {domain.records.map((record, i) => (
                                            <li key={i}>{record.type}: {record.value}</li>
                                        ))}
                                    </ul>
                                </td>

                                <td className="border px-4 py-2">
                                    <button className="hover:bg-blue-100 text-blue-500 border border-blue-500 px-4 py-2 rounded mr-2 mb-2 lg:mb-0" onClick={() => handleEditClick(domain)}>
                                        Edit
                                    </button>
                                    <button className="hover:bg-red-100 text-red-500 border border-red-500 px-4 py-2 rounded mr-2" onClick={() => handleDeleteDomain(domain._id)} >Delete</button>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {showEditForm && selectedDomain &&
                <div className='absolutea top-5 w-full h-full fixed'>
                    <EditDomainForm domain={selectedDomain} setShowEditForm={setShowEditForm} />
                </div>}
        </>
    );
};

export default Search;
