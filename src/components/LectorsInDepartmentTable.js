// LectorsInDepartmentTable.js
import React from 'react';

const LectorsInDepartmentTable = ({ lectors }) => {
    return (
        <table>
            <thead>
            <tr>
                <th>Lector ID</th>
                <th>Lector Name</th>
                {/* Add other columns as needed */}
            </tr>
            </thead>
            <tbody>
            {lectors.map((lector) => (
                <tr key={lector.id}>
                    <td>{lector.id}</td>
                    <td>{lector.name}</td>
                    {/* Add other cells as needed */}
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default LectorsInDepartmentTable;
