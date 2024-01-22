// LectorForm.js
import React, { useState } from 'react';

const LectorForm = ({ onSubmit, onAssignToDepartment }) => {
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
                Lector Name:
                <input type="text" value={name} onChange={handleNameChange} />
            </label>
            <button type="submit">Create Lector</button>

            {/* Button to open the modal or section for assigning to a department */}
            <button onClick={onAssignToDepartment}>Assign to Department</button>
        </form>
    );
};

export default LectorForm;
