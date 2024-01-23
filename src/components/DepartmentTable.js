import React, { useState, useEffect } from 'react';
import './DepartmentTable.css';
import axios from 'axios';

const DepartmentTable = ({ department, setDepartment, newDepartment }) => {
    const [editMode, setEditMode] = useState(false);
    const [newName, setNewName] = useState('');
    const [newGrade, setNewGrade] = useState('');
    const [editingLectorId, setEditingLectorId] = useState('');
    const [nameValidationMessage, setNameValidationMessage] = useState('');

    const [showAddLectorForm, setShowAddLectorForm] = useState(false);
    const [newLectorName, setNewLectorName] = useState('');

    const GRADE_OPTIONS = ['ASSISTANT', 'ASSOCIATE_PROFESSOR', 'PROFESSOR'];

    useEffect(() => {
        if (newDepartment && newDepartment.id === department.id) {
            setDepartment(newDepartment);
        }
    }, [newDepartment, department.id, setDepartment]);

    const handleEditClick = (lectorId, currentName) => {
        setEditMode(true);
        setEditingLectorId(lectorId);
        setNewName(currentName);
    };

    const validateName = (name) => {
        const nameRegex = /^[a-zA-Z]+ [a-zA-Z]+$/;

        if (!nameRegex.test(name)) {
            setNameValidationMessage('Name should contain two words with no special characters or numbers.');
            return false;
        } else {
            setNameValidationMessage('');
            return true;
        }
    };

    const handleSaveEdit = (lectorId) => {
        if (validateName(newName)) {
            axios
                .put(`http://localhost:8080/lectors/${lectorId}?name=${newName}`)
                .then(() => {
                    axios.get(`http://localhost:8080/departments/${department.id}`)
                        .then((response) => {
                            setDepartment(response.data);
                        })
                        .catch((error) => {
                            console.error('Error fetching updated department data:', error);
                        });

                    setEditMode(false);
                    setEditingLectorId('');
                    setNewName('');
                })
                .catch((error) => {
                    console.error('Error updating lector name:', error);
                });
        }
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
        setNameValidationMessage('');
    };

    const handleAddLector = () => {
        if (validateName(newLectorName)) {
            axios
                .post(`http://localhost:8080/lectors`, {
                    name: newLectorName,
                    grade: newGrade,
                    departmentId: department.id,
                })
                .then(() => {
                    axios.get(`http://localhost:8080/departments/${department.id}`)
                        .then((response) => {
                            setDepartment(response.data);
                        })
                        .catch((error) => {
                            console.error('Error fetching updated department data:', error);
                        });

                    setShowAddLectorForm(false);
                    setNewLectorName('');
                    setNewGrade('');
                })
                .catch((error) => {
                    console.error('Error adding new lector:', error);
                });
        }
    };

    const handlePromote = (lectorId) => {
        axios
            .patch(`http://localhost:8080/lectors/${lectorId}/promote`)
            .then(() => {
                axios.get(`http://localhost:8080/departments/${department.id}`)
                    .then((response) => {
                        setDepartment(response.data);
                    })
                    .catch((error) => {
                        console.error('Error fetching updated department data:', error);
                    });
            })
            .catch((error) => {
                console.error('Error promoting lector:', error);
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
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {department.lectors && department.lectors.length > 0 ? (
                        department.lectors.map((lector) => (
                            <tr key={lector.id}>
                                <td>
                                    {editMode && editingLectorId === lector.id ? (
                                        <div>
                                            <input
                                                type="text"
                                                value={newName}
                                                onChange={(e) => setNewName(e.target.value)}
                                                onKeyPress={(e) => handleKeyPress(e, lector.id)}
                                            />
                                            {nameValidationMessage && (
                                                <div className="validation-message">{nameValidationMessage}</div>
                                            )}
                                        </div>
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
                                <td>
                                    <button onClick={() => handlePromote(lector.id)}>Promote</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3">No lectors in this department</td>
                        </tr>
                    )}
                    </tbody>
                </table>

                <button onClick={handleShowAddLectorForm}>Add Lector</button>

                {showAddLectorForm && (
                    <div>
                        <input
                            type="text"
                            placeholder="Lector Name"
                            value={newLectorName}
                            onChange={(e) => setNewLectorName(e.target.value)}
                        />
                        {nameValidationMessage && (
                            <div className="validation-message">{nameValidationMessage}</div>
                        )}
                        <select
                            value={newGrade}
                            onChange={(e) => setNewGrade(e.target.value)}
                        >
                            <option value="">Select Grade</option>
                            {GRADE_OPTIONS.map((grade) => (
                                <option key={grade} value={grade}>
                                    {grade}
                                </option>
                            ))}
                        </select>
                        <button onClick={handleAddLector}>Add Lector</button>
                        <button onClick={handleCancelAddLector}>Cancel</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DepartmentTable;
