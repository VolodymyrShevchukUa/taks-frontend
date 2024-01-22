// DepartmentTable.js
import React, { useState } from 'react';
import './DepartmentTable.css'; // Import the CSS
import axios from 'axios';

const DepartmentTable = ({ department, setDepartment }) => {
    const [editMode, setEditMode] = useState(false);
    const [newName, setNewName] = useState('');
    const [editingLectorId, setEditingLectorId] = useState(null);

    // New state for the add lector form
    const [showAddLectorForm, setShowAddLectorForm] = useState(false);
    const [newLectorName, setNewLectorName] = useState('');
    const [newLectorDegree, setNewLectorDegree] = useState('');

    const handleEditClick = (lectorId, currentName) => {
        setEditMode(true);
        setEditingLectorId(lectorId);
        setNewName(currentName);
    };

    const handleCancelEdit = () => {
        setEditMode(false);
        setEditingLectorId(null);
        setNewName('');
    };

    const handleSaveEdit = (lectorId) => {
        // Make a request to the backend to update the lector's name
        axios
            .put(`http://localhost:8080/lectors/${lectorId}?name=${newName}`)
            .then(() => {
                // Handle the successful response, e.g., fetch updated department data from the server
                axios.get(`http://localhost:8080/departments/${department.id}`)
                    .then((response) => {
                        // Update the local state with the fresh data from the server
                        setDepartment(response.data);
                    })
                    .catch((error) => {
                        console.error('Error fetching updated department data:', error);
                        // Handle the error appropriately, e.g., show an error message
                    });

                // Reset the edit mode and new name
                setEditMode(false);
                setEditingLectorId(null);
                setNewName('');
            })
            .catch((error) => {
                // Handle the error, e.g., display an error message
                console.error('Error updating lector name:', error);
                // You might want to implement additional error handling here
            });
    };

    const handleKeyPress = (event, lectorId) => {
        if (event.key === 'Enter') {
            handleSaveEdit(lectorId);
        }
    };

    const handleShowAddLectorForm = () => {
        setShowAddLectorForm(true);
    };

    const handleCancelAddLector = () => {
        setShowAddLectorForm(false);
        setNewLectorName('');
        setNewLectorDegree('');
    };

    const handleAddLector = () => {
        // Make a request to the backend to add a new lector to the department
        axios
            .post(`http://localhost:8080/lectors`, {
                name: newLectorName,
                grade: newLectorDegree,
                departmentId: department.id,
            })
            .then(() => {
                // Handle the successful response, e.g., fetch updated department data from the server
                axios.get(`http://localhost:8080/departments/${department.id}`)
                    .then((response) => {
                        // Update the local state with the fresh data from the server
                        setDepartment(response.data);
                    })
                    .catch((error) => {
                        console.error('Error fetching updated department data:', error);
                        // Handle the error appropriately, e.g., show an error message
                    });

                // Reset the form
                setShowAddLectorForm(false);
                setNewLectorName('');
                setNewLectorDegree('');
            })
            .catch((error) => {
                // Handle the error, e.g., display an error message
                console.error('Error adding new lector:', error);
                // You might want to implement additional error handling here
            });
    };

    return (
        <div className="department-table">
            <div className="department">
                <h2>{department.name}</h2>
                <table>
                    <thead>
                    <tr>
                        <th>Lector Name</th>
                        <th>Grade</th>
                    </tr>
                    </thead>
                    <tbody>
                    {department.lectors && department.lectors.length > 0 ? (
                        department.lectors.map((lector) => (
                            <tr key={lector.id}>
                                <td>
                                    {editMode && editingLectorId === lector.id ? (
                                        <input
                                            type="text"
                                            value={newName}
                                            onChange={(e) => setNewName(e.target.value)}
                                            onKeyPress={(e) => handleKeyPress(e, lector.id)}
                                        />
                                    ) : (
                                        <span
                                            className="editable-name"
                                            onClick={() => handleEditClick(lector.id, lector.name)}
                                        >
                                                {lector.name}
                                            </span>
                                    )}
                                </td>
                                <td>{lector.grade}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="2">No lectors in this department</td>
                        </tr>
                    )}
                    </tbody>
                </table>

                {/* Button to show/hide the add lector form */}
                <button onClick={handleShowAddLectorForm}>Add Lector</button>

                {/* Form to add a new lector */}
                {showAddLectorForm && (
                    <div>
                        <input
                            type="text"
                            placeholder="Lector Name"
                            value={newLectorName}
                            onChange={(e) => setNewLectorName(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Lector Degree"
                            value={newLectorDegree}
                            onChange={(e) => setNewLectorDegree(e.target.value)}
                        />
                        <button onClick={handleAddLector}>Add Lector</button>
                        <button onClick={handleCancelAddLector}>Cancel</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DepartmentTable;
