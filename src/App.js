import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import DepartmentComponent from './components/DepartmentTable';

const App = () => {
    const [departments, setDepartments] = useState([]);
    const [newDepartmentName, setNewDepartmentName] = useState('');
    const [searchString, setSearchString] = useState('');

    useEffect(() => {
        fetchDepartments();
    }, []);

    const fetchDepartments = async () => {
        try {
            let url = 'http://localhost:8080/departments';

            if (searchString) {
                url = 'http://localhost:8080/departments/search';
            }

            const response = await axios.get(url, {
                params: {
                    search: searchString,
                },
            });

            if (response.data && Array.isArray(response.data)) {
                console.log('Departments data:', response.data);
                setDepartments(response.data);
            } else {
                console.error('Invalid data received from the API');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleDepartmentUpdate = (updatedDepartment) => {
        const updatedIndex = departments.findIndex((department) => department.id === updatedDepartment.id);

        const updatedDepartments = [...departments];
        updatedDepartments[updatedIndex] = updatedDepartment;

        setDepartments(updatedDepartments);
    };

    const handleNewDepartmentSubmit = async () => {
        try {
            const response = await axios.post('http://localhost:8080/departments', {
                name: newDepartmentName,
            });

            setDepartments((prevDepartments) => [...prevDepartments, response.data]);

            setNewDepartmentName('');
        } catch (error) {
            console.error('Error creating new department:', error);
        }
    };

    const handleSearchChange = (e) => {
        setSearchString(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        fetchDepartments();
    };

    return (
        <div className="app-container">
            <h1>Your App Title</h1>

            {/* Search Bar */}
            <form onSubmit={handleSearchSubmit}>
                <input
                    type="text"
                    placeholder="Search Departments"
                    value={searchString}
                    onChange={handleSearchChange}
                />
                <button type="submit">Search</button>
            </form>

            {/* New Department Form */}
            <div className="new-department-form">
                <input
                    type="text"
                    placeholder="New Department Name"
                    value={newDepartmentName}
                    onChange={(e) => setNewDepartmentName(e.target.value)}
                />
                <button onClick={handleNewDepartmentSubmit}>Create Department</button>
            </div>

            {/* Display Existing Departments */}
            <div className="department-row">
                {departments.length > 0 ? (
                    departments.map((department) => (
                        <DepartmentComponent
                            key={department.id}
                            department={department}
                            setDepartment={handleDepartmentUpdate}
                        />
                    ))
                ) : (
                    <p>No departments available</p>
                )}
            </div>
        </div>
    );
};

export default App;
