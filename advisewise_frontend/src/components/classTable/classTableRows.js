import React from 'react';

const ClassTableRows = ({ classes }) => {
    if (classes && classes.length > 0) {
        return (
        classes.map((specificClass) =>
            <tr key={specificClass.id} className="text-gray-800 sticky top-0 z-10">
                <td className="p-2 text-center elegant-heading-small" style={{textAlign: 'center' }}>{specificClass.class_name}</td>
                <td className="p-2 text-center elegant-heading-small" style={{textAlign: 'center' }}>{specificClass.number_of_credits}</td>
            </tr>
        )
        );
    } else {
        return (
            <tr className="text-gray-800 sticky top-0 z-10">
                <td className="p-2 text-center elegant-heading-small" colSpan={2}>No classes available :/</td>
            </tr>
        );
    }
  };
  

export default ClassTableRows;