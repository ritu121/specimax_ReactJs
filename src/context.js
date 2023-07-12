import React, { useState } from 'react';
export const CompanyContext = React.createContext('');
const Context = ({ subPages }) => {
    const [comapnyId, setCompanyId] = useState('');
    return (
        <CompanyContext.Provider value={[comapnyId, setCompanyId]}>
            {subPages}
        </CompanyContext.Provider>
    )
}
export default Context;