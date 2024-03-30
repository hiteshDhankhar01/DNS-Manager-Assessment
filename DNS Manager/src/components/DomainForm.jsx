// DomainForm.js
import React, { useState } from 'react';

function DomainForm() {
    const [domain, setDomain] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle domain submission
        console.log('Domain submitted:', domain);
        // Clear input field after submission
        setDomain('');
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4">
            <input
                type="text"
                placeholder="Enter Domain"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                className="border p-2 mr-2"
            />
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                Add Domain
            </button>
        </form>
    );
}

export default DomainForm;
