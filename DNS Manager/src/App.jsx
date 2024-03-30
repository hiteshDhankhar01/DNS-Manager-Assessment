// App.js
import React, { useEffect, useState } from 'react';
import DomainTable from './components/DomainTable';

import Dashboard from './components/Dashboard';
import './App.css'
import Signup from './components/Forms/Signup';
import DomainRecordDistributionChart from './components/DomainRecordDistributionChart';


function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user exists in local storage on component mount
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleSetUser = (userData) => {
    setUser(userData);
  };


  return (
    <div className="container mx-auto p-4">

      {!user ?
       <Signup setUser={handleSetUser} />
        :
        <>
          <Dashboard />
          <DomainRecordDistributionChart />
          <DomainTable />
        </>
      }



    </div>
  );
}

export default App;
