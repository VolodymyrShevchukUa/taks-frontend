// App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import DepartmentTable from './components/DepartmentTable'; // Import the new component

const App = () => {
    const [departments, setDepartments] = useState([]);

    useEffect(() => {
        fetchDepartments();
    }, []);

    const fetchDepartments = async () => {
        try {
            const response = await axios.get('http://localhost:8080/departments');
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
        // Find the index of the updated department in the array
        const updatedIndex = departments.findIndex(dep => dep.id === updatedDepartment.id);

        // Create a new array with the updated department
        const updatedDepartments = [...departments];
        updatedDepartments[updatedIndex] = updatedDepartment;

        // Update the state with the new array
        setDepartments(updatedDepartments);
    };

    return (
        <div>
            <h1></h1>
            <div className="department-row">
                {departments.length > 0 ? (
                    departments.map((department) => (
                        <DepartmentTable
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
