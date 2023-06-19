import React from 'react';

const ClassTableRows = ({ classes }) => {
    if (classes && classes.length > 0) {
        return (
        classes.map((specificClass) =>
            <tr key={specificClass.id} className="sticky top-[-1] z-10">
                <td className="class-table-row elegant-heading-small" style={{textAlign: 'center' }}>{specificClass.class_name}</td>
                <td className="class-table-row elegant-heading-small" style={{textAlign: 'center' }}>{specificClass.number_of_credits}</td>
            </tr>
        )
        );
    } else {
        return (
            <tr className="sticky top-0 z-10">
                <td className="class-table-row elegant-heading-large" colSpan={2}>No classes available :/</td>
            </tr>
        );
    }
  };
  

export default ClassTableRows;