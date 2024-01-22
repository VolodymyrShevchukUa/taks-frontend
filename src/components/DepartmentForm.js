// DepartmentForm.js
import React, { useState } from 'react';

const DepartmentForm = ({ onSubmit, onAssignLector }) => {
    const [name, setName] = useState('');

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ name });
        setName(''); // Clear the input after submission
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Department Name:
                <input type="text" value={name} onChange={handleNameChange} />
            </label>
            <button type="submit">Create Department</button>

            {/* Button to open the modal or section for assigning a lector */}
            <button onClick={onAssignLector}>Assign Lector</button>
        </form>
    );
};

export default DepartmentForm;
